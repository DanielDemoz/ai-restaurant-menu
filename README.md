# AI-Powered Restaurant Menu

Node.js restaurant menu with search, dietary filters, cart ordering, and an AI chat assistant for recommendations and allergen questions.

## Problem

Restaurants need a modern digital menu that handles dietary restrictions and allergen questions without requiring staff to answer every query in person.

## Approach

Built an Express server serving a vanilla JS frontend with categorized menu data, real-time search/filtering, shopping cart with tax calculation, and a `/api/chat` endpoint. Supports optional OpenAI GPT integration with a built-in fallback response system when no API key is configured.

## Results

- Responsive menu with vegan, vegetarian, and gluten-free filters
- AI assistant for popular dishes, dietary options, and allergen guidance
- Works fully offline from OpenAI via intelligent fallback responses
- Lightweight stack with no frontend framework dependency

## Tech stack

Node.js, Express, vanilla JavaScript, HTML5, CSS3, OpenAI GPT (optional)

## How to run

```bash
git clone https://github.com/DanielDemoz/ai-restaurant-menu.git
cd ai-restaurant-menu
npm install
npm start
```

Open http://localhost:3000

Optional: create `.env` with `OPENAI_API_KEY=your_key_here`.

## Screenshot / demo

**Live demo:** https://danieldemoz.github.io/ai-restaurant-menu/

Customize menu items in `server.js` (`menuData` object). See `QUICK_CUSTOMIZE.md` for a 5-minute setup guide.

**DD Demo** — portfolio showcase by Daniel S. Demoz.

## Contact

Daniel S. Demoz  
📧 Email: asbdansi9@gmail.com  
📱 Phone: (437) 249-3308  
🔗 LinkedIn: linkedin.com/in/daniel-s-demoz  
💼 GitHub: github.com/DanielDemoz  
🌐 Website: brukdconsultancy.com
