# WeChat Notification Setup 📱

## How to Get Notified on WeChat When KK Picks a Date

### Option 1: WeChat Webhook (via Discord bridge) ⭐

**Best option! Get WeChat notifications for free.**

#### Setup Steps:

1. **Create Discord Webhook** (see NOTIFICATIONS.md)

2. **Set up Discord → WeChat bridge:**
   - Use **Zapier** or **Make.com**
   - Trigger: New Discord message in your channel
   - Action: Send WeChat message

3. **Add your WeChat:**
   - In Zapier/Make, connect your WeChat account
   - Or use a WeChat bot (微信机器人)

4. **Done!** When KK picks a date → Discord gets notified → You get WeChat message

---

### Option 2: WeChat Mini Program (Your Existing One!)

**If KK uses your WeChat mini-program:**

1. **Add Cloud Function to mini-program:**
   ```javascript
   // pages/index/index.js
   const cloud = require('wx-server-sdk')
   cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

   // Send date to cloud database
   async function sendDateNotification(date) {
     await cloud.database().collection('dates').add({
       data: {
         date: date,
         timestamp: new Date(),
         status: 'pending'
       }
     })

     // Send template message (requires setup)
     await cloud.openapi.subscribeMessage.send({
       touser: 'YOUR_OPENID',
       page: 'pages/index/index',
       data: {
         thing1: { value: 'KK accepted your date!' },
         date2: { value: date },
         thing3: { value: 'Check the app!' }
       }
     })
   }
   ```

2. **Enable Cloud Development:**
   - Open mini-program in WeChat DevTools
   - Click "Cloud Development"
   - Create database collection "dates"
   - Enable "Subscribe Message"

3. **Get your OpenID:**
   - First login to mini-program
   - Check cloud database for your OpenID

---

### Option 3: WeChat Official Account (Advanced)

**If you have a WeChat Official Account (公众号):**

1. **Set up Template Messages:**
   - Login to WeChat Official Account Platform
   - Go to 功能 → 模板消息
   - Add a date notification template

2. **Backend sends notification:**
   - When KK picks date → Your server sends template message
   - You get notification in 服务通知 (Service Notifications)

3. **Requires:**
   - WeChat Official Account (Service Account)
   - Server/Cloud Function
   - Template message approval

---

### Option 4: Third-Party WeChat Bots

**Use existing WeChat notification services:**

1. **Server酱 (ServerChan)** - Free!
   - Visit: https://sct.ftqq.com/
   - Get your SendKey
   - Add script to send notifications

2. **PushPlus (推送加)** - Free tier
   - Visit: http://www.pushplus.plus/
   - Create token
   - Get WeChat notifications

3. **WxPusher** - Open source
   - Self-host or use cloud service
   - Full WeChat notification support

---

### Option 5: Simple Manual (Easiest!)

**Just use WeChat normally:**

1. Deploy the H5 app
2. Share the link with KK via WeChat
3. When she picks a date:
   - You get Discord notification (if set up)
   - Or just ask her to tell you
4. **No technical setup needed!**

---

## 🚀 Recommended Setup for You

**Best combination (free & instant):**

1. **Discord Webhook** (2 min setup)
   - Get instant notifications on phone/computer

2. **Manual check** (no setup)
   - Just ask KK to tell you when she picks a date

3. **Future: WeChat Mini Program**
   - Add cloud database to mini-program
   - Real-time WeChat notifications

---

## 📱 Quick Start: Discord + WeChat

**Step 1:** Set up Discord webhook (see NOTIFICATIONS.md)

**Step 2:** Get Discord mobile app
- Download from App Store/Google Play
- Enable notifications

**Step 3:** Share app with KK
- Send her the GitHub Pages link
- She picks a date → You get Discord notification instantly!

**Step 4 (Optional):** Bridge Discord → WeChat
- Use IFTTT: Discord → WeChat
- Or use a Discord bot to forward to WeChat

---

## 💡 Pro Tips

- **Use Discord mobile app** - Push notifications work great
- **Enable sound** - You'll hear when KK picks a date!
- **Set custom notification sound** - Make it special 💕
- **Test it** - Pick a date yourself to verify it works

---

## ❓ Troubleshooting

**Q: Discord notification not working?**
A: Check webhook URL is correct, enable notifications in Discord app settings

**Q: WeChat mini program notifications not working?**
A: Make sure cloud development is enabled and user subscribed to messages

**Q: Want to use a different notification method?**
A: Check NOTIFICATIONS.md for more options (Email, SMS, etc.)

---

**Recommended:** Start with Discord webhook (easiest, free, instant) and add WeChat later if needed! 🚀
