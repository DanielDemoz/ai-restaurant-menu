# 🍽️ AI-Assisted Restaurant Menu

A modern, interactive restaurant menu system with AI-powered assistance for dish recommendations, dietary restrictions, and allergen information.

> **🎯 Want to present this to others?** Start with **[START_HERE.md](START_HERE.md)** for a simple, audience-friendly guide!

## ✨ Features

### 🎨 Beautiful UI
- Modern, responsive design
- Smooth animations and transitions
- Mobile-friendly interface
- High-quality food images

### 🤖 AI Assistant
- Personalized dish recommendations
- Dietary restriction support (vegan, vegetarian, gluten-free)
- Allergen information
- Ingredient details
- Smart menu suggestions
- Works with or without OpenAI API key (fallback system included)

### 🛒 Interactive Menu
- Browse by categories (Appetizers, Mains, Desserts, Drinks)
- Search functionality
- Filter by dietary preferences
- Popular items highlighted
- Detailed item information

### 🛍️ Shopping Cart
- Add/remove items
- Quantity management
- Real-time price calculation
- Tax calculation
- Easy checkout

## 🎯 Quick Links

- **🚀 [Start Here](#-getting-started)** - Setup instructions
- **🎬 [Present This](SIMPLE_DEMO_SCRIPT.md)** - 2-minute demo script
- **📊 [Presentation Guide](PRESENTATION.md)** - Full presentation materials
- **💼 [Pitch Deck](PITCH_DECK.md)** - Business pitch
- **📄 [Handout](HANDOUT.md)** - One-page reference

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

> **⚠️ Don't have Node.js?** Read **[SETUP_GUIDE.md](SETUP_GUIDE.md)** for easy installation instructions!

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd Menu
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment (optional):**
   
   For full AI features with OpenAI:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_actual_api_key_here
   ```
   
   **Note:** The app works perfectly without an API key using intelligent fallback responses!

4. **Start the server:**
   ```bash
   npm start
   ```

5. **Open your browser:**
   ```
   http://localhost:3000
   ```
   
   You'll see:
   - **Main page**: Beautiful landing page (`demo.html`)
   - **Menu App**: Click "Try Live Demo" or go to `/index.html`

## 📱 Usage

### Browse Menu
- View all menu items organized by category
- Click on items for detailed information
- Use search to find specific dishes
- Filter by dietary preferences

### AI Assistant
- Click the AI chat button (bottom right)
- Ask questions like:
  - "What are your most popular dishes?"
  - "Do you have vegan options?"
  - "I'm allergic to dairy, what can I eat?"
  - "Recommend something spicy"
  - "What's good for dinner under $20?"

### Order
- Add items to cart
- Adjust quantities
- Review your order
- Place order

## 🔧 Customization

### Adding Menu Items

Edit `server.js` and modify the `menuData` object:

```javascript
{
  id: 13,
  name: 'Your Dish Name',
  description: 'Delicious description',
  price: 19.99,
  image: 'https://image-url.com/image.jpg',
  dietary: ['vegetarian', 'gluten-free'],
  allergens: ['nuts', 'dairy'],
  ingredients: ['ingredient1', 'ingredient2'],
  spicy: false,
  popular: true
}
```

### Customizing Colors

Edit `public/styles.css` and modify the CSS variables:

```css
:root {
    --primary: #FF6B6B;      /* Main color */
    --secondary: #4ECDC4;    /* Accent color */
    --background: #F7F7F7;   /* Background */
    /* ... more variables */
}
```

### Database Integration

For production, replace the in-memory `menuData` with a database:

```javascript
// Example with MongoDB
const Menu = require('./models/Menu');

app.get('/api/menu', async (req, res) => {
  const menuData = await Menu.find();
  res.json(menuData);
});
```

## 🏗️ Architecture

```
Menu/
├── public/
│   ├── index.html      # Main HTML structure
│   ├── styles.css      # All styling
│   └── app.js          # Frontend JavaScript
├── server.js           # Express server & API
├── package.json        # Dependencies
├── .env.example        # Environment template
└── README.md          # Documentation
```

## 🔌 API Endpoints

### GET `/api/menu`
Returns complete menu data

### GET `/api/menu/item/:id`
Returns specific item details

### POST `/api/chat`
AI chat endpoint
```json
{
  "message": "What vegan options do you have?",
  "conversationHistory": []
}
```

## 🎯 Use Cases

- **Restaurants**: Digital menu with AI assistance
- **Cafes**: Interactive ordering system
- **Food Trucks**: Mobile-friendly menu
- **Catering**: Dietary preference handling
- **Hotels**: Room service menu

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Backend**: Node.js, Express
- **AI**: OpenAI GPT (optional)
- **Styling**: Custom CSS with CSS Grid & Flexbox

## 📝 Future Enhancements

- [ ] User accounts and order history
- [ ] Payment integration (Stripe, PayPal)
- [ ] Real-time order tracking
- [ ] Admin dashboard for menu management
- [ ] Multi-language support
- [ ] Nutritional information
- [ ] Image upload for menu items
- [ ] Reviews and ratings
- [ ] Table reservation system
- [ ] Kitchen display system integration

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📄 License

MIT License - feel free to use this for commercial or personal projects.

## 💡 Tips

- **Without OpenAI API**: The fallback system provides intelligent responses based on menu data
- **With OpenAI API**: Get more natural, conversational AI assistance
- **Customization**: Easily modify menu data, colors, and styling
- **Mobile**: Fully responsive design works on all devices

## 🆘 Support

For issues or questions:
1. Check the console for error messages
2. Ensure the server is running (`npm start`)
3. Verify Node.js version (v14+)
4. Check that port 3000 is available

## 🎯 Presenting to Others

Want to showcase this to your team, clients, or in a presentation?

### 📚 Presentation Resources:

1. **[SIMPLE_DEMO_SCRIPT.md](SIMPLE_DEMO_SCRIPT.md)** - 2-minute demo script
   - Perfect for quick presentations
   - Step-by-step what to say and do
   - Timing breakdown included

2. **[PRESENTATION.md](PRESENTATION.md)** - Complete presentation guide
   - Slides and talking points
   - Different audience versions (business, technical, investors)
   - Q&A preparation
   - Video recording tips

3. **[PITCH_DECK.md](PITCH_DECK.md)** - Business pitch deck
   - Market opportunity
   - Revenue models
   - Competitive analysis
   - Perfect for investors or stakeholders

4. **[HANDOUT.md](HANDOUT.md)** - One-page quick reference
   - Key features summary
   - Sample conversations
   - Pricing and setup info
   - Print-friendly format

### 🎬 Quick Demo Flow:

1. Open `http://localhost:3000` (shows landing page)
2. Click "Try Live Demo" (goes to actual app)
3. Show menu browsing → filters → AI chat → cart
4. Takes 2 minutes, impresses everyone! ✨

---

## 🎉 Enjoy!

You now have a professional, AI-powered restaurant menu system with complete presentation materials. Perfect for:
- 💼 **Portfolio projects**
- 🎓 **Class presentations**
- 🏢 **Client demos**
- 💰 **Investor pitches**
- 🍽️ **Real restaurant deployments**

Customize it to match your brand and start serving customers in style!

