# How to Adapt Brukd for Another Restaurant

This guide shows you how to customize the menu system for any restaurant in **under 30 minutes**.

---

## 🎯 Quick Customization Checklist

- [ ] Change restaurant name
- [ ] Update branding colors
- [ ] Replace menu items
- [ ] Update food images
- [ ] Customize description/tagline
- [ ] (Optional) Add logo

---

## 📝 Step 1: Change Restaurant Name

### Files to Edit:

#### 1. `package.json` (Line 2)
```json
{
  "name": "your-restaurant-name",
  "description": "Your Restaurant - AI-powered menu system",
}
```

#### 2. `public/index.html` (Line 6 & 21)
```html
<title>Your Restaurant Name - Menu</title>
...
<h1>Your Restaurant Name</h1>
```

#### 3. `public/demo.html` (Line 6 & 320)
```html
<title>Your Restaurant Name</title>
...
<h1>Your Restaurant Name</h1>
<p class="tagline">Your Custom Tagline Here</p>
```

#### 4. `index.html` (Line 6 & 320)
```html
<title>Your Restaurant Name</title>
...
<h1>Your Restaurant Name</h1>
```

#### 5. `server.js` (Line 373)
```javascript
console.log(`Your Restaurant Menu Server running on http://localhost:${PORT}`);
```

---

## 🎨 Step 2: Update Branding Colors

Edit `public/styles.css` (Lines 9-16):

```css
:root {
    --primary: #FF6B6B;      /* Your brand color */
    --secondary: #4ECDC4;    /* Accent color */
    --background: #F7F7F7;   /* Background */
    --surface: #FFFFFF;
    --text: #2D3748;
    --text-light: #718096;
}
```

### Popular Color Schemes:

**Italian Restaurant:**
```css
--primary: #C8102E;    /* Red */
--secondary: #009246;  /* Green */
```

**Japanese Restaurant:**
```css
--primary: #E63946;    /* Red */
--secondary: #1D3557;  /* Dark Blue */
```

**Mexican Restaurant:**
```css
--primary: #F77F00;    /* Orange */
--secondary: #D62828;  /* Red */
```

**Healthy/Vegan:**
```css
--primary: #52B788;    /* Green */
--secondary: #95D5B2;  /* Light Green */
```

---

## 🍽️ Step 3: Update Menu Items

Edit `server.js` starting at **Line 25** (the `menuData` object).

### Menu Structure:

```javascript
const menuData = {
  categories: [
    {
      id: 'category-id',
      name: 'Category Name',
      items: [
        {
          id: 1,                    // Unique number
          name: 'Dish Name',
          description: 'Full description of the dish',
          price: 12.99,            // Price
          image: 'https://...',    // Image URL
          dietary: ['vegetarian', 'gluten-free'],  // Tags
          allergens: ['dairy', 'nuts'],           // Allergens
          ingredients: ['item1', 'item2'],        // Ingredients
          spicy: false,            // true/false
          popular: true            // true/false (adds "Popular" badge)
        }
      ]
    }
  ]
};
```

### Example: Pizza Restaurant Menu

```javascript
const menuData = {
  categories: [
    {
      id: 'pizzas',
      name: 'Pizzas',
      items: [
        {
          id: 1,
          name: 'Margherita',
          description: 'Classic pizza with tomato sauce, fresh mozzarella, and basil',
          price: 14.99,
          image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
          dietary: ['vegetarian'],
          allergens: ['gluten', 'dairy'],
          ingredients: ['tomato sauce', 'mozzarella', 'basil', 'olive oil'],
          spicy: false,
          popular: true
        },
        {
          id: 2,
          name: 'Pepperoni',
          description: 'Traditional pepperoni pizza with extra cheese',
          price: 16.99,
          image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400',
          dietary: [],
          allergens: ['gluten', 'dairy'],
          ingredients: ['tomato sauce', 'mozzarella', 'pepperoni'],
          spicy: false,
          popular: true
        }
      ]
    },
    {
      id: 'salads',
      name: 'Salads',
      items: [
        {
          id: 3,
          name: 'Caesar Salad',
          description: 'Romaine lettuce, parmesan, croutons, Caesar dressing',
          price: 9.99,
          image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
          dietary: ['vegetarian'],
          allergens: ['gluten', 'dairy', 'eggs'],
          ingredients: ['romaine', 'parmesan', 'croutons', 'dressing'],
          spicy: false,
          popular: false
        }
      ]
    }
  ]
};
```

### Dietary Options:
- `'vegetarian'`
- `'vegan'`
- `'gluten-free'`
- `'pescatarian'`

### Common Allergens:
- `'gluten'`
- `'dairy'`
- `'eggs'`
- `'nuts'`
- `'peanuts'`
- `'seafood'`
- `'fish'`
- `'shellfish'`
- `'soy'`
- `'sesame'`

---

## 📸 Step 4: Get Food Images

### Option 1: Use Your Own Photos
1. Take high-quality photos of your dishes
2. Upload to an image hosting service (Imgur, Cloudinary, etc.)
3. Use the direct image URLs

### Option 2: Use Free Stock Photos

**Unsplash (Best Quality):**
```
https://unsplash.com/s/photos/[dish-name]
```

**Pexels:**
```
https://www.pexels.com/search/[dish-name]/
```

**Tips:**
- Use images that are at least 800x600 pixels
- Keep consistent style (all photos, or all illustrations)
- Optimize file size for faster loading

### Image URL Format:
```javascript
image: 'https://images.unsplash.com/photo-1234567890?w=400'
```

---

## 🏷️ Step 5: Update Restaurant Info

### Update Description

Edit `README.md` (Line 3):
```markdown
A modern menu system for [Your Restaurant Name], featuring AI assistance 
for dietary recommendations and allergen information.
```

### Update Tagline

Edit `public/demo.html` and `index.html`:
```html
<p class="tagline">Your Custom Tagline</p>
```

**Examples:**
- "Authentic Italian Cuisine"
- "Farm-to-Table Fresh"
- "Handcrafted Sushi Daily"
- "Plant-Based Paradise"
- "Traditional Mexican Flavors"

---

## 🖼️ Step 6: Add Your Logo (Optional)

### Replace the Diamond Logo

In `public/index.html`, `public/demo.html`, and `index.html`, find the SVG logo and replace with:

#### Option A: Use an Image
```html
<div class="logo">
    <img src="your-logo.png" alt="Restaurant Logo" style="height: 40px;">
    <h1>Your Restaurant</h1>
