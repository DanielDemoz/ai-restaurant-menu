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
        content: `You are a friendly, conversational Canadian restaurant assistant with extensive knowledge about our menu. You're enthusiastic, warm, personable, and passionate about food. You use casual Canadian expressions naturally (like "for sure", "right", "nice", "pretty good") but keep it subtle. Your role is to:

1. **Provide Detailed Descriptions**: Share rich details about flavors, cooking methods, and presentation
2. **Recommend Pairings**: Suggest drink pairings, side dishes, and complementary items
3. **Share Chef Insights**: Explain what makes each dish special, ingredients sources, and preparation techniques
4. **Guide Dietary Choices**: Provide comprehensive allergen info and dietary alternatives
5. **Tell Stories**: Share interesting facts about dishes, origins, and popular combinations
6. **Be Personable**: Ask follow-up questions, remember preferences in the conversation, and make personalized suggestions

Here is our complete menu with full details:
${menuContext}

**DETAILED MENU KNOWLEDGE:**

**APPETIZERS:**
- Bruschetta: Fresh tomatoes are hand-picked daily, mixed with extra virgin olive oil from Italy, fresh basil from our garden, and roasted garlic. Served on house-made artisan bread toasted to perfection. Perfect starter for sharing!

- Calamari Fritti: Fresh calamari rings hand-cut and lightly breaded with our secret spice blend. Fried until golden and crispy, served with house-made marinara sauce with a hint of basil. Goes great with a crisp white wine!

- Spinach Artichoke Dip: Creamy blend of fresh spinach, tender artichoke hearts, cream cheese, mozzarella, and parmesan. Baked until bubbly and served with crispy tortilla chips. Rich, indulgent, and vegetarian-friendly!

**MAIN COURSES:**
- Grilled Salmon: Premium Atlantic salmon fillet grilled to perfection with a light lemon butter sauce. Served with crisp asparagus spears and herb-roasted baby potatoes. Rich in Omega-3, gluten-free, and our #1 healthy option!

- Margherita Pizza: Classic Neapolitan-style pizza with San Marzano tomatoes, fresh buffalo mozzarella, hand-picked basil leaves, and extra virgin olive oil on our hand-stretched dough. Simple, authentic, and delicious!

- Ribeye Steak: USDA Prime 12oz ribeye, perfectly marbled, grilled to your preference. Served with creamy garlic mashed potatoes and seasonal grilled vegetables. For steak lovers who want premium quality!

- Vegan Buddha Bowl: Nutritious quinoa base topped with crispy roasted chickpeas, fresh avocado slices, organic kale, cherry tomatoes, and creamy tahini dressing. 100% plant-based, gluten-free, and packed with protein!

- Spicy Thai Curry: Aromatic red curry with tender chicken, coconut milk, Thai basil, bamboo shoots, bell peppers, and jasmine rice. Spicy heat level can be adjusted! Exotic flavors that transport you to Thailand!

**DESSERTS:**
- Tiramisu: Authentic Italian dessert with espresso-soaked ladyfingers layered with mascarpone cream and dusted with premium cocoa powder. Coffee lovers' dream! Made fresh daily.

- Chocolate Lava Cake: Decadent warm chocolate cake with a molten center that flows when you cut into it. Served with premium vanilla ice cream. The ultimate chocolate indulgence!

**BEVERAGES:**
- Fresh Lemonade: House-made daily with fresh-squeezed lemons, pure cane sugar, and fresh mint leaves. Refreshing, natural, and perfect for any meal!

- Craft Beer Selection: Rotating selection of local craft beers. Ask me about today's offerings! We feature IPAs, stouts, lagers, and seasonal specials.

**PAIRING SUGGESTIONS:**
- Bruschetta → Fresh Lemonade or White Wine
- Salmon → Chardonnay or Sauvignon Blanc
- Ribeye Steak → Red Wine (Cabernet) or Craft Beer
- Thai Curry → Riesling or Light Beer
- Pizza → Italian Red Wine or Craft Beer
- Vegan Bowl → Fresh Lemonade or Kombucha

**POPULAR COMBINATIONS:**
- Appetizer + Main: Start with Bruschetta, then Grilled Salmon
- Date Night: Calamari to share, two Ribeye Steaks, share Tiramisu
- Vegetarian Feast: Spinach Dip, Margherita Pizza, Chocolate Lava Cake
- Healthy Choice: Skip appetizer, Grilled Salmon or Vegan Bowl, Fresh Lemonade
- Spice Lovers: Start with something mild, go for Thai Curry (spicy!)

**CONVERSATION STYLE:**
- Be warm, friendly, and conversational like a helpful Canadian friend
- Use Canadian expressions subtly: "for sure", "right", "pretty good", "nice", "how's it going"
- Handle greetings warmly: "Hey there!", "How are you doing?", "Welcome!"
- Make small talk when appropriate
- Avoid using emojis in your responses - use words instead
- Ask friendly follow-up questions like:
  * "What type of food do you usually go for?"
  * "Are you thinking something light or hearty?"
  * "Any dietary stuff I should know about?"
  * "Have you tried [dish] before?"
  * "Does that sound good to you?"
  * "Want to hear more about it?"

**CANADIAN TOUCHES:**
- Mention when ingredients are Canadian (like Atlantic salmon)
- Be polite and friendly - say "please" and "thanks"
- Use "sorry" when appropriate
- Be humble but knowledgeable
- Weather references are okay!

Share your enthusiasm naturally and make customers excited about their meal! Keep it conversational and genuine!`
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

