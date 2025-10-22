# 🚀 Easy Setup Guide for Windows

## You Need Node.js First!

The application needs Node.js to run. Here's how to install it:

---

## Step 1: Install Node.js (5 minutes)

### Option A: Download and Install (Recommended)

1. **Go to**: https://nodejs.org/
2. **Click**: The big green button that says "Download Node.js (LTS)"
   - LTS = Long Term Support (most stable version)
3. **Run** the downloaded file (it's called something like `node-v20.x.x-x64.msi`)
4. **Click "Next"** through the installer (all defaults are fine)
5. **Restart** your computer (important!)

---

## Step 2: Verify Installation

After restarting, open a **new** PowerShell or Command Prompt and type:

```bash
node --version
```

You should see something like: `v20.11.0` ✅

If you see that, Node.js is installed! 🎉

---

## Step 3: Install Project Dependencies

In your terminal (in the Menu folder), run:

```bash
npm install
```

This will install all the required packages. You'll see a lot of text scrolling - that's normal!

Wait for it to finish (takes 1-2 minutes).

---

## Step 4: Start the Server

```bash
npm start
```

You should see:
```
🍽️  AI Restaurant Menu Server running on http://localhost:3000
📱 Open your browser to view the menu
```

---

## Step 5: Open in Browser

### Option 1: Automatic
Just hold **Ctrl** and **click** on `http://localhost:3000` in the terminal

### Option 2: Manual
1. Open your **web browser** (Chrome, Edge, Firefox, etc.)
2. Click in the address bar at the top
3. Type: `localhost:3000`
4. Press **Enter**

You should see the beautiful restaurant menu! 🎉

---

## 🎯 Quick Summary

```
1. Install Node.js from https://nodejs.org/
2. Restart computer
3. Run: npm install
4. Run: npm start
5. Open browser to: localhost:3000
```

---

## ❓ Common Issues

### "npm is not recognized"
- **Solution**: You didn't restart after installing Node.js. Restart your computer!

### "Port 3000 is already in use"
- **Solution**: Something else is using that port. 
- **Fix**: Close other programs, or change port in `.env` file

### "Cannot find module"
- **Solution**: Dependencies didn't install properly
- **Fix**: Run `npm install` again

### Browser shows "Can't reach this page"
- **Solution**: Server isn't running
- **Fix**: Make sure `npm start` is running in the terminal

---

## 🎨 What You'll See

### When you open `http://localhost:3000`:

1. **Beautiful Landing Page**
   - Purple gradient background
   - "AI Restaurant Menu" title
   - "Try Live Demo" button

2. **Click "Try Live Demo"** to see:
   - Full menu with food photos
   - Filter buttons (Vegetarian, Vegan, etc.)
   - Search bar
   - AI chat button (bottom right)

3. **Click the AI Chat button** and ask:
   - "What are your most popular dishes?"
   - "I'm vegan, what can I eat?"
   - "Do you have gluten-free options?"

---

## 🔧 Alternative: Use a Live Server (No Node.js needed)

If you just want to see the frontend without AI features:

### Using VS Code:
1. Install "Live Server" extension
2. Right-click on `public/index.html`
3. Select "Open with Live Server"

This won't have the AI chat working, but you can see the interface!

---

## 📞 Still Stuck?

### Check:
1. ✅ Node.js installed? Run: `node --version`
2. ✅ In the right folder? Run: `dir` (should see package.json)
3. ✅ Installed dependencies? Run: `npm install`
4. ✅ Server running? Run: `npm start`
5. ✅ Browser open to `localhost:3000`?

### If all else fails:
- Take a screenshot of the error
- Check what line the error shows
- Google the error message

---

## 🎉 Success Checklist

When everything works, you should see:

- [x] Terminal shows: "AI Restaurant Menu Server running"
- [x] Browser shows beautiful landing page
- [x] Can click through menu items
- [x] AI chat button appears
- [x] Can add items to cart

**If you see all that - you're ready to present!** 🚀

---

## 💡 Pro Tip

Keep the terminal window open while using the app. If you close it, the server stops and the website won't load!

**To stop the server**: Press `Ctrl + C` in the terminal

**To start it again**: Run `npm start`

---

## Next Steps

Once you have it running:
1. Read **[START_HERE.md](START_HERE.md)** - Choose your presentation guide
2. Read **[SIMPLE_DEMO_SCRIPT.md](SIMPLE_DEMO_SCRIPT.md)** - 2-minute demo
3. Practice the demo once
4. Present with confidence! 🎤

---

**You got this!** 💪


