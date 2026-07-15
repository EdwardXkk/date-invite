# Date Invite H5 App

A pure client-side H5 version of the date invite app that works on iPhone (and all mobile devices) - **no server required!**

## ✨ Features

- **Pure Client-Side**: No server, no database, no backend - just HTML, CSS, and JavaScript
- **iPhone Optimized**: Full Safari support with native date picker
- **Moving Reject Button**: The reject button escapes when you try to click it!
- **Native Date Picker**: Uses iPhone's built-in date selection UI
- **Installable**: Can be added to Home Screen as an app
- **Works Offline**: Once loaded, works without internet

## 📱 How to Use on iPhone

### Method 1: Open Directly (Quick Test)
1. Transfer these files to your iPhone (AirDrop, iCloud Drive, etc.)
2. Open `index.html` in Safari
3. Works instantly!

### Method 2: Host Anywhere (Recommended)
Upload to any static hosting service:
- **GitHub Pages** (free)
- **Netlify** (free)
- **Vercel** (free)
- Or any web server

Then open the URL in Safari on iPhone.

### Method 3: Add to Home Screen (App-like Experience)
1. Open the app in Safari
2. Tap the **Share** button (box with arrow)
3. Tap **"Add to Home Screen"**
4. Name it and tap **Add**
5. Now it works like a native app with its own icon!

## 🚀 Hosting Options (All Free!)

### GitHub Pages
```bash
# Create a repository, upload these files, enable Pages
# Your app will be at: https://yourusername.github.io/repo-name/
```

### Netlify Drop
- Go to https://app.netlify.com/drop
- Drag and drop the folder
- Get instant URL

### Vercel
```bash
npm i -g vercel
vercel
```

## 📂 Files

```
date-invite-h5/
├── index.html      # Main HTML structure
├── styles.css      # All styling and animations
└── script.js       # App logic (client-side only)
```

## 💡 Technical Details

- **No dependencies**: Pure vanilla JavaScript
- **No build step**: Open `index.html` directly
- **Mobile-first**: Optimized for iPhone but works on all devices
- **Progressive Web App ready**: Can add PWA features
- **Accessible**: Uses semantic HTML
- **Fast**: Minimal file size, instant loading

## 🎨 Customization

Easy to customize:
- **Colors**: Edit gradient in `styles.css`
- **Text**: Change question/buttons in `index.html`
- **Behavior**: Adjust button logic in `script.js`

## 📱 iPhone-Specific Features

- Native date picker (iOS style)
- Safe area insets support (iPhone X+)
- Touch-optimized buttons
- No text selection
- Prevents unwanted scrolling
- Add to Home Screen capability

## 🔒 Privacy

- **Zero data collection**
- **No analytics**
- **No cookies**
- **100% private** - everything stays on your device

Enjoy your date invite app! 💕
