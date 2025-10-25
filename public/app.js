// State
let menuData = null;
let cart = [];
let conversationHistory = [];
let currentFilter = 'all';
let searchQuery = '';
let speechEnabled = true; // Toggle for speech feature
let speechSynthesis = window.speechSynthesis;
let recognition = null; // Speech recognition
let isListening = false;

// Embedded menu data for standalone mode (GitHub Pages)
const embeddedMenuData = {
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
                    name: 'Calamari',
                    description: 'Crispy fried squid rings served with marinara sauce',
                    price: 12.99,
                    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400',
                    dietary: [],
                    allergens: ['seafood', 'gluten'],
                    ingredients: ['squid', 'flour', 'marinara sauce'],
                    spicy: false,
                    popular: false
                },
                {
                    id: 3,
                    name: 'Spinach Artichoke Dip',
                    description: 'Creamy blend of spinach, artichokes, and cheeses served with tortilla chips',
                    price: 10.99,
                    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=400',
                    dietary: ['vegetarian'],
                    allergens: ['dairy'],
                    ingredients: ['spinach', 'artichokes', 'cream cheese', 'mozzarella', 'parmesan'],
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
                    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
                    dietary: ['gluten-free'],
                    allergens: ['fish'],
                    ingredients: ['salmon', 'lemon', 'butter', 'asparagus', 'potatoes'],
                    spicy: false,
                    popular: true
                },
                {
                    id: 5,
                    name: 'Ribeye Steak',
                    description: '12oz USDA Prime ribeye with garlic mashed potatoes and seasonal vegetables',
                    price: 34.99,
                    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
                    dietary: ['gluten-free'],
                    allergens: ['dairy'],
                    ingredients: ['ribeye', 'potatoes', 'garlic', 'butter', 'vegetables'],
                    spicy: false,
                    popular: true
                },
                {
                    id: 6,
                    name: 'Margherita Pizza',
                    description: 'Classic Neapolitan pizza with fresh mozzarella, basil, and San Marzano tomatoes',
                    price: 16.99,
                    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
                    dietary: ['vegetarian'],
                    allergens: ['gluten', 'dairy'],
                    ingredients: ['dough', 'mozzarella', 'tomatoes', 'basil', 'olive oil'],
                    spicy: false,
                    popular: true
                },
                {
                    id: 7,
                    name: 'Thai Green Curry',
                    description: 'Aromatic coconut curry with vegetables, tofu, and jasmine rice',
                    price: 18.99,
                    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400',
                    dietary: ['vegan', 'gluten-free'],
                    allergens: [],
                    ingredients: ['coconut milk', 'vegetables', 'tofu', 'curry paste', 'rice'],
                    spicy: true,
                    popular: false
                },
                {
                    id: 8,
                    name: 'Vegan Buddha Bowl',
                    description: 'Quinoa, roasted vegetables, chickpeas, avocado, and tahini dressing',
                    price: 18.99,
                    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
                    dietary: ['vegan', 'gluten-free'],
                    allergens: [],
                    ingredients: ['quinoa', 'chickpeas', 'vegetables', 'avocado', 'tahini'],
                    spicy: false,
                    popular: false
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
                    ingredients: ['ladyfingers', 'mascarpone', 'espresso', 'cocoa'],
                    spicy: false,
                    popular: true
                },
                {
                    id: 10,
                    name: 'Chocolate Lava Cake',
                    description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
                    price: 9.99,
                    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400',
                    dietary: ['vegetarian'],
                    allergens: ['gluten', 'dairy', 'eggs'],
                    ingredients: ['chocolate', 'butter', 'eggs', 'flour', 'ice cream'],
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
                    name: 'Craft Beer',
                    description: 'Rotating selection of local craft beers',
                    price: 7.99,
                    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400',
                    dietary: ['vegan'],
                    allergens: ['gluten'],
                    ingredients: ['hops', 'malt', 'yeast', 'water'],
                    spicy: false,
                    popular: false
                },
                {
                    id: 12,
                    name: 'Fresh Lemonade',
                    description: 'House-made lemonade with fresh lemons and mint',
                    price: 4.99,
                    image: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9f?w=400',
                    dietary: ['vegan', 'gluten-free'],
                    allergens: [],
                    ingredients: ['lemons', 'sugar', 'mint', 'water'],
                    spicy: false,
                    popular: true
                }
            ]
        }
    ]
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadMenu();
    setupEventListeners();
    updateCartCount();
    initializeSpeechRecognition();
});

