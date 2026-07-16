# Notification Setup Guide 📱

## Overview

When someone picks a date, you'll get notified! Multiple notification methods available:

### ✅ Available Notification Methods

1. **Email** (Built-in, no setup)
   - Opens default email client
   - No API keys needed
   - Works immediately

2. **SMS** (Built-in, no API keys)
   - Opens default SMS app
   - Click to send
   - Works on iPhone/Android

3. **Discord Webhook** (Optional)
   - Get instant Discord notifications
   - Free, easy setup

4. **Custom Webhook** (Optional)
   - Send to any endpoint
   - Fully customizable

5. **LocalStorage Backup** (Automatic)
   - Saves all dates locally
   - View history anytime

---

## 📧 Method 1: Email Notification (Automatic)

**No setup needed!** When someone picks a date and enters their email:
- Automatically opens your default email client
- Pre-filled with date details
- Just click send!

**How it works:**
1. Girl picks a date
2. She can optionally enter her email
3. Her email client opens with pre-written message
4. She sends it to you

**To receive emails:**
- Just share your email address and ask her to enter it
- Or modify the code to send directly to your email

---

## 📱 Method 2: SMS Notification (Automatic)

**No API keys needed!** When someone picks a date and enters their phone:
- Opens default SMS app (Messages, WhatsApp, etc.)
- Pre-filled message with the date
- Just click send!

**How it works:**
1. Girl picks a date
2. She can optionally enter her phone number
3. Her SMS app opens with the date
4. She sends it to you

**To receive SMS:**
- Share your phone number
- Ask her to enter it and send

---

## 🎮 Method 3: Discord Webhook (Recommended!)

**Get instant Discord notifications when someone picks a date!**

### Setup (2 minutes):

1. **Create Discord Webhook:**
   - Open Discord → Server Settings → Integrations → Webhooks
   - Click "New Webhook"
   - Name it "Date Invite"
   - Choose a channel (e.g., #notifications)
   - Click "Copy Webhook URL"

2. **Add Webhook URL to App:**
   Open the app and run this in browser console:
   ```javascript
   localStorage.setItem('discordWebhook', 'YOUR_WEBHOOK_URL_HERE');
   ```

3. **Done!** Now you'll get instant Discord notifications

**Example Discord Message:**
```
💕 New Date Accepted!
📅 Date: 12/25/2025
⏰ Time: 2:30 PM
```

---

## 🔗 Method 4: Custom Webhook

**Send notifications to any endpoint (Zapier, IFTTT, etc.)**

### Setup:

1. **Get your webhook URL:**
   - **Zapier**: https://zapier.com/app/zaps
   - **IFTTT**: https://ifttt.com/applets
   - **Make.com**: https://www.make.com/en/integrations

2. **Add webhook URL:**
   ```javascript
   localStorage.setItem('customWebhook', 'https://your-webhook-url.com');
   ```

**Data sent:**
```json
{
  "date": "12/25/2025",
  "timestamp": "2025-07-16T14:30:00.000Z",
  "email": "optional@email.com",
  "phone": "optional-phone",
  "location": "https://your-app-url.com"
}
```

---

## 🚀 Quick Setup (Choose One)

### Option A: Simplest (Manual)
- **No setup!**
- Just ask her to send you a screenshot/message when she picks a date
- Dates are automatically saved in browser (localStorage)

### Option B: Discord (Recommended!)
- 2-minute setup
- Instant notifications
- Free forever

### Option C: Full Automation
- Discord webhook + Email/SMS
- Multiple notification methods
- Never miss a date!

---

## 📊 View Date History

All dates are automatically saved! To view:

```javascript
// Open browser console (F12) and run:
JSON.parse(localStorage.getItem('dateInvites'))
```

Shows all accepted dates with timestamps.

---

## 🔒 Privacy Note

- **No data is sent anywhere** by default
- All notifications are **optional**
- Contact info is **never stored** on any server
- localStorage stays on her device only
- **100% private** - you control what data is collected

---

## 💡 Recommendation

**For your use case (asking KK out):**

1. **Simplest**: Just use the date picker, ask her to tell you
2. **Discord Webhook**: Best for instant notifications
3. **Email**: Good if she already has your email

**Pro Tip**: Add Discord webhook + ask for her phone = double notification! 📱💕

---

## ❓ Questions?

**Q: Do I need to pay for SMS?**
A: No! It opens her SMS app, she sends it (her carrier charges apply)

**Q: Is the Discord webhook free?**
A: Yes! Discord webhooks are 100% free forever

**Q: Can I use WeChat instead?**
A: Yes! See WEIXIN_NOTIFICATIONS.md for WeChat-specific setup

**Q: What if she doesn't enter contact info?**
A: Date is still saved locally, just ask her to tell you

---

Ready to get notified? Pick a method and set it up! 🚀
