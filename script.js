// Products Data
const products = [
    {
        id: 1,
        name: "Kanjivaram Silk Saree",
        description: "Traditional Tamil silk saree with golden zari work, perfect for weddings and festivals.",
        price: 8499,
        oldPrice: 9999,
        image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "Clothing",
        rating: 4.8,
        badge: "Bestseller",
        badgeType: "primary"
    },
    {
        id: 2,
        name: "Sandalwood Ganesha Statue",
        description: "Hand-carved sandalwood statue of Lord Ganesha, brings positive energy to your home.",
        price: 3299,
        oldPrice: 3999,
        image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "Home Decor",
        rating: 4.6,
        badge: "Eco-Friendly",
        badgeType: "secondary"
    },
    {
        id: 3,
        name: "Traditional Tamil Cookbook",
        description: "Authentic Tamil recipes with step-by-step instructions and beautiful photography.",
        price: 899,
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "Books",
        rating: 4.7,
        badge: "New",
        badgeType: "primary"
    },
    {
        id: 4,
        name: "Traditional Brass Lamp",
        description: "Handcrafted brass lamp for home decoration and traditional ceremonies.",
        price: 1599,
        oldPrice: 1999,
        image: "https://images.unsplash.com/photo-1611591437281-8d5d5c324f5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "Home Decor",
        rating: 4.5,
        badge: "",
        badgeType: ""
    },
    {
        id: 5,
        name: "Tanjore Painting",
        description: "Authentic Tanjore painting with gold leaf work, depicting Goddess Lakshmi.",
        price: 12500,
        image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "Art",
        rating: 4.9,
        badge: "Premium",
        badgeType: "primary"
    },
    {
        id: 6,
        name: "Traditional Spice Box",
        description: "Stainless steel masala dabba with 7 containers for your daily cooking needs.",
        price: 1299,
        oldPrice: 1599,
        image: "https://images.unsplash.com/photo-1583997235608-b9da2330c7e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "Kitchen",
        rating: 4.4,
        badge: "Sale",
        badgeType: "primary"
    },
    {
        id: 7,
        name: "Temple Jewelry Set",
        description: "Traditional temple jewelry set with semi-precious stones for weddings.",
        price: 18999,
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "Jewelry",
        rating: 4.9,
        badge: "Luxury",
        badgeType: "secondary"
    },
    {
        id: 8,
        name: "Organic Filter Coffee Powder",
        description: "100% pure Arabica coffee powder from Coorg, traditional South Indian filter coffee.",
        price: 499,
        oldPrice: 599,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "Food",
        rating: 4.7,
        badge: "Organic",
        badgeType: "secondary"
    }
];

// Cart Data
let cart = [];
let cartCount = 0;

// DOM Elements
const productContainer = document.getElementById('productContainer');
const cartCountElement = document.querySelector('.cart-count');
const cartItemsElement = document.getElementById('cartItems');
const cartContentElement = document.getElementById('cartContent');
const emptyCartElement = document.getElementById('emptyCart');
const cartSubtotalElement = document.getElementById('cartSubtotal');
const cartShippingElement = document.getElementById('cartShipping');
const cartTaxElement = document.getElementById('cartTax');
const cartTotalElement = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Load products
    loadProducts();
    
    // Load cart from localStorage
    loadCart();
    
    // Initialize countdown timer
    initializeCountdown();
    
    // Setup event listeners
    setupEventListeners();
});

// Load products to the page
function loadProducts() {
    productContainer.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productContainer.appendChild(productCard);
    });
}