// Event Listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const view = e.target.dataset.view;
            switchView(view);
        });
    });
    
    // Filters
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            filterMenu();
        });
    });
    
    // Search
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        filterMenu();
    });
    
    // Modal click outside
    document.getElementById('item-modal').addEventListener('click', (e) => {
        if (e.target.id === 'item-modal') {
            closeModal();
        }
    });
}

// Load Menu
async function loadMenu() {
    try {
        // Try to fetch from server first
        const response = await fetch('http://localhost:3000/api/menu');
        if (response.ok) {
            menuData = await response.json();
            console.log('Menu loaded from server');
        } else {
            throw new Error('Server not available');
        }
    } catch (error) {
        // Fallback to embedded data for standalone mode (GitHub Pages)
        console.log('Using embedded menu data (standalone mode)');
        menuData = embeddedMenuData;
    }
    renderMenu();
}

// Render Menu
function renderMenu() {
    if (!menuData) return;
    
    const container = document.getElementById('menu-container');
    container.innerHTML = '';
    
    menuData.categories.forEach(category => {
        const visibleItems = category.items.filter(item => {
            // Filter check
            if (currentFilter !== 'all') {
                if (currentFilter === 'popular' && !item.popular) return false;
                if (currentFilter !== 'popular' && !item.dietary.includes(currentFilter)) return false;
            }
            
            // Search check
            if (searchQuery && !item.name.toLowerCase().includes(searchQuery) && 
                !item.description.toLowerCase().includes(searchQuery)) {
                return false;
            }
            
            return true;
        });
        
        if (visibleItems.length === 0) return;
        
        const categoryEl = document.createElement('div');
        categoryEl.className = 'menu-category';
        categoryEl.innerHTML = `
            <h2 class="category-title">${category.name}</h2>
            <div class="menu-grid">
                ${visibleItems.map(item => renderMenuItem(item)).join('')}
            </div>
        `;
        container.appendChild(categoryEl);
    });
}

function renderMenuItem(item) {
    const dietaryTags = item.dietary.map(d => `<span class="tag">${d}</span>`).join('');
    const spicyTag = item.spicy ? '<span class="tag spicy">🌶️ Spicy</span>' : '';
    const popularBadge = item.popular ? '<div class="item-badge">Popular</div>' : '';
    
    return `
        <div class="menu-item" onclick="showItemDetails(${item.id})">
            ${popularBadge}
            <img src="${item.image}" alt="${item.name}" class="item-image">
            <div class="item-content">
                <div class="item-header">
                    <h3 class="item-name">${item.name}</h3>
                    <span class="item-price">$${item.price.toFixed(2)}</span>
                </div>
                <p class="item-description">${item.description}</p>
                <div class="item-tags">
                    ${dietaryTags}
                    ${spicyTag}
                </div>
                <div class="item-footer">
                    <button class="btn btn-primary" onclick="event.stopPropagation(); addToCart(${item.id})">
                        Add to Cart
                    </button>
                    <button class="btn btn-secondary" onclick="event.stopPropagation(); showItemDetails(${item.id})">
                        Details
                    </button>
                </div>
            </div>
        </div>
    `;
}

function filterMenu() {
    renderMenu();
}

