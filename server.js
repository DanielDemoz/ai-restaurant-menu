const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Serve demo page at root if accessed
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/demo.html');
});

// Initialize OpenAI (optional - can be replaced with other AI services)
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
}) : null;

// Sample menu data (in production, this would be from a database)
const menuData = {
  categories: [
    {
      id: 'appetizers',
      name: 'Appetizers',
      items: [
        {
          id: 1,
          name: 'Bruschetta',
          description: 'Toasted bread topped with fresh tomatoes, garlic, basil, and olive oil',
          price: 8.99,
          image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400',
          dietary: ['vegetarian'],
          allergens: ['gluten'],
          ingredients: ['tomatoes', 'garlic', 'basil', 'bread', 'olive oil'],
          spicy: false,
          popular: true
        },
        {
          id: 2,
          name: 'Calamari Fritti',
          description: 'Crispy fried calamari rings served with marinara sauce',
          price: 12.99,
          image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400',
          dietary: [],
          allergens: ['seafood', 'gluten'],
          ingredients: ['calamari', 'flour', 'marinara sauce'],
          spicy: false,
          popular: true
        },
        {
          id: 3,
          name: 'Spinach Artichoke Dip',
          description: 'Creamy blend of spinach, artichokes, and cheese served with tortilla chips',
          price: 10.99,
          image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=400',
          dietary: ['vegetarian'],
          allergens: ['dairy'],
          ingredients: ['spinach', 'artichokes', 'cream cheese', 'mozzarella'],
          spicy: false,
          popular: false
        }
      ]
    },
    {
      id: 'mains',
      name: 'Main Courses',
      items: [
        {
          id: 4,
          name: 'Grilled Salmon',
          description: 'Atlantic salmon fillet with lemon butter sauce, asparagus, and roasted potatoes',
          price: 24.99,
          image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=400',
          dietary: ['gluten-free', 'pescatarian'],
          allergens: ['fish', 'dairy'],
          ingredients: ['salmon', 'butter', 'lemon', 'asparagus', 'potatoes'],
          spicy: false,
          popular: true
        },
        {
          id: 5,
          name: 'Margherita Pizza',
          description: 'Classic pizza with fresh mozzarella, tomatoes, and basil',
          price: 16.99,
          image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
          dietary: ['vegetarian'],
          allergens: ['gluten', 'dairy'],
          ingredients: ['mozzarella', 'tomatoes', 'basil', 'pizza dough'],
          spicy: false,
          popular: true
        },
        {
          id: 6,
          name: 'Ribeye Steak',
          description: '12oz USDA Prime ribeye with garlic mashed potatoes and seasonal vegetables',
          price: 34.99,
          image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400',
          dietary: ['gluten-free'],
          allergens: ['dairy'],
          ingredients: ['beef', 'potatoes', 'garlic', 'butter', 'seasonal vegetables'],
          spicy: false,
          popular: true
        },
        {
          id: 7,
          name: 'Vegan Buddha Bowl',
          description: 'Quinoa, roasted chickpeas, avocado, kale, and tahini dressing',
          price: 18.99,
          image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
          dietary: ['vegan', 'vegetarian', 'gluten-free'],
          allergens: ['sesame'],
          ingredients: ['quinoa', 'chickpeas', 'avocado', 'kale', 'tahini'],
          spicy: false,
          popular: false
        },
        {
          id: 8,
          name: 'Spicy Thai Curry',
          description: 'Red curry with chicken, vegetables, and jasmine rice',
          price: 19.99,
          image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400',
          dietary: ['gluten-free'],
          allergens: ['dairy'],
          ingredients: ['chicken', 'curry paste', 'coconut milk', 'vegetables', 'rice'],
          spicy: true,
          popular: true
        }
      ]
    },
    {
      id: 'desserts',
      name: 'Desserts',
      items: [
        {
          id: 9,
          name: 'Tiramisu',
          description: 'Classic Italian dessert with espresso-soaked ladyfingers and mascarpone',
          price: 8.99,
          image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
          dietary: ['vegetarian'],
          allergens: ['gluten', 'dairy', 'eggs'],
          ingredients: ['ladyfingers', 'espresso', 'mascarpone', 'cocoa'],
          spicy: false,
          popular: true
        },
        {
          id: 10,
          name: 'Chocolate Lava Cake',
          description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
          price: 9.99,
          image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400',
          dietary: ['vegetarian'],
          allergens: ['gluten', 'dairy', 'eggs'],
          ingredients: ['chocolate', 'flour', 'butter', 'eggs', 'ice cream'],
          spicy: false,
          popular: true
        }
      ]
    },
    {
      id: 'drinks',
      name: 'Beverages',
      items: [
        {
          id: 11,
          name: 'Fresh Lemonade',
          description: 'House-made lemonade with fresh lemons and mint',
          price: 4.99,
          image: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9d?w=400',
          dietary: ['vegan', 'vegetarian', 'gluten-free'],
          allergens: [],
          ingredients: ['lemons', 'sugar', 'mint', 'water'],
          spicy: false,
          popular: false
        },
        {
          id: 12,
          name: 'Craft Beer Selection',
          description: 'Ask your server for our rotating selection of local craft beers',
          price: 7.99,
          image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400',
          dietary: [],
          allergens: ['gluten'],
          ingredients: ['barley', 'hops', 'water'],
          spicy: false,
          popular: true
        }
      ]
    }
  ]
};

