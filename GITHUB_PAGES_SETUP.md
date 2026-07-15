# GitHub Pages Deployment Guide

## Step-by-Step Setup (5 minutes)

### 1. Create GitHub Repository

1. Go to: https://github.com/new
2. **Repository name**: `date-invite` (or any name you like)
3. **Description**: `Would you go out with me? - A playful date invite app`
4. Select **Public** (or Private if you prefer)
5. **DO NOT** check "Add a README file"
6. Click **Create repository**

### 2. Push Your Code

After creating the repo, GitHub will show you commands. Use these:

```bash
# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/date-invite.git

# Rename branch to main (GitHub's default)
git branch -M main

# Push to GitHub
git push -u origin main
```

**If you have 2FA enabled**, use a personal access token instead of password:
- Generate token at: https://github.com/settings/tokens
- Check "repo" scope
- Use token as password when prompted

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Click **Pages** in left sidebar
4. Under **Source**:
   - Branch: Select **main**
   - Folder: Select **/(root)**
5. Click **Save**

### 4. Wait & Access

⏱ **Wait 1-2 minutes** for deployment

Your app will be live at:
```
https://YOUR_USERNAME.github.io/date-invite/
```

Example: `https://johndoe.github.io/date-invite/`

### 5. Share It! 🎉

Send this URL to anyone:
```
https://YOUR_USERNAME.github.io/date-invite/
```

Works on:
- ✅ iPhone Safari
- ✅ Android Chrome
- ✅ Desktop browsers
- ✅ Anywhere in the world!

---

## 📝 Quick Commands (Copy-Paste)

```bash
# Navigate to project
cd /home/edward/bin/date-invite-h5

# Add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/date-invite.git

# Rename branch
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## 🔄 Update Your App Later

When you make changes:

```bash
cd /home/edward/bin/date-invite-h5
git add .
git commit -m "Update: description of changes"
git push
```

GitHub Pages will auto-update in ~1 minute!

---

## 🌟 Custom Domain (Optional)

You can use your own domain:
1. Buy domain (Namecheap, GoDaddy, etc.)
2. Add `CNAME` file to repo with your domain
3. Configure DNS to point to GitHub Pages

---

## 📱 Add to iPhone Home Screen

Once deployed:
1. Open URL in Safari on iPhone
2. Tap **Share** → **Add to Home Screen**
3. Name it: **"Go Out With Me"**
4. Tap **Add**

Now it's an app! 🎉

---

Need help with any step? Let me know! 🚀
