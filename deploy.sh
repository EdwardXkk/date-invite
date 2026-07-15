#!/bin/bash

# Quick GitHub Pages Deployment Script
# Usage: ./deploy.sh

echo "🚀 GitHub Pages Deployment Script"
echo "=================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git not initialized. Run: git init"
    exit 1
fi

# Prompt for GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME

# Prompt for repository name
read -p "Enter repository name (default: date-invite): " REPO_NAME
REPO_NAME=${REPO_NAME:-date-invite}

# Prompt for GitHub token (for 2FA users)
read -p "Enter GitHub Personal Access Token (leave empty if no 2FA): " GITHUB_TOKEN

echo ""
echo "📦 Setting up GitHub remote..."

# Remove existing remote if any
git remote remove origin 2>/dev/null

# Add remote with or without token
if [ -n "$GITHUB_TOKEN" ]; then
    git remote add origin "https://${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"
else
    git remote add origin "https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"
fi

echo "✅ Remote added"
echo ""

# Rename branch to main
echo "🔄 Renaming branch to main..."
git branch -M main

# Prompt to create repo on GitHub
echo ""
echo "⚠️  Have you created the repository on GitHub?"
echo "   If not, go to: https://github.com/new"
echo "   Repository name: ${REPO_NAME}"
echo ""
read -p "Press Enter when ready to push..."

# Push to GitHub
echo ""
echo "📤 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "📝 Next steps:"
    echo "1. Go to: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}/settings/pages"
    echo "2. Under 'Source', select 'main' branch"
    echo "3. Click Save"
    echo "4. Wait 1-2 minutes"
    echo "5. Your app will be at: https://${GITHUB_USERNAME}.github.io/${REPO_NAME}/"
    echo ""
    echo "🎉 Happy sharing!"
else
    echo ""
    echo "❌ Push failed. Please check:"
    echo "   - GitHub username is correct"
    echo "   - Repository exists on GitHub"
    echo "   - You have push access"
    echo "   - If using 2FA, token has 'repo' scope"
fi