// Item Details Modal
function showItemDetails(itemId) {
    if (!menuData) return;
    
    let item = null;
    for (const category of menuData.categories) {
        item = category.items.find(i => i.id === itemId);
        if (item) break;
    }
    
    if (!item) return;
    
    const modal = document.getElementById('item-modal');
    const modalBody = document.getElementById('modal-body');
    
    const dietaryTags = item.dietary.map(d => `<li>${d}</li>`).join('');
    const allergenTags = item.allergens.map(a => `<li>${a}</li>`).join('');
    const ingredientTags = item.ingredients.map(i => `<li>${i}</li>`).join('');
    
    modalBody.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="modal-image">
        <div class="modal-body">
            <h2 class="modal-title">${item.name}</h2>
            <div class="modal-price">$${item.price.toFixed(2)}</div>
            <p class="modal-description">${item.description}</p>
            
            ${item.dietary.length > 0 ? `
                <div class="modal-section">
                    <h3>Dietary Information</h3>
                    <ul>${dietaryTags}</ul>
                </div>
            ` : ''}
            
            ${item.allergens.length > 0 ? `
                <div class="modal-section">
                    <h3>⚠️ Contains Allergens</h3>
                    <ul>${allergenTags}</ul>
                </div>
            ` : ''}
            
            <div class="modal-section">
                <h3>Ingredients</h3>
                <ul>${ingredientTags}</ul>
            </div>
            
            <button class="btn btn-primary btn-large" onclick="addToCart(${item.id}); closeModal();">
                Add to Cart - $${item.price.toFixed(2)}
            </button>
        </div>
    `;
    
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('item-modal').classList.remove('active');
}

// Cart Functions
function addToCart(itemId) {
    if (!menuData) return;
    
    let item = null;
    for (const category of menuData.categories) {
        item = category.items.find(i => i.id === itemId);
        if (item) break;
    }
    
    if (!item) return;
    
    const existingItem = cart.find(i => i.id === itemId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    
    updateCartCount();
    renderCart();
    
    // Show feedback
    showToast(`${item.name} added to cart!`);
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartCount();
    renderCart();
}

function updateQuantity(itemId, delta) {
    const item = cart.find(i => i.id === itemId);
    if (!item) return;
    
    item.quantity += delta;
    
    if (item.quantity <= 0) {
        removeFromCart(itemId);
    } else {
        updateCartCount();
        renderCart();
    }
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartEmpty = document.getElementById('cart-empty');
    const cartSummary = document.getElementById('cart-summary');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '';
        cartEmpty.style.display = 'block';
        cartSummary.style.display = 'none';
        return;
    }
    
    cartEmpty.style.display = 'none';
    cartSummary.style.display = 'block';
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-control">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6 L6 18 M6 6 L18 18" stroke="currentColor" stroke-width="2"/>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');
    
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

function checkout() {
    if (cart.length === 0) return;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.08;
    
    alert(`Order placed successfully!\n\nTotal: $${total.toFixed(2)}\n\nThank you for your order!`);
    
    cart = [];
    updateCartCount();
    renderCart();
    switchView('menu');
}

// View Switching
function switchView(view) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(`${view}-view`).classList.add('active');
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.view === view) {
            btn.classList.add('active');
        }
    });
    
    if (view === 'cart') {
        renderCart();
    }
}

// Chat Functions
function toggleChat() {
    const panel = document.getElementById('chat-panel');
    const wasActive = panel.classList.contains('active');
    panel.classList.toggle('active');
    
    // Speak welcome message when opening chat for the first time (Canadian style!)
    if (!wasActive && speechEnabled) {
        setTimeout(() => {
            speakText("Hey there! How's it going? I'm your friendly menu helper and I'm pretty excited to help you find something delicious today! What are you in the mood for?");
        }, 500);
    }
    
    // Cancel speech when closing chat
    if (wasActive && speechSynthesis) {
        speechSynthesis.cancel();
    }
}

async function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    input.value = '';
    
    // Add user message
    addChatMessage(message, 'user');
    
    // Show loading
    const loadingId = addChatLoading();
    
    try {
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message,
                conversationHistory
            })
        });
        
        const data = await response.json();
        
        // Remove loading
        removeChatLoading(loadingId);
        
        // Add bot response
        addChatMessage(data.response, 'bot');
        
        // Speak the response
        speakText(data.response);
        
        // Update conversation history
        conversationHistory.push(
            { role: 'user', content: message },
            { role: 'assistant', content: data.response }
        );
        
        // Keep only last 10 messages
        if (conversationHistory.length > 10) {
            conversationHistory = conversationHistory.slice(-10);
        }
        
    } catch (error) {
        console.log('Using offline chat mode');
        removeChatLoading(loadingId);
        
        // Use offline response
        const offlineResponse = getOfflineResponse(message);
        addChatMessage(offlineResponse, 'bot');
        speakText(offlineResponse);
        
        // Update conversation history
        conversationHistory.push(
            { role: 'user', content: message },
            { role: 'assistant', content: offlineResponse }
        );
        
        if (conversationHistory.length > 10) {
            conversationHistory = conversationHistory.slice(-10);
        }
    }
}

// Offline response generator for standalone mode
function getOfflineResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Greetings
    if (lowerMessage.match(/^(hi|hey|hello|good morning|good afternoon|good evening)\b/)) {
        return "Hey there! How's it going? I'm your friendly menu helper! What are you in the mood for today?";
    }
    
    // What's on menu
    if (lowerMessage.includes('on the menu') || lowerMessage.includes('what do you have')) {
        return "Great question! We have Appetizers (Bruschetta, Calamari, Spinach Dip), Main Courses (Grilled Salmon, Ribeye Steak, Margherita Pizza, Thai Curry, Vegan Buddha Bowl), Desserts (Tiramisu, Chocolate Lava Cake), and Drinks (Craft Beer, Fresh Lemonade). What sounds good to you?";
    }
    
    // Today's specials
    if (lowerMessage.includes('special')) {
        return "Today's specials are fantastic! Grilled Salmon ($24.99) - Atlantic salmon with lemon butter, Ribeye Steak ($34.99) - USDA Prime with garlic mashed potatoes, and Vegan Buddha Bowl ($18.99) - Quinoa with roasted veggies! Which one interests you?";
    }
    
    // Recommendations
    if (lowerMessage.includes('recommend')) {
        return "I'd love to recommend something! For seafood: Grilled Salmon. For meat lovers: Ribeye Steak. For vegetarians: Margherita Pizza. For vegan: Buddha Bowl or Thai Curry. What type of food are you craving?";
    }
    
    // Salmon
    if (lowerMessage.includes('salmon')) {
        return "Oh, you've got great taste! Our Grilled Salmon is absolutely wonderful! It's a premium Atlantic salmon fillet with lemon butter sauce, asparagus, and roasted potatoes. It's our number one healthy option - packed with Omega-3, naturally gluten-free, and full of flavor. Only $24.99!";
    }
    
    // Pizza
    if (lowerMessage.includes('pizza')) {
        return "Our Margherita Pizza is beautiful! It's authentic Neapolitan-style with San Marzano tomatoes, fresh buffalo mozzarella, hand-picked basil leaves, and extra virgin olive oil on hand-stretched dough. Simple, delicious, and only $16.99. Perfect for vegetarians too!";
    }
    
    // Steak
    if (lowerMessage.includes('steak') || lowerMessage.includes('ribeye')) {
        return "Steak lovers, this is for you! Our Ribeye Steak is a USDA Prime 12oz cut with perfect marbling. We grill it to your preferred temperature and serve it with creamy garlic mashed potatoes and seasonal grilled vegetables. $34.99 and worth every penny!";
    }
    
    // Vegan
    if (lowerMessage.includes('vegan')) {
        return "Great choice going vegan! We have 2 delicious options: Thai Green Curry ($18.99) - aromatic coconut curry with vegetables and tofu, and Vegan Buddha Bowl ($18.99) - quinoa, roasted vegetables, chickpeas, avocado, and tahini dressing. Both are naturally gluten-free too!";
    }
    
    // Vegetarian
    if (lowerMessage.includes('vegetarian')) {
        return "We have wonderful vegetarian options! Bruschetta appetizer ($8.99), Margherita Pizza ($16.99), Spinach Artichoke Dip ($10.99), plus our vegan dishes work for vegetarians too. The pizza is especially popular!";
    }
    
    // Gluten-free
    if (lowerMessage.includes('gluten')) {
        return "We have great gluten-free options! Grilled Salmon ($24.99), Ribeye Steak ($34.99), Thai Green Curry ($18.99), and Vegan Buddha Bowl ($18.99). All naturally gluten-free and delicious!";
    }
    
    // Popular
    if (lowerMessage.includes('popular')) {
        return "Our most popular dishes are: Bruschetta ($8.99) - customer favorite appetizer, Grilled Salmon ($24.99), Ribeye Steak ($34.99), Margherita Pizza ($16.99), Tiramisu ($8.99), and Chocolate Lava Cake ($9.99). All are crowd-pleasers!";
    }
    
    // Price/cheap/affordable
    if (lowerMessage.includes('cheap') || lowerMessage.includes('affordable') || lowerMessage.includes('budget')) {
        return "Great value options: Fresh Lemonade ($4.99), Craft Beer ($7.99), Bruschetta ($8.99), Tiramisu ($8.99), Chocolate Lava Cake ($9.99), Spinach Dip ($10.99), and Margherita Pizza ($16.99). Delicious and affordable!";
    }
    
    // Dessert
    if (lowerMessage.includes('dessert') || lowerMessage.includes('sweet')) {
        return "Our desserts are amazing! Tiramisu ($8.99) - classic Italian with espresso-soaked ladyfingers and mascarpone, and Chocolate Lava Cake ($9.99) - warm chocolate cake with molten center and vanilla ice cream. Both are to die for!";
    }
    
    // Thanks
    if (lowerMessage.includes('thank')) {
        return "You're so welcome! Happy to help! Is there anything else you'd like to know about our menu?";
    }
    
    // Default
    return "I'm here to help you find the perfect meal! Ask me about our menu, today's specials, recommendations, dietary options (vegan, vegetarian, gluten-free), or any specific dish. What would you like to know?";
}

function sendQuickQuestion(question) {
    document.getElementById('chat-input').value = question;
    sendMessage();
}

function addChatMessage(content, type) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageEl = document.createElement('div');
    messageEl.className = `message ${type}-message`;
    messageEl.innerHTML = `<div class="message-content">${content}</div>`;
    messagesContainer.appendChild(messageEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addChatLoading() {
    const messagesContainer = document.getElementById('chat-messages');
    const loadingEl = document.createElement('div');
    const id = 'loading-' + Date.now();
    loadingEl.id = id;
    loadingEl.className = 'message bot-message';
    loadingEl.innerHTML = `
        <div class="chat-loading">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    messagesContainer.appendChild(loadingEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return id;
}

function removeChatLoading(id) {
    const loadingEl = document.getElementById(id);
    if (loadingEl) loadingEl.remove();
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Text-to-Speech Function
function speakText(text) {
    if (!speechEnabled || !speechSynthesis) return;
    
    // Cancel any ongoing speech
    speechSynthesis.cancel();
    
    // Remove emojis from text before speaking
    const cleanText = text.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F000}-\u{1F02F}]|[\u{1F0A0}-\u{1F0FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]/gu, '').trim();
    
    // Create a new speech synthesis utterance
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Configure the voice settings for neutral, clear speech
    utterance.rate = 1.0; // Neutral speaking pace
    utterance.pitch = 1.0; // Neutral pitch
    utterance.volume = 0.9; // Slightly softer for warmth
    
    // Try to find the most natural-sounding voice
    const voices = speechSynthesis.getVoices();
    
    // Priority order for natural-sounding voices (Canadian preferred!)
    const voicePreferences = [
        // Canadian voices first!
        'Google Canadian English',
        'Google en-CA',
        'Microsoft Heather',
        'Microsoft Linda',
        // Google voices (most natural)
        'Google US English',
        'Google UK English Female',
        'Google UK English Male',
        // Microsoft natural voices
        'Microsoft Aria Online (Natural)',
        'Microsoft Jenny Online (Natural)',
        'Microsoft Guy Online (Natural)',
        'Microsoft Zira Desktop',
        // Apple voices (macOS/iOS)
        'Samantha',
        'Karen',
        'Victoria',
        'Ava (Premium)',
        'Allison',
        // Other good voices
        'Alex',
        'Fiona',
        'Daniel'
    ];
    
    // Find the best available voice
    let selectedVoice = null;
    
    for (const prefName of voicePreferences) {
        selectedVoice = voices.find(voice => 
            voice.name.includes(prefName) && voice.lang.startsWith('en')
        );
        if (selectedVoice) break;
    }
    
    // Fallback: Canadian or natural-sounding English voice
    if (!selectedVoice) {
        // Try Canadian first
        selectedVoice = voices.find(voice => voice.lang.includes('CA') || voice.lang.includes('ca'));
    }
    
    // Then try natural voices
    if (!selectedVoice) {
        selectedVoice = voices.find(voice => 
            voice.lang.startsWith('en') && 
            (voice.name.toLowerCase().includes('natural') ||
             voice.name.toLowerCase().includes('premium') ||
             voice.name.toLowerCase().includes('enhanced'))
        );
    }
    
    // Final fallback: Any English voice
    if (!selectedVoice) {
        selectedVoice = voices.find(voice => voice.lang.startsWith('en'));
    }
    
    if (selectedVoice) {
        utterance.voice = selectedVoice;
        console.log('Using voice:', selectedVoice.name);
    }
    
    // Speak the text
    speechSynthesis.speak(utterance);
}


