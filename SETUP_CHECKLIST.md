# GitHub & DigitalOcean Deployment Setup Checklist

## Quick Setup (15-20 minutes)

### Phase 1: GitHub Repository Setup
- [ ] Create GitHub repository at https://github.com/new
- [ ] Repository name: `nauticapp`
- [ ] Make it **Public** (or Private if preferred)
- [ ] Initialize with `.gitignore` (already created locally)

### Phase 2: Local Git Configuration
- [ ] Open terminal in your project directory
- [ ] Run: `git init`
- [ ] Run: `git add .`
- [ ] Run: `git commit -m "Initial commit"`
- [ ] Run: `git branch -M main`
- [ ] Run: `git remote add origin https://github.com/YOUR_USERNAME/nauticapp.git`
- [ ] Run: `git push -u origin main`

### Phase 3: DigitalOcean Droplet Setup
- [ ] SSH into droplet: `ssh root@YOUR_DROPLET_IP`
- [ ] Update system: `sudo apt update && sudo apt upgrade -y`
- [ ] Install Git: `sudo apt install git -y`
- [ ] Install Nginx: `sudo apt install nginx -y`
- [ ] Create deployment directory: `mkdir -p /var/www/nauticapp`
- [ ] Clone repository: `git clone https://github.com/YOUR_USERNAME/nauticapp.git /var/www/nauticapp`

### Phase 4: SSH Key Setup (for GitHub Actions)
On your droplet, run:
- [ ] `ssh-keygen -t ed25519 -C "deploy@nauticapp" -f ~/.ssh/deploy_key -N ""`
- [ ] Copy private key: `cat ~/.ssh/deploy_key`
- [ ] Copy public key: `cat ~/.ssh/deploy_key.pub`
- [ ] Add public key to authorized_keys: `cat ~/.ssh/deploy_key.pub >> ~/.ssh/authorized_keys`
- [ ] Fix permissions: `chmod 600 ~/.ssh/authorized_keys`

### Phase 5: GitHub Secrets Configuration
In your GitHub repository:
- [ ] Go to **Settings** → **Secrets and variables** → **Actions**
- [ ] Add secret `DROPLET_HOST` = Your droplet IP
- [ ] Add secret `DROPLET_USER` = `root`
- [ ] Add secret `DROPLET_SSH_KEY` = Private key from Phase 4
- [ ] Add secret `DROPLET_PORT` = `22`

### Phase 6: Nginx Configuration
On your droplet:
- [ ] Create config: `sudo nano /etc/nginx/sites-available/nauticapp`
- [ ] Paste the Nginx config from DEPLOYMENT_GUIDE.md
- [ ] Enable site: `sudo ln -s /etc/nginx/sites-available/nauticapp /etc/nginx/sites-enabled/`
- [ ] Test config: `sudo nginx -t`
- [ ] Restart Nginx: `sudo systemctl restart nginx`
- [ ] Enable on boot: `sudo systemctl enable nginx`

### Phase 7: Deploy Script Setup
On your droplet:
- [ ] Edit deploy script: `nano /var/www/nauticapp/deploy.sh`
- [ ] Replace `YOUR_USERNAME` with your GitHub username
- [ ] Make executable: `chmod +x /var/www/nauticapp/deploy.sh`
- [ ] Test manually: `cd /var/www/nauticapp && ./deploy.sh`

### Phase 8: Test Deployment
- [ ] Make a small change locally (e.g., edit index.html)
- [ ] Commit: `git add . && git commit -m "Test deployment"`
- [ ] Push: `git push origin main`
- [ ] Check GitHub Actions tab for workflow execution
- [ ] Verify files updated on droplet: `ls -la /var/www/nauticapp/`
- [ ] Visit `http://YOUR_DROPLET_IP` in browser

### Phase 9: Optional - Custom Domain & SSL
- [ ] Point domain DNS to droplet IP
- [ ] Install Certbot: `sudo apt install certbot python3-certbot-nginx -y`
- [ ] Generate SSL: `sudo certbot --nginx -d YOUR_DOMAIN`
- [ ] Test SSL: Visit `https://YOUR_DOMAIN`

---

## Troubleshooting Quick Links

| Problem | Solution |
|---------|----------|
| SSH key permission denied | Check `~/.ssh/authorized_keys` permissions (should be 600) |
| Git not found on droplet | Run `sudo apt install git -y` |
| Nginx not serving files | Check `/etc/nginx/sites-enabled/nauticapp` config exists |
| Workflow fails in GitHub | Check Actions tab for error logs |
| Files not updating | Verify branch is `main` and deploy script is executable |

---

## Files Created

- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `deploy.sh` - Deployment script for droplet
- `DEPLOYMENT_GUIDE.md` - Detailed setup guide
- `.gitignore` - Git ignore file
- `SETUP_CHECKLIST.md` - This file

---

## Support

For detailed instructions, see `DEPLOYMENT_GUIDE.md`
