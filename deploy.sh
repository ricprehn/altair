#!/bin/bash

# NauticApp Deployment Script for DigitalOcean Droplet
# This script pulls the latest code from GitHub and updates the web server

set -e

# Configuration
REPO_URL="https://github.com/YOUR_USERNAME/nauticapp.git"
DEPLOY_DIR="/var/www/nauticapp"
BRANCH="main"

echo "=========================================="
echo "Starting NauticApp Deployment"
echo "=========================================="
echo "Time: $(date)"

# Check if directory exists, if not clone the repo
if [ ! -d "$DEPLOY_DIR" ]; then
    echo "Creating deployment directory..."
    sudo mkdir -p "$DEPLOY_DIR"
    sudo chown $USER:$USER "$DEPLOY_DIR"
    echo "Cloning repository..."
    git clone -b "$BRANCH" "$REPO_URL" "$DEPLOY_DIR"
else
    echo "Repository directory exists. Pulling latest changes..."
    cd "$DEPLOY_DIR"
    git fetch origin
    git checkout "$BRANCH"
    git pull origin "$BRANCH"
fi

echo "=========================================="
echo "Deployment completed successfully!"
echo "Time: $(date)"
echo "=========================================="