// Toggle speech on/off
function toggleSpeech() {
    speechEnabled = !speechEnabled;
    const icon = document.getElementById('speech-icon');
    if (icon) {
        icon.textContent = speechEnabled ? '🔊' : '🔇';
    }
    
    // Cancel any ongoing speech when disabling
    if (!speechEnabled && speechSynthesis) {
        speechSynthesis.cancel();
    }
    
    // Show feedback
    showToast(speechEnabled ? '🔊 Natural voice enabled' : '🔇 Voice disabled');
    
    // Log available voices for debugging
    if (speechEnabled) {
        const voices = speechSynthesis.getVoices();
        console.log('Available voices:', voices.map(v => v.name + ' (' + v.lang + ')'));
    }
}

// Load voices when they're ready
if (speechSynthesis) {
    speechSynthesis.onvoiceschanged = () => {
        speechSynthesis.getVoices();
    };
}

// Initialize Speech Recognition (Voice Input)
function initializeSpeechRecognition() {
    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        console.log('Speech recognition not supported in this browser');
        return;
    }
    
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-CA'; // Canadian English
    
    recognition.onstart = () => {
        isListening = true;
        updateMicButton();
        showToast('🎤 Listening... Speak your question');
    };
    
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const input = document.getElementById('chat-input');
        if (input) {
            input.value = transcript;
            // Automatically send the message
            sendMessage();
        }
    };
    
    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        isListening = false;
        updateMicButton();
        
        if (event.error === 'no-speech') {
            showToast('No speech detected. Please try again.');
        } else if (event.error === 'not-allowed') {
            showToast('Microphone access denied. Please allow microphone access.');
        } else {
            showToast('Error: ' + event.error);
        }
    };
    
    recognition.onend = () => {
        isListening = false;
        updateMicButton();
    };
}

// Start/Stop Voice Input
function toggleVoiceInput() {
    if (!recognition) {
        showToast('Voice input not supported in this browser');
        return;
    }
    
    if (isListening) {
        recognition.stop();
    } else {
        // Stop any ongoing speech output before listening
        if (speechSynthesis) {
            speechSynthesis.cancel();
        }
        recognition.start();
    }
}

// Update microphone button appearance
function updateMicButton() {
    const micButton = document.getElementById('mic-button');
    if (!micButton) return;
    
    if (isListening) {
        micButton.classList.add('listening');
        micButton.innerHTML = '🔴'; // Red dot when listening
    } else {
        micButton.classList.remove('listening');
        micButton.innerHTML = '🎤'; // Microphone icon
    }
}

// Toast Notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 2rem;
        background: var(--success);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px var(--shadow-lg);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}


