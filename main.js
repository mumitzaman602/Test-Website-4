// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const mainContent = document.getElementById('mainContent');
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('.nav');
const filterButtons = document.querySelectorAll('.filter-btn');
const productsGrid = document.getElementById('productsGrid');
const cartModal = document.getElementById('cartModal');
const cartIcon = document.querySelector('.cart-icon');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartEmpty = document.getElementById('cartEmpty');
const totalPrice = document.getElementById('totalPrice');
const checkoutBtn = document.getElementById('checkoutBtn');
const paymentModal = document.getElementById('paymentModal');
const closePayment = document.getElementById('closePayment');
const cancelPayment = document.getElementById('cancelPayment');
const confirmPayment = document.getElementById('confirmPayment');
const orderSuccess = document.getElementById('orderSuccess');
const closeSuccess = document.getElementById('closeSuccess');
const cartCount = document.querySelector('.cart-count');
const paymentForm = document.getElementById('paymentForm');
const paymentMethods = document.querySelectorAll('input[name="payment"]');
const bkashDetails = document.getElementById('bkashDetails');
const cardDetails = document.getElementById('cardDetails');

// Product Data
const products = [
    {
        id: 1,
        name: "Premium Silk Saree",
        category: "women",
        price: 4500,
        image: "https://images.unsplash.com/photo-1565938145-5c4bdf4cd19f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        description: "Elegant silk saree with intricate handwork and zari border."
    },
    {
        id: 2,
        name: "Men's Formal Suit",
        category: "men",
        price: 8500,
        image: "https://images.unsplash.com/photo-1594938374192-162716d13f6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
        description: "Premium wool blend suit for formal occasions."
    },
    {
        id: 3,
        name: "Designer Handbag",
        category: "accessories",
        price: 3200,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        description: "Luxury leather handbag with gold-tone hardware."
    },
    {
        id: 4,
        name: "Women's Evening Gown",
        category: "women",
        price: 6800,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
        description: "Elegant evening gown with sequin embellishments."
    },
    {
        id: 5,
        name: "Men's Casual Shirt",
        category: "men",
        price: 2200,
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        description: "Premium cotton casual shirt with unique print."
    },
    {
        id: 6,
        name: "Luxury Scarf",
        category: "accessories",
        price: 1500,
        image: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
        description: "Silk blend scarf with luxurious pattern."
    },
    {
        id: 7,
        name: "Women's Kurti Set",
        category: "women",
        price: 3500,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1466&q=80",
        description: "Traditional kurti set with embroidery work."
    },
    {
        id: 8,
        name: "Men's Leather Jacket",
        category: "men",
        price: 9500,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        description: "Genuine leather jacket with premium finish."
    }
];

// Cart Data
let cart = JSON.parse(localStorage.getItem('renicCart')) || [];

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainContent.classList.add('loaded');
        }, 500);
    }, 2000);
});

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.innerHTML = nav.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Display Products
function displayProducts(filter = 'all') {
    productsGrid.innerHTML = '';
    
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(product => product.category === filter);
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">
                    <span class="price">৳${product.price.toFixed(2)}</span>
                    <button class="add-to-cart" data-id="${product.id}">
                        <i class="fas fa-shopping-bag"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    // Add event listeners to add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.closest('.add-to-cart').dataset.id);
            addToCart(productId);
        });
    });
}

// Filter Products
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        // Filter products
        const filter = button.dataset.filter;
        displayProducts(filter);
    });
});

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCart();
    }
}

function updateCart() {
    // Save to localStorage
    localStorage.setItem('renicCart', JSON.stringify(cart));
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart modal if open
    if (cartModal.style.display === 'flex') {
        renderCartItems();
    }
}

function renderCartItems() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartEmpty.style.display = 'block';
        cartItems.style.display = 'none';
        totalPrice.textContent = '৳0.00';
        return;
    }
    
    cartEmpty.style.display = 'none';
    cartItems.style.display = 'block';
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-price">৳${item.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                    <button class="remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    totalPrice.textContent = `৳${total.toFixed(2)}`;
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.closest('.decrease').dataset.id);
            const item = cart.find(item => item.id === productId);
            if (item) {
                updateQuantity(productId, item.quantity - 1);
            }
        });
    });
    
    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.closest('.increase').dataset.id);
            const item = cart.find(item => item.id === productId);
            if (item) {
                updateQuantity(productId, item.quantity + 1);
            }
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.closest('.remove-item').dataset.id);
            removeFromCart(productId);
        });
    });
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1001;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        transform: translateX(150%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Cart Modal
cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'flex';
    renderCartItems();
});

closeCart.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    cartModal.style.display = 'none';
    paymentModal.style.display = 'flex';
});

// Payment Modal
closePayment.addEventListener('click', () => {
    paymentModal.style.display = 'none';
});

cancelPayment.addEventListener('click', () => {
    paymentModal.style.display = 'none';
});

paymentModal.addEventListener('click', (e) => {
    if (e.target === paymentModal) {
        paymentModal.style.display = 'none';
    }
});

// Payment Method Toggle
paymentMethods.forEach(method => {
    method.addEventListener('change', (e) => {
        const value = e.target.value;
        
        if (value === 'bkash') {
            bkashDetails.style.display = 'block';
            cardDetails.style.display = 'none';
        } else if (value === 'card') {
            bkashDetails.style.display = 'none';
            cardDetails.style.display = 'block';
        } else {
            bkashDetails.style.display = 'none';
            cardDetails.style.display = 'none';
        }
    });
});

// Confirm Order
confirmPayment.addEventListener('click', () => {
    // Validate form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    if (!name || !email || !address || !phone) {
        showNotification('Please fill in all required fields!');
        return;
    }
    
    if (paymentMethod === 'bkash') {
        const bkashNumber = document.getElementById('bkashNumber').value;
        if (!bkashNumber || !/^01[3-9]\d{8}$/.test(bkashNumber)) {
            showNotification('Please enter a valid bKash number!');
            return;
        }
    }
    
    if (paymentMethod === 'card') {
        const cardNumber = document.getElementById('cardNumber').value;
        const cardExpiry = document.getElementById('cardExpiry').value;
        const cardCvc = document.getElementById('cardCvc').value;
        
        if (!cardNumber || !cardExpiry || !cardCvc) {
            showNotification('Please fill in all card details!');
            return;
        }
    }
    
    // Process order
    paymentModal.style.display = 'none';
    
    // Clear cart
    cart = [];
    updateCart();
    
    // Show success message
    setTimeout(() => {
        orderSuccess.style.display = 'flex';
    }, 500);
});

// Close Success Message
closeSuccess.addEventListener('click', () => {
    orderSuccess.style.display = 'none';
});

orderSuccess.addEventListener('click', (e) => {
    if (e.target === orderSuccess) {
        orderSuccess.style.display = 'none';
    }
});

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // In a real application, you would send this to a server
        showNotification(`Thank you for subscribing with ${email}!`);
        newsletterForm.reset();
    });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize
updateCart();
displayProducts();

// Initial cart render for modal
renderCartItems();