</div>
```

#### Option B: Keep SVG, Change Colors
```html
<svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="18" fill="#YOUR-COLOR" opacity="0.2"/>
    <path d="M20 10 L26 16 L20 22 L14 16 Z" fill="#YOUR-COLOR"/>
</svg>
```

---

## 🔧 Step 7: Customize AI Responses (Optional)

The AI assistant automatically knows your menu, but you can customize the greeting.

Edit `public/app.js` (around Line 300):

```javascript
<div class="message bot-message">
    <div class="message-content">
        👋 Welcome to [Your Restaurant]! I can help you find the perfect dish. 
        What are you in the mood for today?
    </div>
</div>
```

---

## 📱 Step 8: Test Everything

### Local Testing:
```bash
npm start
```

Open `http://localhost:3000` and check:
- [ ] Restaurant name appears correctly
- [ ] Colors match your brand
- [ ] All menu items display
- [ ] Images load properly
- [ ] AI chat works
- [ ] Filters work (vegetarian, vegan, etc.)
- [ ] Cart functions properly

---

## 🚀 Step 9: Deploy Your Custom Version

### Update Git Repository:

```bash
# Add all changes
git add .

# Commit with message
git commit -m "Customize for [Your Restaurant Name]"

# Push to GitHub
git push origin main
```

### Create New GitHub Repository (if needed):

```bash
# Create new repo on GitHub, then:
git remote set-url origin https://github.com/YOUR-USERNAME/your-restaurant-menu.git
git push -u origin main
```

---

## 📋 Full Customization Example

Let's say you want to create a menu for "Taco Haven":

### 1. Restaurant Name
- Replace "Brukd" with "Taco Haven" in all files

### 2. Colors
```css
--primary: #D62828;    /* Red */
--secondary: #F77F00;  /* Orange */
```

### 3. Menu Items
```javascript
{
  id: 1,
  name: 'Chicken Tacos',
  description: 'Three soft corn tortillas with grilled chicken, cilantro, and onions',
  price: 12.99,
  image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400',
  dietary: ['gluten-free'],
  allergens: [],
  ingredients: ['chicken', 'corn tortillas', 'cilantro', 'onions', 'lime'],
  spicy: false,
  popular: true
}
```

### 4. Tagline
```html
<p class="tagline">Authentic Mexican Street Tacos</p>
```

---

## 🎯 Quick Customization (10 Minutes)

If you're in a hurry, just change these 3 things:

1. **Restaurant Name** (search & replace "Brukd" in all files)
2. **Menu Items** (`server.js` - the `menuData` object)
3. **Primary Color** (`public/styles.css` - the `--primary` variable)

That's enough to make it unique!

---

## 💡 Pro Tips

### Organize Your Menu Items:
- Keep IDs sequential (1, 2, 3...)
- Group similar items in categories
- Mark bestsellers as `popular: true`
- Be descriptive but concise

### Image Best Practices:
- All images same aspect ratio (landscape works best)
- Consistent lighting and style
- Show the actual dish (not stock that doesn't match)
- Compress images (use TinyPNG.com)

### AI Training:
- The AI reads your menu automatically
- More detailed descriptions = better AI responses
- Include cooking methods in descriptions
- Mention key ingredients

---

## 🔄 Make Changes Live

After customizing:

```bash
# Test locally first
npm start

# Then push to GitHub
git add .
git commit -m "Updated menu for [date]"
git push origin main
```

If using GitHub Pages, changes go live in 2-3 minutes!

---

## 📞 Need Help?

### Common Issues:

**Images not showing:**
- Check image URLs are valid
- Use direct image links (not webpage links)
- Try Unsplash or Pexels URLs

**Menu not updating:**
- Restart server (`Ctrl+C`, then `npm start`)
- Clear browser cache (`Ctrl+Shift+R`)

**Colors not changing:**
- Make sure you edited `public/styles.css`
- Check the `:root` section
- Clear browser cache

---

## ✅ Customization Checklist

Before going live, verify:

- [ ] Restaurant name updated everywhere
- [ ] Brand colors applied
- [ ] All menu items entered
- [ ] All images loading
- [ ] Prices are correct
- [ ] Dietary tags accurate
- [ ] Allergens listed properly
- [ ] AI chat tested
- [ ] Mobile responsive checked
- [ ] Committed to Git
- [ ] Pushed to GitHub

---

**You're ready to adapt this for any restaurant!** 🎉

Need help with a specific restaurant? Just ask! 😊

