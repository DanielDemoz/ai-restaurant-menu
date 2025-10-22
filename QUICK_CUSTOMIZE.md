# 🚀 Quick Customization (5 Minutes)

Want to adapt this for another restaurant? Change these 3 things:

---

## 1️⃣ Restaurant Name (2 minutes)

### Search & Replace "Brukd" with your restaurant name in:
- `package.json`
- `public/index.html`
- `public/demo.html`
- `index.html`
- `server.js`

**Tip:** Use your code editor's "Find and Replace All" feature (Ctrl+Shift+H in VS Code)

---

## 2️⃣ Menu Items (2 minutes)

### Edit `server.js` - Find the `menuData` object (starts around line 25)

Replace the example items with your menu:

```javascript
{
  id: 1,
  name: 'Your Dish Name',
  description: 'Delicious description',
  price: 15.99,
  image: 'https://images.unsplash.com/photo-XXXXX?w=400',
  dietary: ['vegetarian'],      // or ['vegan'], ['gluten-free'], etc.
  allergens: ['dairy'],          // or ['nuts'], ['gluten'], etc.
  ingredients: ['item1', 'item2'],
  spicy: false,
  popular: true
}
```

**Get free food images:** https://unsplash.com/s/photos/food

---

## 3️⃣ Brand Color (1 minute)

### Edit `public/styles.css` - Find `:root` section (line 9)

```css
:root {
    --primary: #FF6B6B;      /* Change this to your brand color */
    --secondary: #4ECDC4;    /* And this for accent color */
}
```

**Example brand colors:**
- Italian: `#C8102E` (red)
- Japanese: `#E63946` (red) 
- Mexican: `#F77F00` (orange)
- Healthy: `#52B788` (green)
- Steakhouse: `#8B0000` (dark red)
- Seafood: `#0077B6` (blue)

---

## ✅ Test It

```bash
npm start
```

Open `http://localhost:3000` and check if everything looks right!

---

## 📤 Push to GitHub

```bash
git add .
git commit -m "Customize for [Your Restaurant Name]"
git push origin main
```

---

## 🎯 Done!

That's it! Your custom restaurant menu is ready.

**Want more customization?** Check out `CUSTOMIZATION_GUIDE.md` for:
- Adding your logo
- Customizing AI responses
- Advanced styling
- Dietary options
- And more!

---

**Questions?** Just ask! 😊

