// State
let menuData = null;
let cart = [];
let conversationHistory = [];
let currentFilter = 'all';
let searchQuery = '';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadMenu();
    setupEventListeners();
    updateCartCount();
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
        const response = await fetch('http://localhost:3000/api/menu');
        menuData = await response.json();
        renderMenu();
    } catch (error) {
        console.error('Error loading menu:', error);
        document.getElementById('menu-container').innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-light);">
                <p>Unable to load menu. Please make sure the server is running.</p>
                <p style="margin-top: 1rem;">Run: <code>npm start</code></p>
            </div>
        `;
    }
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
    panel.classList.toggle('active');
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
        console.error('Chat error:', error);
        removeChatLoading(loadingId);
        addChatMessage('Sorry, I\'m having trouble connecting. Please try again!', 'bot');
    }
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


