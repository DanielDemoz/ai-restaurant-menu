# Brukd - AI-Powered Restaurant Menu

A modern, intelligent restaurant menu system with AI assistance for dietary recommendations and allergen information.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://danieldemoz.github.io/ai-restaurant-menu/)
[![Node.js](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Features

### Smart Menu System
- Modern, responsive interface
- Real-time search and filtering
- Dietary preference filters (vegan, vegetarian, gluten-free)
- High-quality food imagery
- Mobile-optimized design

### AI Assistant
- Natural language menu queries
- Dietary restriction support
- Allergen information
- Personalized recommendations
- Works with or without OpenAI API (intelligent fallback system)

### Easy Ordering
- Interactive shopping cart
- Real-time price calculation
- Tax computation
- Quantity management

## Quick Start

### Prerequisites
- Node.js v14 or higher
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/DanielDemoz/ai-restaurant-menu.git
cd ai-restaurant-menu

# Install dependencies
npm install

# Start the server
npm start
```

Open your browser to `http://localhost:3000`

## Configuration

### Optional: OpenAI Integration

For enhanced AI features, create a `.env` file:

```env
OPENAI_API_KEY=your_api_key_here
PORT=3000
```

**Note:** The system works perfectly without an API key using built-in intelligent responses.

## Usage

### Browse Menu
- View items organized by category
- Click items for detailed information
- Filter by dietary preferences
- Search for specific dishes

### AI Assistant
- Click the chat button (bottom right)
- Ask questions like:
  - "What are your most popular dishes?"
  - "I'm vegan, what can I eat?"
  - "Do you have gluten-free options?"
  - "I'm allergic to dairy, what do you recommend?"

### Order
- Add items to cart
- Adjust quantities
- Review total with tax
- Complete checkout

## Customization

### Update Menu Items

Edit `server.js` and modify the `menuData` object:

```javascript
{
  id: 13,
  name: 'Your Dish',
  description: 'Description here',
  price: 19.99,
  image: 'image-url',
  dietary: ['vegetarian'],
  allergens: ['gluten'],
  ingredients: ['ingredient1', 'ingredient2'],
  spicy: false,
  popular: true
}
```

### Customize Branding

Edit `public/styles.css`:

```css
:root {
    --primary: #FF6B6B;      /* Brand color */
    --secondary: #4ECDC4;    /* Accent color */
    --background: #F7F7F7;   /* Background */
}
```

## Project Structure

```
brukd-menu/
├── public/
│   ├── index.html       # Main application
│   ├── demo.html        # Landing page
│   ├── styles.css       # Styling
│   └── app.js           # Frontend logic
├── server.js            # Express server + API
├── package.json         # Dependencies
└── README.md           # Documentation
```

## API Endpoints

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

## Technology Stack

- **Frontend:** Vanilla JavaScript, HTML5, CSS3
- **Backend:** Node.js, Express
- **AI:** OpenAI GPT (optional) with smart fallback
- **Styling:** Custom CSS (no frameworks)

## Deployment

### Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create brukd-menu

# Deploy
git push heroku main
```

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### GitHub Pages (Static Demo)

The demo page is automatically deployed to GitHub Pages at:
https://danieldemoz.github.io/ai-restaurant-menu/

## Performance

- Lightweight (no heavy frameworks)
- Fast loading times
- Optimized for mobile
- SEO-friendly
- Accessible (WCAG compliant)

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/improvement`)
5. Create Pull Request

## License

MIT License - feel free to use for personal or commercial projects.

## Support

For issues or questions:
- Open an issue on GitHub
- Check existing documentation
- Review the API endpoints

## Acknowledgments

Built with modern web technologies and AI integration to enhance the dining experience.

---

**Brukd** - Smart dining, simplified.
