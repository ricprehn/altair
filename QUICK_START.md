# 🚀 Quick Deploy to GitHub + DigitalOcean (5 Steps)

## Step 1: Push to GitHub (2 minutes)

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote set-url origin https://github.com/YOUR_USERNAME/nauticapp.git
git branch -M main
git push -u origin main
```

---

## Step 2: Set Up DigitalOcean Droplet (5 minutes)

SSH into your droplet and run:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install dependencies
sudo apt install git nginx -y

# Create deployment directory
mkdir -p /var/www/nauticapp
cd /var/www/nauticapp

# Clone your repo
git clone https://github.com/YOUR_USERNAME/nauticapp.git .

# Set permissions
sudo chown -R $USER:$USER /var/www/nauticapp
```

---

## Step 3: Configure Nginx (2 minutes)

On your droplet:

```bash
# Create Nginx config
sudo tee /etc/nginx/sites-available/nauticapp > /dev/null <<EOF
server {
    listen 80;
    server_name YOUR_DROPLET_IP;

    root /var/www/nauticapp;
    index index.html;

    location / {
        try_files \$uri \$uri/ =404;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/nauticapp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx
```

---

## Step 4: Generate SSH Key for GitHub Actions (2 minutes)

On your droplet:

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "deploy@nauticapp" -f ~/.ssh/deploy_key -N ""

# Display private key (copy this)
cat ~/.ssh/deploy_key

# Add public key to authorized_keys
cat ~/.ssh/deploy_key.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

---

## Step 5: Add GitHub Secrets (2 minutes)

In your GitHub repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** and add these 4 secrets:

| Secret Name | Value |
|------------|-------|
| `DROPLET_HOST` | Your droplet IP address |
| `DROPLET_USER` | `root` |
| `DROPLET_SSH_KEY` | Private key from Step 4 |
| `DROPLET_PORT` | `22` |

---

## ✅ Done! Test It

1. Make a small change to `index.html`
2. Push to GitHub:
   ```bash
   git add .
   git commit -m "Test deployment"
   git push origin main
   ```
3. Watch the workflow at: `https://github.com/YOUR_USERNAME/nauticapp/actions`
4. Visit your droplet: `http://YOUR_DROPLET_IP`

---

## Optional: Add Custom Domain + SSL

```bash
# On your droplet
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d YOUR_DOMAIN
```

Then update your Nginx config to use `YOUR_DOMAIN` instead of the IP.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `Permission denied (publickey)` | Check `~/.ssh/authorized_keys` exists and has 600 permissions |
| Workflow fails | Check GitHub Actions logs for SSH errors |
| Files not updating | Verify branch is `main` and SSH key is correct |
| Nginx shows 404 | Check `/var/www/nauticapp` has your files |