// API Routes
app.get('/api/menu', (req, res) => {
  res.json(menuData);
});

app.get('/api/menu/item/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  let foundItem = null;
  
  for (const category of menuData.categories) {
    const item = category.items.find(i => i.id === itemId);
    if (item) {
      foundItem = { ...item, category: category.name };
      break;
    }
  }
  
  if (foundItem) {
    res.json(foundItem);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// AI Chat endpoint
app.post('/api/chat', async (req, res) => {
  const { message, conversationHistory = [] } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // If OpenAI is not configured, use a fallback response system
    if (!openai) {
      const fallbackResponse = getFallbackResponse(message, menuData);
      return res.json({ response: fallbackResponse });
    }

    // Create context about the menu for the AI
    const menuContext = createMenuContext(menuData);
    
    const messages = [
      {
        role: 'system',
        content: `You are a helpful AI assistant for a restaurant. Your job is to help customers with menu recommendations, answer questions about dishes, dietary restrictions, allergens, and help them make the best choice. Be friendly, concise, and knowledgeable.
        
Here is our current menu:
${menuContext}

When recommending dishes, consider:
- Customer preferences and dietary restrictions
- Popular items
- Flavor profiles
- Price points
- Allergens and ingredients`
      },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 500,
      temperature: 0.7
    });

    const response = completion.choices[0].message.content;
    res.json({ response });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Failed to get AI response',
      response: 'I apologize, but I\'m having trouble processing your request right now. Please try asking about specific menu items or dietary preferences!'
    });
  }
});

// Fallback response system when OpenAI is not available
function getFallbackResponse(message, menuData) {
  const lowerMessage = message.toLowerCase();
  
  // Check for dietary preferences
  if (lowerMessage.includes('vegan')) {
    const veganItems = findItemsByDiet('vegan', menuData);
    return `We have several vegan options: ${veganItems.map(i => i.name).join(', ')}. Would you like to know more about any of these?`;
  }
  
  if (lowerMessage.includes('vegetarian')) {
    const vegItems = findItemsByDiet('vegetarian', menuData);
    return `Our vegetarian options include: ${vegItems.map(i => i.name).join(', ')}. All are delicious!`;
  }
  
  if (lowerMessage.includes('gluten-free') || lowerMessage.includes('gluten free')) {
    const gfItems = findItemsByDiet('gluten-free', menuData);
    return `We offer these gluten-free dishes: ${gfItems.map(i => i.name).join(', ')}.`;
  }
  
  // Check for popular/recommendations
  if (lowerMessage.includes('recommend') || lowerMessage.includes('popular') || lowerMessage.includes('best')) {
    const popularItems = findPopularItems(menuData);
    return `Our most popular dishes are: ${popularItems.map(i => `${i.name} ($${i.price})`).join(', ')}. They're all customer favorites!`;
  }
  
  // Check for specific allergens
  if (lowerMessage.includes('allerg') || lowerMessage.includes('dairy') || lowerMessage.includes('nut')) {
    return `I can help you find dishes that avoid specific allergens. What allergens should I look out for? (dairy, gluten, nuts, seafood, eggs, etc.)`;
  }
  
  // Check for price queries
  if (lowerMessage.includes('cheap') || lowerMessage.includes('affordable') || lowerMessage.includes('budget')) {
    const affordableItems = findAffordableItems(menuData);
    return `Our most affordable options include: ${affordableItems.slice(0, 3).map(i => `${i.name} ($${i.price})`).join(', ')}.`;
  }
  
  // Default response
  return `I'm here to help you find the perfect meal! I can recommend dishes based on your preferences, dietary restrictions, or allergens. What are you in the mood for today?`;
}

function findItemsByDiet(diet, menuData) {
  const items = [];
  menuData.categories.forEach(cat => {
    cat.items.forEach(item => {
      if (item.dietary.includes(diet)) {
        items.push(item);
      }
    });
  });
  return items;
}

function findPopularItems(menuData) {
  const items = [];
  menuData.categories.forEach(cat => {
    cat.items.forEach(item => {
      if (item.popular) {
        items.push(item);
      }
    });
  });
  return items;
}

function findAffordableItems(menuData) {
  const items = [];
  menuData.categories.forEach(cat => {
    cat.items.forEach(item => {
      items.push(item);
    });
  });
  return items.sort((a, b) => a.price - b.price);
}

function createMenuContext(menuData) {
  let context = '';
  menuData.categories.forEach(category => {
    context += `\n${category.name}:\n`;
    category.items.forEach(item => {
      context += `- ${item.name} ($${item.price}): ${item.description}`;
      if (item.dietary.length > 0) {
        context += ` [${item.dietary.join(', ')}]`;
      }
      if (item.allergens.length > 0) {
        context += ` (Contains: ${item.allergens.join(', ')})`;
      }
      context += '\n';
    });
  });
  return context;
}

app.listen(PORT, () => {
  console.log(`🍽️  AI Restaurant Menu Server running on http://localhost:${PORT}`);
  console.log(`📱 Open your browser to view the menu`);
  if (!process.env.OPENAI_API_KEY) {
    console.log(`⚠️  OpenAI API key not found. Using fallback AI responses.`);
    console.log(`   Add OPENAI_API_KEY to .env file for full AI features.`);
  }
});