// Enhanced fallback response system with detailed menu knowledge
function getFallbackResponse(message, menuData) {
  const lowerMessage = message.toLowerCase();
  
  // Greetings and small talk (Canadian style!)
  if (lowerMessage.match(/^(hi|hey|hello|howdy|good morning|good afternoon|good evening|greetings|yo|sup)\b/)) {
    const greetings = [
      "Hey there! How's it going? I'm here to help you find some great food today! What are you in the mood for?",
      "Hello! Nice to see you! It's a beautiful day for some good food, don't you think? What can I help you with?",
      "Hi there, friend! Welcome! I'm so excited to help you choose something delicious. Are you hungry?",
      "Hey! How are you doing today? I'm here to make your meal choice super easy. What sounds good to you?",
      "Hello! Great to have you here! Ready to find something tasty? I know our menu inside and out!"
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  if (lowerMessage.match(/how are you|how's it going|what's up|wassup/)) {
    return "I'm doing great, thanks for asking! I'm pretty excited to help you find some amazing food today, actually! Our menu is fantastic. How about you - are you hungry? What kind of food are you craving?";
  }
  
  if (lowerMessage.match(/thanks|thank you|thx|appreciate/)) {
    const thanks = [
      "You're so welcome! Happy to help! Is there anything else you'd like to know about our menu?",
      "No problem at all! That's what I'm here for! Any other questions about the food?",
      "My pleasure! I love talking about food! Need anything else?",
      "Anytime! I'm always happy to help! Want to know more about any dishes?"
    ];
    return thanks[Math.floor(Math.random() * thanks.length)];
  }
  
  if (lowerMessage.match(/bye|goodbye|see you|later|cya/)) {
    return "Have a great day! Enjoy your meal - I hope it's delicious! Come back anytime you're hungry! Take care!";
  }
  
  // Weather small talk (Canadian!!)
  if (lowerMessage.includes('weather') || lowerMessage.includes('cold') || lowerMessage.includes('hot')) {
    return "Oh yeah, the weather! Nothing like good food no matter what it's like outside! Speaking of which, are you thinking something warm and cozy, or maybe something light and fresh? I can help you choose!";
  }
  
  // What's on the menu - comprehensive overview
  if (lowerMessage.includes('on the menu') || lowerMessage.includes('what do you have') || lowerMessage.includes('what do you serve')) {
    return `Great question! We have an amazing menu with something for everyone:\n\nAPPETIZERS: Bruschetta, Calamari, Spinach Artichoke Dip\n\nMAIN COURSES: Grilled Salmon, Ribeye Steak, Margherita Pizza, Thai Green Curry, Vegan Buddha Bowl\n\nDESSERTS: Tiramisu, Chocolate Lava Cake\n\nDRINKS: Craft Beer, Fresh Lemonade, and more!\n\nWe have vegetarian, vegan, and gluten-free options too! What type of food are you in the mood for? I can give you detailed descriptions of any dish!`;
  }
  
  // Today's specials
  if (lowerMessage.includes('special') || lowerMessage.includes('today')) {
    return `Today's specials are fantastic! Here's what our chef is featuring:\n\nGrilled Salmon Special - Atlantic salmon with lemon butter, asparagus, and roasted potatoes ($24.99) - Our most popular healthy choice!\n\nRibeye Steak Premium - USDA Prime 12oz ribeye with garlic mashed potatoes ($34.99) - Perfectly marbled and tender!\n\nVegan Buddha Bowl - Quinoa, roasted veggies, chickpeas, and tahini dressing ($18.99) - Fresh and nutritious!\n\nPair any entrée with our house-made Fresh Lemonade or local Craft Beer!\n\nWhich one sounds good to you?`;
  }
  
  // Chef's recommendations
  if (lowerMessage.includes('recommend') && !lowerMessage.includes('popular')) {
    return `I'd love to recommend something! Here are my personal favorites:\n\nIf you love seafood: Grilled Salmon - incredible flavor, healthy, and perfectly cooked!\n\nFor meat lovers: Ribeye Steak - premium cut, amazing marbling, cooked to perfection!\n\nVegetarian choice: Margherita Pizza - authentic Neapolitan style, simple and delicious!\n\nAdventurous palate: Thai Green Curry - aromatic coconut curry with authentic Thai spices!\n\nHealthy & filling: Vegan Buddha Bowl - colorful, nutritious, and super satisfying!\n\nWhat type of cuisine are you in the mood for? I can help narrow it down!`;
  }
  
  // Check for specific dishes (Canadian friendly!)
  if (lowerMessage.includes('salmon')) {
    return `Oh, you've got great taste! Our Grilled Salmon is absolutely wonderful! It's a premium Atlantic salmon fillet - straight from Canada's beautiful waters, actually! We grill it to perfection with a light lemon butter sauce. Comes with crisp asparagus spears and herb-roasted baby potatoes. It's our number one healthy option - packed with Omega-3, naturally gluten-free, and full of flavor. Only $24.99, which is a pretty good deal! Pairs beautifully with a nice Chardonnay or Sauvignon Blanc! Would you like to know about other options, or does the salmon sound good to you?`;
  }
  
  if (lowerMessage.includes('pizza')) {
    return `Oh yeah, our Margherita Pizza is beautiful! It's a classic done right - authentic Neapolitan-style with San Marzano tomatoes, fresh buffalo mozzarella, hand-picked basil leaves, and extra virgin olive oil on hand-stretched dough. Simple, authentic, and absolutely delicious for just $16.99. Perfect for vegetarians too! It goes really well with an Italian red wine or one of our local craft beers. Want to start with an appetizer, or are you good to go with just the pizza?`;
  }
  
  if (lowerMessage.includes('steak') || lowerMessage.includes('ribeye')) {
    return `Steak lovers, this is for you! Our Ribeye Steak is a USDA Prime 12oz cut with perfect marbling for maximum flavor and tenderness. We grill it to your preferred temperature and serve it with creamy garlic mashed potatoes and seasonal grilled vegetables. It's $34.99 and our most premium main course. Pairs excellently with a bold Cabernet or a rich craft beer. How do you like your steak cooked?`;
  }
  
  if (lowerMessage.includes('curry') || lowerMessage.includes('thai') || lowerMessage.includes('spicy')) {
    return `Our Spicy Thai Curry is an adventure for your taste buds! It features aromatic red curry with tender chicken, coconut milk, Thai basil, bamboo shoots, bell peppers, and jasmine rice. The flavors are exotic and transport you straight to Thailand! It's $19.99 and naturally gluten-free. We can adjust the spice level to your preference - mild, medium, or extra hot! Would you like to know about a cooling appetizer to pair with it?`;
  }
  
  if (lowerMessage.includes('buddha') || lowerMessage.includes('bowl')) {
    return `The Vegan Buddha Bowl is our pride! It's a nutritious quinoa base topped with crispy roasted chickpeas, fresh avocado slices, organic kale, cherry tomatoes, and creamy tahini dressing. It's 100% plant-based, gluten-free, and packed with protein and nutrients - all for $18.99. Perfect for vegans, vegetarians, or anyone wanting a super healthy meal. Pairs great with our Fresh Lemonade! Can I tell you about our other vegan options?`;
  }
  
  // Check for dietary preferences with details
  if (lowerMessage.includes('vegan')) {
    const veganItems = findItemsByDiet('vegan', menuData);
    return `Great choice going vegan! We have ${veganItems.length} delicious vegan options:\n\n🌱 Vegan Buddha Bowl ($18.99) - Our signature bowl with quinoa, roasted chickpeas, avocado, kale, and tahini dressing. Protein-packed and super nutritious!\n\n🥤 Fresh Lemonade ($4.99) - House-made daily with fresh lemons and mint.\n\nAll our vegan dishes are also gluten-free and made with organic ingredients when possible. Would you like detailed information about any of these?`;
  }
  
  if (lowerMessage.includes('vegetarian')) {
    const vegItems = findItemsByDiet('vegetarian', menuData);
    return `We love our vegetarian options! Here's what we have:\n\n🥖 Bruschetta ($8.99) - Fresh tomatoes, basil, garlic on toasted artisan bread\n🧀 Spinach Artichoke Dip ($10.99) - Creamy, rich, and perfect for sharing\n🍕 Margherita Pizza ($16.99) - Classic Neapolitan-style with fresh mozzarella\n🌱 Vegan Buddha Bowl ($18.99) - Also 100% vegetarian and super healthy\n🍰 Tiramisu ($8.99) - Classic Italian dessert with espresso and mascarpone\n🍫 Chocolate Lava Cake ($9.99) - Decadent warm chocolate with molten center\n🥤 Fresh Lemonade ($4.99) - Refreshing and naturally made\n\nWould you like a recommendation for a full meal?`;
  }
  
  if (lowerMessage.includes('gluten-free') || lowerMessage.includes('gluten free')) {
    const gfItems = findItemsByDiet('gluten-free', menuData);
    return `We have excellent gluten-free options! Here's the complete list:\n\n🐟 Grilled Salmon ($24.99) - Premium Atlantic salmon with lemon butter, asparagus, and roasted potatoes. Our healthiest option!\n🥩 Ribeye Steak ($34.99) - USDA Prime with garlic mashed potatoes and vegetables\n🌱 Vegan Buddha Bowl ($18.99) - Quinoa, chickpeas, avocado, kale, tahini\n🍛 Spicy Thai Curry ($19.99) - Red curry with chicken, coconut milk, and jasmine rice\n🥤 Fresh Lemonade ($4.99) - House-made with fresh lemons\n\nAll are naturally gluten-free and absolutely delicious! What type of cuisine are you in the mood for?`;
  }
  
  // Check for popular/recommendations with details
  if (lowerMessage.includes('recommend') || lowerMessage.includes('popular') || lowerMessage.includes('best')) {
    const popularItems = findPopularItems(menuData);
    return `Our most popular dishes are absolute crowd-pleasers! Here are our top picks:\n\n⭐ Bruschetta ($8.99) - Customer favorite appetizer! Fresh tomatoes, basil, garlic on toasted artisan bread\n⭐ Calamari Fritti ($12.99) - Crispy, golden, perfectly seasoned. Goes great with wine!\n⭐ Grilled Salmon ($24.99) - Our #1 healthy choice. Premium quality, perfectly cooked\n⭐ Margherita Pizza ($16.99) - Classic Neapolitan-style. Simple and authentic\n⭐ Ribeye Steak ($34.99) - For steak lovers. USDA Prime, perfectly marbled\n⭐ Spicy Thai Curry ($19.99) - Exotic flavors that transport you to Thailand\n⭐ Tiramisu ($8.99) - Made fresh daily. Coffee lovers' dream!\n⭐ Chocolate Lava Cake ($9.99) - The ultimate chocolate indulgence\n\nWhat type of meal are you looking for? I can create the perfect combination for you!`;
  }
  
  // Check for specific allergens
  if (lowerMessage.includes('allerg') || lowerMessage.includes('dairy') || lowerMessage.includes('nut')) {
    return `I'm here to help you navigate allergens safely! Our menu includes detailed allergen information for every dish. Common allergens we track:\n\n🥛 Dairy - Found in: Spinach Dip, Pizza, Salmon, Steak, Desserts\n🌾 Gluten - Found in: Bruschetta, Calamari, Pizza, Tiramisu, Lava Cake, Beer\n🦐 Seafood - Found in: Calamari, Salmon\n🥚 Eggs - Found in: Tiramisu, Lava Cake\n🥜 Sesame - Found in: Vegan Buddha Bowl (tahini)\n\nWhich allergens do you need to avoid? I'll give you a detailed list of safe options!`;
  }
  
  // Check for price queries
  if (lowerMessage.includes('cheap') || lowerMessage.includes('affordable') || lowerMessage.includes('budget')) {
    const affordableItems = findAffordableItems(menuData);
    return `Great value options that don't compromise on taste!\n\n💰 Fresh Lemonade ($4.99) - House-made with fresh lemons and mint\n💰 Craft Beer ($7.99) - Rotating selection of local favorites\n💰 Bruschetta ($8.99) - Perfect starter, fresh and flavorful\n💰 Tiramisu ($8.99) - Authentic Italian dessert\n💰 Chocolate Lava Cake ($9.99) - Decadent chocolate experience\n💰 Spinach Artichoke Dip ($10.99) - Rich and shareable\n💰 Calamari ($12.99) - Crispy and delicious\n💰 Margherita Pizza ($16.99) - Classic and filling\n\nI can help you build a complete meal within your budget! What's your price range?`;
  }
  
  // Check for pairing suggestions
  if (lowerMessage.includes('pair') || lowerMessage.includes('wine') || lowerMessage.includes('drink') || lowerMessage.includes('beverage')) {
    return `Great question about pairings! Here are my expert suggestions:\n\nWith Salmon: Chardonnay or Sauvignon Blanc (white wines) or Fresh Lemonade\nWith Ribeye Steak: Bold Cabernet Sauvignon or one of our Craft Beers\nWith Margherita Pizza: Italian red wine or Craft Beer\nWith Thai Curry: Riesling (slightly sweet) or Light Beer to cool the spice\nWith Bruschetta: Crisp white wine or Fresh Lemonade\n\nWe also have a rotating selection of local craft beers including IPAs, stouts, and lagers!\nFor non-alcoholic, our house-made Fresh Lemonade pairs beautifully with everything!\n\nWhat dish are you considering? I can give you the perfect pairing!`;
  }
  
  // Default response with detailed menu overview (Canadian friendly!)
  return `Hey there! Welcome! I'm your friendly menu helper and I know every dish inside and out! Pretty excited to help you find something delicious!\n\nI can chat with you about:\n• Any dish you're curious about\n• Dietary options (vegan, vegetarian, gluten-free)\n• Allergen info - keeping you safe!\n• What pairs well together\n• Budget-friendly options\n• Our most popular picks\n\nSo, what are you in the mood for today? Something light and healthy? Rich and hearty? Maybe something with a bit of a kick? Or would you like to hear what's popular? I'm all ears!`;
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
  console.log(`Brukd Menu Server running on http://localhost:${PORT}`);
  console.log(`Open your browser to view the menu`);
  if (!process.env.OPENAI_API_KEY) {
    console.log(`OpenAI API key not found. Using fallback AI responses.`);
    console.log(`Add OPENAI_API_KEY to .env file for full AI features.`);
  }
});
