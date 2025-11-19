# NauticApp GitHub & DigitalOcean Deployment Guide

## Overview
This guide walks you through setting up automated deployment from GitHub to your DigitalOcean droplet.

## Prerequisites
- GitHub account with your repository
- DigitalOcean droplet (Ubuntu 20.04 or later recommended)
- SSH access to your droplet
- Git installed on your droplet

---

## Step 1: Prepare Your DigitalOcean Droplet

### 1.1 SSH into your droplet
```bash
ssh root@YOUR_DROPLET_IP
```

### 1.2 Create deployment directory
```bash
mkdir -p /var/www/nauticapp
cd /var/www/nauticapp
```

### 1.3 Initialize git repository (if not already cloned)
```bash
git clone https://github.com/YOUR_USERNAME/nauticapp.git .
```

### 1.4 Set up web server (Nginx example)
```bash
# Install Nginx
sudo apt update
sudo apt install nginx -y

# Create Nginx config
sudo nano /etc/nginx/sites-available/nauticapp
```

Paste this configuration:
```nginx
server {
    listen 80;
    server_name YOUR_DOMAIN_OR_IP;

    root /var/www/nauticapp;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/nauticapp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## Step 2: Set Up GitHub Repository

### 2.1 Initialize git locally (if not already done)
```bash
cd /path/to/your/local/project
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/nauticapp.git
git push -u origin main
```

### 2.2 Generate SSH key for deployment (on your droplet)
```bash
ssh-keygen -t ed25519 -C "deploy@nauticapp" -f ~/.ssh/deploy_key -N ""
cat ~/.ssh/deploy_key
```

---

## Step 3: Configure GitHub Secrets

### 3.1 Go to your GitHub repository
1. Navigate to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**

### 3.2 Add the following secrets:

| Secret Name | Value |
|------------|-------|
| `DROPLET_HOST` | Your DigitalOcean droplet IP address |
| `DROPLET_USER` | `root` (or your deployment user) |
| `DROPLET_SSH_KEY` | Contents of `~/.ssh/deploy_key` (private key from step 2.2) |
| `DROPLET_PORT` | `22` (or your custom SSH port) |

### 3.3 Add public key to droplet
On your droplet, add the public key to authorized_keys:
```bash
cat ~/.ssh/deploy_key.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

---

## Step 4: Set Up GitHub Actions Workflow

The workflow file is already created at `.github/workflows/deploy.yml`

### 4.1 Customize the deployment script
Edit `deploy.sh` and replace:
- `YOUR_USERNAME` with your GitHub username
- Adjust paths if needed

### 4.2 Make the script executable on your droplet
```bash
chmod +x /var/www/nauticapp/deploy.sh
```

---

## Step 5: Test the Deployment

### 5.1 Manual test (on your droplet)
```bash
cd /var/www/nauticapp
./deploy.sh
```

### 5.2 Automatic test (via GitHub)
1. Make a small change to your local code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Test deployment"
   git push origin main
   ```
3. Go to your GitHub repository → **Actions** tab
4. Watch the workflow execute
5. Check your droplet to verify files were updated

---

## Step 6: Verify Deployment

### 6.1 Check if files are updated on droplet
```bash
ls -la /var/www/nauticapp
```

### 6.2 Test your website
Open your browser and navigate to:
- `http://YOUR_DROPLET_IP`
- `http://YOUR_DOMAIN` (if you have a domain configured)

---

## Troubleshooting

### Issue: "Permission denied (publickey)"
- Verify SSH key is added to `~/.ssh/authorized_keys` on droplet
- Check SSH key permissions: `chmod 600 ~/.ssh/authorized_keys`

### Issue: Workflow fails with "git not found"
- SSH into droplet and install git: `sudo apt install git -y`

### Issue: Files not updating
- Check GitHub Actions logs for error messages
- Verify branch name matches (main vs master)
- Ensure deploy script has execute permissions

### Issue: Nginx not serving files
- Check Nginx config: `sudo nginx -t`
- Verify file permissions: `sudo chown -R www-data:www-data /var/www/nauticapp`
- Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`

---

## Optional: Set Up Custom Domain

### 6.1 Point domain to droplet
Update your domain's DNS records to point to your droplet IP

### 6.2 Set up SSL with Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d YOUR_DOMAIN
```

---

## Next Steps

- Monitor deployments in GitHub Actions
- Set up email notifications for failed deployments
- Consider adding pre-deployment tests
- Set up monitoring/alerting for your droplet