// Create product card HTML
function createProductCard(product) {
    const col = document.createElement('div');
    col.className = 'col-lg-3 col-md-4 col-sm-6 mb-4';
    
    const oldPriceHTML = product.oldPrice ? 
        `<span class="product-old-price">₹ ${product.oldPrice.toLocaleString('en-IN')}</span>` : '';
    
    const badgeHTML = product.badge ? 
        `<span class="product-badge ${product.badgeType === 'secondary' ? 'secondary' : ''}">${product.badge}</span>` : '';
    
    const ratingStars = getRatingStars(product.rating);
    
    col.innerHTML = `
        <div class="product-card">
            ${badgeHTML}
            <div class="product-img-container">
                <img src="${product.image}" class="product-img" alt="${product.name}">
            </div>
            <div class="product-info">
                <h5 class="product-title">${product.name}</h5>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    ${ratingStars} <span class="ms-1">(${product.rating})</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span class="product-price">₹ ${product.price.toLocaleString('en-IN')}</span>
                        ${oldPriceHTML}
                    </div>
                    <button class="btn btn-primary-custom btn-sm add-to-cart" data-id="${product.id}">
                        <i class="fas fa-cart-plus me-1"></i> Add
                    </button>
                </div>
                <div class="product-actions">
                    <a href="#" class="text-muted"><i class="far fa-heart"></i> Wishlist</a>
                    <a href="#" class="text-muted"><i class="far fa-eye"></i> View</a>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

// Get rating stars HTML
function getRatingStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    return stars;
}

// Setup event listeners
function setupEventListeners() {
    // Add to cart buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.add-to-cart')) {
            const button = e.target.closest('.add-to-cart');
            const productId = parseInt(button.getAttribute('data-id'));
            addToCart(productId);
        }
        
        // Remove from cart
        if (e.target.closest('.remove-from-cart')) {
            const button = e.target.closest('.remove-from-cart');
            const productId = parseInt(button.getAttribute('data-id'));
            removeFromCart(productId);
        }
        
        // Update quantity
        if (e.target.closest('.update-quantity')) {
            const button = e.target.closest('.update-quantity');
            const productId = parseInt(button.getAttribute('data-id'));
            const change = parseInt(button.getAttribute('data-change'));
            updateQuantity(productId, change);
        }
    });
    
    // Checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length > 0) {
                alert('Thank you for your purchase! Your order has been placed successfully.');
                clearCart();
                const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
                cartModal.hide();
            } else {
                alert('Your cart is empty. Add some products before checkout.');
            }
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            if (email) {
                alert(`Thank you for subscribing with email: ${email}`);
                newsletterForm.reset();
            }
        });
    }
}

// Cart Functions
function loadCart() {
    const savedCart = localStorage.getItem('maplaCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
        updateCartDisplay();
    }
}

function saveCart() {
    localStorage.setItem('maplaCart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
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
    
    saveCart();
    showAddedFeedback(productId);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity < 1) {
            removeFromCart(productId);
        } else {
            saveCart();
        }
    }
}

function clearCart() {
    cart = [];
    saveCart();
}

function updateCartCount() {
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = cartCount;
}

function updateCartDisplay() {
    if (cart.length === 0) {
        emptyCartElement.classList.remove('d-none');
        cartContentElement.classList.add('d-none');
        return;
    }
    
    emptyCartElement.classList.add('d-none');
    cartContentElement.classList.remove('d-none');
    
    // Update cart items
    cartItemsElement.innerHTML = '';
    
    let subtotal = 0;
    
    cart.forEach(item => {
        const total = item.price * item.quantity;
        subtotal += total;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="d-flex align-items-center">
                    <img src="${item.image}" class="cart-modal-img me-3" alt="${item.name}">
                    <div>
                        <h6 class="mb-0">${item.name}</h6>
                        <small class="text-muted">Product ID: ${item.id}</small>
                    </div>
                </div>
            </td>
            <td>₹ ${item.price.toLocaleString('en-IN')}</td>
            <td>
                <div class="input-group input-group-sm" style="width: 110px;">
                    <button class="btn btn-outline-secondary update-quantity" data-id="${item.id}" data-change="-1">-</button>
                    <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
                    <button class="btn btn-outline-secondary update-quantity" data-id="${item.id}" data-change="1">+</button>
                </div>
            </td>
            <td>₹ ${total.toLocaleString('en-IN')}</td>
            <td>
                <button class="btn btn-sm btn-outline-danger remove-from-cart" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        cartItemsElement.appendChild(row);
    });
    
    // Calculate totals
    const shipping = subtotal > 2000 ? 0 : 100;
    const tax = subtotal * 0.18; // 18% GST
    const total = subtotal + shipping + tax;
    
    // Update totals display
    cartSubtotalElement.textContent = `₹ ${subtotal.toLocaleString('en-IN')}`;
    cartShippingElement.textContent = shipping === 0 ? 'FREE' : `₹ ${shipping.toLocaleString('en-IN')}`;
    cartTaxElement.textContent = `₹ ${tax.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
    cartTotalElement.textContent = `₹ ${total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
}

function showAddedFeedback(productId) {
    const button = document.querySelector(`.add-to-cart[data-id="${productId}"]`);
    if (!button) return;
    
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Added';
    button.classList.remove('btn-primary-custom');
    button.classList.add('btn-success');
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.classList.remove('btn-success');
        button.classList.add('btn-primary-custom');
        button.disabled = false;
    }, 1500);
}

// Countdown Timer
function initializeCountdown() {
    // Set the end date for the countdown (7 days from now)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endDate - now;
        
        if (distance < 0) {
            // Countdown finished
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            return;
        }
        
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update display
        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
    
    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') return;
        
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});