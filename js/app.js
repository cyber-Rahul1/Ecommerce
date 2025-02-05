class ECommerceApp {
    constructor() {
        this.app = document.getElementById('app');
        this.currentPage = 'landing';
        this.cart = [];
        this.wishlist = [];
        this.user = null;
        this.init();
    }

    init() {
        this.renderPage();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Navigation event listeners
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-nav]')) {
                const page = e.target.closest('[data-nav]').dataset.nav;
                this.navigateTo(page);
            }

            // Product card click
            if (e.target.closest('.product-card')) {
                const productId = e.target.closest('.product-card').dataset.id;
                this.showProductDetails(productId);
            }

            // Category filter click
            if (e.target.closest('[data-category]')) {
                const category = e.target.closest('[data-category]').dataset.category;
                this.filterByCategory(category);
            }

            // Add to cart
            if (e.target.closest('.add-to-cart')) {
                const productId = parseInt(e.target.closest('.add-to-cart').dataset.id);
                this.addToCart(productId);
            }

            // Like button click
            if (e.target.closest('.like-button')) {
                const productId = parseInt(e.target.closest('.like-button').dataset.id);
                this.toggleLike(productId);
            }

            // Read more click
            if (e.target.closest('.read-more')) {
                const productId = parseInt(e.target.closest('.read-more').dataset.id);
                this.showProductDetails(productId);
            }

            // Quick view click
            if (e.target.closest('.quick-view-btn')) {
                const productId = parseInt(e.target.closest('.product-card').dataset.id);
                this.showProductDetails(productId);
            }

            // Remove from cart
            if (e.target.closest('.remove-from-cart')) {
                const productId = parseInt(e.target.closest('.remove-from-cart').dataset.id);
                this.removeFromCart(productId);
            }

            // Decrease quantity
            if (e.target.closest('.decrease-quantity')) {
                const productId = parseInt(e.target.closest('.decrease-quantity').dataset.id);
                this.updateQuantity(productId, -1);
            }

            // Increase quantity
            if (e.target.closest('.increase-quantity')) {
                const productId = parseInt(e.target.closest('.increase-quantity').dataset.id);
                this.updateQuantity(productId, 1);
            }

            // Know more click
            if (e.target.closest('[data-id]') && e.target.textContent.trim() === 'know more') {
                const productId = parseInt(e.target.closest('[data-id]').dataset.id);
                this.showProductDetails(productId);
            }
        });

        // Search functionality
        document.addEventListener('input', (e) => {
            if (e.target.matches('#searchInput')) {
                this.handleSearch(e.target.value);
            }
        });

        // Search input focus
        document.addEventListener('focus', (e) => {
            if (e.target.matches('#searchInput')) {
                const searchResults = document.getElementById('searchResults');
                if (searchResults) {
                    searchResults.innerHTML = this.renderSearchSuggestions();
                }
            }
        }, true);

        // Notification bell click
        document.addEventListener('click', (e) => {
            if (e.target.closest('.fa-bell')) {
                this.renderNotificationsPanel();
            }
        });
    }

    navigateTo(page) {
        this.currentPage = page;
        switch (page) {
            case 'landing':
                this.renderLanding();
                break;
            case 'home':
                this.renderHome();
                break;
            case 'search':
                this.renderSearch();
                break;
            case 'cart':
                this.renderCart();
                break;
            case 'profile':
                this.renderProfile();
                break;
            case 'delivery':
                this.renderDeliveryForm();
                break;
            default:
                this.renderHome();
        }
    }

    renderPage() {
        switch (this.currentPage) {
            case 'home':
                this.renderHome();
                break;
            case 'cart':
                this.renderCart();
                break;
            case 'profile':
                this.renderProfile();
                break;
            default:
                this.renderHome();
        }
    }

    renderHome() {
        const html = `
            <div class="pb-20">
                <!-- Header -->
                <div class="fixed top-0 left-0 right-0 bg-white z-10 max-w-md mx-auto">
                    <div class="p-4 flex justify-between items-center border-b">
                        <div class="flex items-center gap-2">
                            <i class="fas fa-shopping-bag text-green-500"></i>
                            <h1 class="text-xl font-bold">Ready Mart</h1>
                        </div>
                        <div class="flex items-center gap-4">
                            <button data-nav="cart" class="relative">
                                <i class="fas fa-shopping-cart text-xl"></i>
                                ${this.cart.length > 0 ? `
                                    <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                        ${this.cart.length}
                                    </span>
                                ` : ''}
                            </button>
                            <div class="relative">
                                <i class="fas fa-bell text-xl"></i>
                                <span class="absolute -top-1 -right-1 bg-green-500 rounded-full w-2 h-2"></span>
                            </div>
                        </div>
                    </div>

                    <!-- Search Bar -->
                    <div class="p-4">
                        <div class="relative">
                            <input type="text" 
                                id="searchInput"
                                placeholder="Search products..." 
                                class="w-full p-3 rounded-lg bg-gray-100 pl-10 focus:outline-none focus:ring-2 focus:ring-green-500">
                            <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        </div>
                    </div>
                </div>

                <div class="mt-32">
                    ${this.renderLatestOffers()}
                    
                    <!-- Banner -->
                    <div class="mx-4 mb-6">
                        <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white flex justify-between items-center overflow-hidden relative">
                            <div class="z-10">
                                <h2 class="text-3xl font-bold mb-2">New Product</h2>
                                <p class="mb-4 text-green-100">Check out our latest products</p>
                                <button class="bg-white text-green-500 px-6 py-2 rounded-full font-semibold hover:bg-green-50 transition-colors">
                                    Buy Now
                                </button>
                            </div>
                            <img src="phone-mockup.png" alt="New Product" class="w-32 absolute -right-4 -bottom-4 transform rotate-12">
                        </div>
                    </div>

                    <!-- Categories -->
                    <div class="px-4 mb-6">
                        <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            ${categories.map(category => `
                                <button 
                                    data-category="${category.name}"
                                    class="px-6 py-2 rounded-full ${category.active ? 'bg-green-500 text-white' : 'bg-gray-100 hover:bg-gray-200'} whitespace-nowrap transition-colors">
                                    ${category.name}
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Products Grid -->
                    <div class="px-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        ${products.map(product => `
                            <div class="product-card bg-white rounded-xl shadow-sm overflow-hidden" data-id="${product.id}">
                                <div class="relative pt-[100%] group">
                                    <img src="${product.image}" alt="${product.name}" 
                                        class="absolute top-0 left-0 w-full h-full object-cover">
                                    <button 
                                        class="like-button absolute top-3 right-3 bg-white p-2 rounded-full shadow-md ${product.liked ? 'text-red-500' : 'text-gray-400'}"
                                        data-id="${product.id}">
                                        <i class="fas fa-heart"></i>
                                    </button>
                                    <div class="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button class="quick-view-btn bg-white text-gray-800 px-4 py-2 rounded-full transform -translate-y-2 group-hover:translate-y-0 transition-transform">
                                            Quick View
                                        </button>
                                    </div>
                                </div>
                                <div class="p-4">
                                    <div class="flex justify-between items-start mb-2">
                                        <h3 class="font-semibold flex-1">${product.name}</h3>
                                        <span class="flex items-center text-sm bg-gray-100 px-2 py-1 rounded-full">
                                            ${product.rating} <i class="fas fa-star text-yellow-400 ml-1"></i>
                                        </span>
                                    </div>
                                    <p class="text-gray-600 text-sm mb-3 line-clamp-2">${product.description}</p>
                                    <div class="flex items-center justify-between">
                                        <div class="text-xl font-bold text-green-600">$${product.price}</div>
                                        <div class="flex items-center gap-3">
                                            <button class="text-xs text-gray-500 hover:text-gray-700"
                                                data-id="${product.id}">
                                                know more
                                            </button>
                                            <button class="add-to-cart bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
                                                data-id="${product.id}">
                                                <i class="fas fa-shopping-cart"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            ${this.renderNavigation()}
        `;
        
        this.app.innerHTML = html;
    }

    renderCart() {
        const cartItems = this.getCartItems();
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        const html = `
            <div class="pb-20">
                <div class="fixed top-0 left-0 right-0 bg-white z-10 max-w-md mx-auto">
                    <div class="p-4 border-b">
                        <h1 class="text-xl font-bold">Shopping Cart</h1>
                    </div>
                </div>

                <div class="mt-16 p-4">
                    ${cartItems.length === 0 ? `
                        <div class="text-center py-8">
                            <i class="fas fa-shopping-cart text-4xl text-gray-300 mb-4"></i>
                            <p class="text-gray-500">Your cart is empty</p>
                        </div>
                    ` : `
                        <div class="space-y-4">
                            ${cartItems.map(item => `
                                <div class="flex items-center bg-white p-4 rounded-lg shadow-sm">
                                    <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-lg">
                                    <div class="ml-4 flex-1">
                                        <div class="flex justify-between items-start">
                                            <h3 class="font-semibold">${item.name}</h3>
                                            <button class="remove-from-cart text-gray-400 hover:text-red-500 p-1" data-id="${item.id}">
                                                <i class="fas fa-times"></i>
                                            </button>
                                        </div>
                                        <div class="text-green-500 font-bold">$${item.price}</div>
                                        <div class="flex items-center mt-2">
                                            <button class="decrease-quantity bg-gray-100 px-3 py-1 rounded-l-lg" data-id="${item.id}">-</button>
                                            <span class="px-4 py-1 bg-gray-100">${item.quantity}</span>
                                            <button class="increase-quantity bg-gray-100 px-3 py-1 rounded-r-lg" data-id="${item.id}">+</button>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}

                            <div class="bg-white p-4 rounded-lg mt-4">
                                <div class="flex justify-between mb-2">
                                    <span>Subtotal</span>
                                    <span>$${total.toFixed(2)}</span>
                                </div>
                                <button class="w-full bg-green-500 text-white py-3 rounded-lg mt-4 hover:bg-green-600 transition-colors">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    `}
                </div>
            </div>
            ${this.renderNavigation()}
        `;

        this.app.innerHTML = html;
    }

    renderProfile() {
        if (!this.user) {
            this.renderAuth();
            return;
        }

        const html = `
            <div class="pb-20">
                <div class="fixed top-0 left-0 right-0 bg-white z-10 max-w-md mx-auto">
                    <div class="p-4 border-b">
                        <h1 class="text-xl font-bold">Profile</h1>
                    </div>
                </div>

                <div class="mt-16">
                    <div class="bg-gradient-to-r from-green-500 to-green-600 p-6">
                        <div class="flex items-center gap-4">
                            <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                                <i class="fas fa-user text-2xl text-gray-400"></i>
                            </div>
                            <div class="text-white">
                                <h2 class="text-xl font-bold mb-1">Guest User</h2>
                                <button class="bg-white text-green-600 px-4 py-2 rounded-lg text-sm font-semibold">
                                    Sign In
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="p-4 space-y-4">
                        <div class="bg-white rounded-lg shadow-sm">
                            <button class="w-full p-4 flex items-center" data-nav="orders">
                                <i class="fas fa-shopping-bag w-8 text-green-500"></i>
                                <span>My Orders</span>
                                <i class="fas fa-chevron-right ml-auto text-gray-400"></i>
                            </button>
                            <hr>
                            <button class="w-full p-4 flex items-center" data-nav="wishlist">
                                <i class="fas fa-heart w-8 text-green-500"></i>
                                <span>Wishlist</span>
                                <i class="fas fa-chevron-right ml-auto text-gray-400"></i>
                            </button>
                            <hr>
                            <button class="w-full p-4 flex items-center" data-nav="addresses">
                                <i class="fas fa-map-marker-alt w-8 text-green-500"></i>
                                <span>Saved Addresses</span>
                                <i class="fas fa-chevron-right ml-auto text-gray-400"></i>
                            </button>
                        </div>

                        <div class="bg-white rounded-lg shadow-sm">
                            <button class="w-full p-4 flex items-center" data-nav="settings">
                                <i class="fas fa-cog w-8 text-green-500"></i>
                                <span>Settings</span>
                                <i class="fas fa-chevron-right ml-auto text-gray-400"></i>
                            </button>
                            <hr>
                            <button class="w-full p-4 flex items-center" data-nav="help">
                                <i class="fas fa-question-circle w-8 text-green-500"></i>
                                <span>Help & Support</span>
                                <i class="fas fa-chevron-right ml-auto text-gray-400"></i>
                            </button>
                            <hr>
                            <button class="w-full p-4 flex items-center text-red-500">
                                <i class="fas fa-sign-out-alt w-8"></i>
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            ${this.renderNavigation()}
        `;

        this.app.innerHTML = html;
    }

    renderNavigation() {
        return `
            <div class="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-4 max-w-md mx-auto">
                <button data-nav="home" class="${this.currentPage === 'home' ? 'text-green-500' : 'text-gray-400'} flex flex-col items-center">
                    <i class="fas fa-home text-xl mb-1"></i>
                    <span class="text-xs">Home</span>
                </button>
                <button data-nav="search" class="text-gray-400 flex flex-col items-center">
                    <i class="fas fa-search text-xl mb-1"></i>
                    <span class="text-xs">Search</span>
                </button>
                <button data-nav="cart" class="${this.currentPage === 'cart' ? 'text-green-500' : 'text-gray-400'} flex flex-col items-center">
                    <i class="fas fa-shopping-cart text-xl mb-1"></i>
                    <span class="text-xs">Cart</span>
                </button>
                <button data-nav="profile" class="${this.currentPage === 'profile' ? 'text-green-500' : 'text-gray-400'} flex flex-col items-center">
                    <i class="fas fa-user text-xl mb-1"></i>
                    <span class="text-xs">Profile</span>
                </button>
            </div>
        `;
    }

    addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }

        this.showNotification('Added to cart!');
        
        // Show delivery details if this is the first item
        if (this.cart.length === 1) {
            this.renderDeliveryDetails();
        }
    }

    getCartItems() {
        return this.cart;
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-out';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 2000);
    }

    filterByCategory(category) {
        categories.forEach(cat => cat.active = cat.name === category);
        // Implement filtering logic here
        this.renderHome();
    }

    handleSearch(query) {
        const searchResults = document.getElementById('searchResults');
        if (!searchResults) return;

        if (!query.trim()) {
            searchResults.innerHTML = this.getRecentSearchesHTML();
            return;
        }

        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );

        if (filteredProducts.length === 0) {
            searchResults.innerHTML = `
                <div class="text-center py-8">
                    <i class="fas fa-search text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">No results found for "${query}"</p>
                </div>
            `;
            return;
        }

        searchResults.innerHTML = `
            <div class="mb-4">
                <p class="text-gray-500">Found ${filteredProducts.length} results for "${query}"</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                ${filteredProducts.map(product => this.renderProductCard(product)).join('')}
            </div>
        `;
    }

    toggleLike(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            product.liked = !product.liked;
            this.showNotification(product.liked ? 'Added to favorites!' : 'Removed from favorites');
            
            // Update the UI based on current page
            if (this.currentPage === 'home') {
                this.renderHome();
            } else if (this.currentPage === 'search') {
                const searchInput = document.getElementById('searchInput');
                if (searchInput && searchInput.value) {
                    this.handleSearch(searchInput.value);
                }
            }
            
            // If product detail modal is open, update it
            const modal = document.querySelector('.product-detail-modal');
            if (modal) {
                this.showProductDetails(productId);
            }
        }
    }

    showProductDetails(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 product-detail-modal';
        modal.innerHTML = `
            <div class="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                <div class="relative">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover">
                    <button class="close-modal absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                        <i class="fas fa-times"></i>
                    </button>
                    <button 
                        class="like-button absolute top-4 right-16 bg-white p-2 rounded-full shadow-md ${product.liked ? 'text-red-500' : 'text-gray-400'} hover:scale-110 transition-transform"
                        data-id="${product.id}">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                <div class="p-6">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h2 class="text-2xl font-bold mb-2">${product.name}</h2>
                            <div class="flex items-center gap-2">
                                <div class="flex items-center bg-green-100 px-3 py-1 rounded-full">
                                    <span class="text-green-700 font-semibold mr-1">${product.rating}</span>
                                    <i class="fas fa-star text-green-700"></i>
                                </div>
                                <span class="text-gray-500">${product.reviews ? product.reviews.length : 0} reviews</span>
                            </div>
                        </div>
                        <div class="text-2xl font-bold text-green-600">$${product.price}</div>
                    </div>

                    <!-- Product Description -->
                    <div class="mb-6">
                        <h3 class="text-lg font-semibold mb-2">Description</h3>
                        <p class="text-gray-600">${product.description}</p>
                    </div>
                    
                    <!-- Reviews Section -->
                    <div class="mb-6">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-semibold">Reviews & Ratings</h3>
                            <button class="text-sm text-green-600 hover:text-green-700">Write a Review</button>
                        </div>
                        
                        <div class="space-y-4">
                            ${product.reviews ? product.reviews.map(review => `
                                <div class="bg-gray-50 p-4 rounded-lg">
                                    <div class="flex items-center justify-between mb-2">
                                        <span class="font-medium">${review.user}</span>
                                        <div class="flex items-center">
                                            ${Array(5).fill().map((_, i) => `
                                                <i class="fas fa-star ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'} text-sm"></i>
                                            `).join('')}
                                        </div>
                                    </div>
                                    <p class="text-gray-600 text-sm">${review.comment}</p>
                                </div>
                            `).join('') : '<p class="text-gray-500">No reviews yet</p>'}
                        </div>
                    </div>

                    <div class="flex gap-4">
                        <button class="add-to-cart flex-1 bg-green-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                            data-id="${product.id}">
                            <i class="fas fa-shopping-cart"></i>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal handlers
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Add escape key handler
        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
    }

    renderSearch() {
        const html = `
            <div class="pb-20">
                <div class="fixed top-0 left-0 right-0 bg-white z-10 max-w-md mx-auto">
                    <div class="p-4 flex items-center gap-3 border-b">
                        <button data-nav="home" class="text-gray-400">
                            <i class="fas fa-arrow-left text-xl"></i>
                        </button>
                        <div class="flex-1 relative">
                            <input type="text" 
                                id="searchInput"
                                placeholder="Search products..." 
                                class="w-full p-3 rounded-lg bg-gray-100 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                                autocomplete="off">
                            <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                            <button class="clear-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hidden">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Search Filters -->
                    <div class="p-4 border-b">
                        <div class="flex gap-2 overflow-x-auto scrollbar-hide">
                            <button class="px-4 py-2 rounded-full bg-gray-100 text-sm whitespace-nowrap">
                                <i class="fas fa-filter mr-1"></i> Filters
                            </button>
                            <button class="px-4 py-2 rounded-full bg-gray-100 text-sm whitespace-nowrap">
                                Price: Low to High
                            </button>
                            <button class="px-4 py-2 rounded-full bg-gray-100 text-sm whitespace-nowrap">
                                Rating: 4+ Stars
                            </button>
                        </div>
                    </div>
                </div>

                <div class="mt-32 p-4" id="searchResults">
                    <!-- Search results will be dynamically inserted here -->
                </div>
            </div>
            ${this.renderNavigation()}
        `;

        this.app.innerHTML = html;
        this.setupSearchListeners();
    }

    setupSearchListeners() {
        const searchInput = document.getElementById('searchInput');
        const clearButton = document.querySelector('.clear-search');
        const resultsContainer = document.getElementById('searchResults');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                clearButton.classList.toggle('hidden', !query);
                
                if (query) {
                    const filteredProducts = products.filter(product => 
                        product.name.toLowerCase().includes(query) ||
                        product.description.toLowerCase().includes(query) ||
                        product.category.toLowerCase().includes(query)
                    );
                    
                    this.renderSearchResults(filteredProducts, query);
                } else {
                    resultsContainer.innerHTML = this.getRecentSearchesHTML();
                }
            });

            clearButton?.addEventListener('click', () => {
                searchInput.value = '';
                clearButton.classList.add('hidden');
                resultsContainer.innerHTML = this.getRecentSearchesHTML();
            });
        }
    }

    getRecentSearchesHTML() {
        return `
            <div class="space-y-6">
                <div>
                    <h3 class="text-gray-500 text-sm mb-3">Recent Searches</h3>
                    <div class="space-y-2">
                        <button class="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center">
                            <i class="fas fa-history text-gray-400 mr-3"></i>
                            iPhone 14 Pro
                        </button>
                        <button class="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center">
                            <i class="fas fa-history text-gray-400 mr-3"></i>
                            MacBook Pro
                        </button>
                    </div>
                </div>
                
                <div>
                    <h3 class="text-gray-500 text-sm mb-3">Popular Categories</h3>
                    <div class="grid grid-cols-2 gap-3">
                        ${categories.map(category => `
                            <button class="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 text-left">
                                <h4 class="font-semibold">${category.name}</h4>
                                <p class="text-sm text-gray-500">20+ items</p>
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderSearchResults(results, query) {
        const resultsContainer = document.getElementById('searchResults');
        
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="text-center py-8">
                    <i class="fas fa-search text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">No results found for "${query}"</p>
                </div>
            `;
            return;
        }

        resultsContainer.innerHTML = `
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                ${results.map(product => `
                    <div class="product-card bg-white rounded-xl shadow-sm overflow-hidden" data-id="${product.id}">
                        <!-- Product card content (same as home page) -->
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderDeliveryForm() {
        const html = `
            <div class="pb-20">
                <div class="fixed top-0 left-0 right-0 bg-white z-10 max-w-md mx-auto">
                    <div class="p-4 flex items-center gap-3 border-b">
                        <button data-nav="cart" class="text-gray-400">
                            <i class="fas fa-arrow-left text-xl"></i>
                        </button>
                        <h1 class="text-xl font-bold">Delivery Details</h1>
                    </div>
                </div>

                <div class="mt-16 p-4">
                    <form id="deliveryForm" class="space-y-6">
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input type="text" required
                                    class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Enter your full name">
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input type="tel" required
                                    class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Enter your phone number">
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" required
                                    class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Enter your email">
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                                <textarea required
                                    class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[100px]"
                                    placeholder="Enter your complete delivery address"></textarea>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Delivery Instructions (Optional)</label>
                                <textarea
                                    class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Any special instructions for delivery"></textarea>
                            </div>
                        </div>

                        <div class="bg-white p-4 rounded-lg space-y-3">
                            <div class="flex justify-between">
                                <span class="text-gray-500">Subtotal</span>
                                <span>$${this.getCartTotal()}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500">Delivery Fee</span>
                                <span>$10.00</span>
                            </div>
                            <div class="flex justify-between font-bold pt-2 border-t">
                                <span>Total</span>
                                <span>$${this.getCartTotal() + 10}</span>
                            </div>
                        </div>

                        <button type="submit" 
                            class="w-full bg-green-500 text-white py-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                            <i class="fas fa-lock"></i>
                            Proceed to Payment
                        </button>
                    </form>
                </div>
            </div>
        `;

        this.app.innerHTML = html;
        this.setupDeliveryFormListeners();
    }

    setupDeliveryFormListeners() {
        const form = document.getElementById('deliveryForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                // Handle form submission
                this.showNotification('Order placed successfully!');
                this.cart = []; // Clear cart
                this.navigateTo('home');
            });
        }
    }

    getCartTotal() {
        return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    renderLatestOffers() {
        return `
            <div class="px-4 mb-6">
                <h3 class="text-lg font-semibold mb-3">Latest Offers</h3>
                <div class="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    <div class="min-w-[280px] bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white">
                        <h4 class="font-bold mb-1">20% OFF</h4>
                        <p class="text-sm text-purple-100 mb-2">On all Apple Products</p>
                        <span class="text-xs bg-white text-purple-600 px-2 py-1 rounded-full">Valid until Dec 31</span>
                    </div>
                    <div class="min-w-[280px] bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
                        <h4 class="font-bold mb-1">Free Delivery</h4>
                        <p class="text-sm text-blue-100 mb-2">On orders above $999</p>
                        <span class="text-xs bg-white text-blue-600 px-2 py-1 rounded-full">Limited Time</span>
                    </div>
                </div>
            </div>
        `;
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.showNotification('Item removed from cart');
        this.renderCart();
    }

    updateQuantity(productId, change) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, item.quantity + change);
            this.renderCart();
        }
    }

    renderProductCard(product) {
        return `
            <div class="product-card bg-white rounded-xl shadow-sm overflow-hidden" data-id="${product.id}">
                <div class="relative pt-[100%] group">
                    <img src="${product.image}" alt="${product.name}" 
                        class="absolute top-0 left-0 w-full h-full object-cover">
                    <button 
                        class="like-button absolute top-3 right-3 bg-white p-2 rounded-full shadow-md ${product.liked ? 'text-red-500' : 'text-gray-400'} hover:scale-110 transition-transform"
                        data-id="${product.id}">
                        <i class="fas fa-heart"></i>
                    </button>
                    <div class="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button class="quick-view-btn bg-white text-gray-800 px-4 py-2 rounded-full transform -translate-y-2 group-hover:translate-y-0 transition-transform">
                            Quick View
                        </button>
                    </div>
                </div>
                <div class="p-4">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="font-semibold flex-1">${product.name}</h3>
                        <span class="flex items-center text-sm bg-gray-100 px-2 py-1 rounded-full">
                            ${product.rating} <i class="fas fa-star text-yellow-400 ml-1"></i>
                        </span>
                    </div>
                    <p class="text-gray-600 text-sm mb-3 line-clamp-2">${product.description}</p>
                    <div class="flex items-center justify-between">
                        <div class="text-xl font-bold text-green-600">$${product.price}</div>
                        <div class="flex items-center gap-3">
                            <button class="text-xs text-gray-500 hover:text-gray-700"
                                data-id="${product.id}">
                                know more
                            </button>
                            <button class="add-to-cart bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
                                data-id="${product.id}">
                                <i class="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderAuth(type = 'login') {
        const html = `
            <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div class="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                    <div class="p-4 border-b flex items-center justify-between">
                        <h2 class="text-xl font-bold">${type === 'login' ? 'Login' : 'Sign Up'}</h2>
                        <button class="close-auth p-2 hover:bg-gray-100 rounded-full">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>

                    <!-- Rest of the auth form content -->
                    ${this.getAuthFormContent(type)}
                </div>
            </div>
        `;

        const authModal = document.createElement('div');
        authModal.innerHTML = html;
        const modalElement = authModal.firstElementChild;
        document.body.appendChild(modalElement);

        // Setup close handlers
        const closeBtn = modalElement.querySelector('.close-auth');

        // Close on button click
        closeBtn?.addEventListener('click', () => {
            modalElement.remove();
            this.navigateTo('home');
        });

        // Close on click outside
        modalElement.addEventListener('click', (e) => {
            if (e.target === modalElement) {
                modalElement.remove();
                this.navigateTo('home');
            }
        });

        // Close on escape key
        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                modalElement.remove();
                this.navigateTo('home');
                document.removeEventListener('keydown', closeOnEscape);
            }
        });

        // Setup form handlers
        this.setupAuthListeners(modalElement);
    }

    getAuthFormContent(type) {
        return `
            <div class="p-6">
                <div class="flex gap-4 mb-6">
                    <button 
                        class="flex-1 py-3 ${type === 'login' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'} rounded-lg auth-toggle"
                        data-type="login">
                        Login
                    </button>
                    <button 
                        class="flex-1 py-3 ${type === 'signup' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'} rounded-lg auth-toggle"
                        data-type="signup">
                        Sign Up
                    </button>
                </div>

                <form id="authForm" class="space-y-4">
                    ${type === 'signup' ? `
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input type="text" required name="name"
                                class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Enter your full name">
                        </div>
                    ` : ''}
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" required name="email"
                            class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter your email">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div class="relative">
                            <input type="password" required name="password"
                                class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Enter your password">
                            <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 toggle-password">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </div>

                    ${type === 'login' ? `
                        <div class="flex justify-between items-center">
                            <label class="flex items-center gap-2">
                                <input type="checkbox" class="rounded text-green-500 focus:ring-green-500">
                                <span class="text-sm text-gray-600">Remember me</span>
                            </label>
                            <button type="button" class="text-sm text-green-600">Forgot Password?</button>
                        </div>
                    ` : ''}

                    <button type="submit" 
                        class="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors">
                        ${type === 'login' ? 'Login' : 'Create Account'}
                    </button>

                    <div class="relative text-center">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-gray-300"></div>
                        </div>
                        <div class="relative">
                            <span class="px-2 text-sm text-gray-500 bg-white">Or continue with</span>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <button type="button" class="flex items-center justify-center gap-2 p-3 border rounded-lg hover:bg-gray-50">
                            <i class="fab fa-google text-red-500"></i>
                            Google
                        </button>
                        <button type="button" class="flex items-center justify-center gap-2 p-3 border rounded-lg hover:bg-gray-50">
                            <i class="fab fa-apple"></i>
                            Apple
                        </button>
                    </div>
                </form>
            </div>
        `;
    }

    setupAuthListeners(modalElement) {
        const form = modalElement.querySelector('#authForm');
        const togglePassword = modalElement.querySelector('.toggle-password');
        const authToggles = modalElement.querySelectorAll('.auth-toggle');

        // Auth type toggle
        authToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const type = toggle.dataset.type;
                modalElement.remove();
                this.renderAuth(type);
            });
        });

        // Form submission
        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Simulate authentication
            this.user = {
                name: data.name || 'User',
                email: data.email
            };
            
            this.showNotification('Successfully logged in!');
            modalElement.remove();
            this.navigateTo('profile');
        });

        // Password toggle
        if (togglePassword) {
            togglePassword.addEventListener('click', () => {
                const input = togglePassword.previousElementSibling;
                const type = input.type === 'password' ? 'text' : 'password';
                input.type = type;
                togglePassword.innerHTML = `<i class="fas fa-${type === 'password' ? 'eye' : 'eye-slash'}"></i>`;
            });
        }
    }

    toggleAuthType(type) {
        this.renderAuth(type);
    }

    addToWishlist(productId) {
        if (!this.user) {
            this.showNotification('Please login to add to wishlist');
            this.renderAuth();
            return;
        }

        const product = products.find(p => p.id === productId);
        if (!product) return;

        if (!this.wishlist) this.wishlist = [];

        const existingItem = this.wishlist.find(item => item.id === productId);
        if (existingItem) {
            this.wishlist = this.wishlist.filter(item => item.id !== productId);
            this.showNotification('Removed from wishlist');
        } else {
            this.wishlist.push(product);
            this.showNotification('Added to wishlist');
        }

        this.renderPage();
    }

    renderSearchSuggestions() {
        const trendingSearches = [
            { text: "iPhone 14 Pro", category: "Electronic" },
            { text: "MacBook M1", category: "Electronic" },
            { text: "AirPods Pro", category: "Electronic" },
            { text: "Apple Watch", category: "Electronic" }
        ];

        return `
            <div class="p-4">
                <div class="mb-4">
                    <h3 class="text-sm font-medium text-gray-500 mb-2">Trending Searches</h3>
                    <div class="flex flex-wrap gap-2">
                        ${trendingSearches.map(search => `
                            <button 
                                class="trending-search px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors"
                                data-query="${search.text}">
                                ${search.text}
                            </button>
                        `).join('')}
                    </div>
                </div>

                <div>
                    <h3 class="text-sm font-medium text-gray-500 mb-2">Popular Categories</h3>
                    <div class="grid grid-cols-2 gap-3">
                        ${categories.map(category => `
                            <button 
                                class="category-search flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                data-category="${category.name}">
                                <i class="fas ${this.getCategoryIcon(category.name)} text-green-500"></i>
                                <span class="text-sm">${category.name}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    getCategoryIcon(category) {
        const icons = {
            'Electronic': 'fa-laptop',
            'Beauty': 'fa-spa',
            'Fashion': 'fa-tshirt',
            'Toys': 'fa-gamepad',
            'All': 'fa-th-large'
        };
        return icons[category] || 'fa-th';
    }

    setupSearchListeners() {
        const searchInput = document.getElementById('searchInput');
        const clearButton = document.querySelector('.clear-search');
        const resultsContainer = document.getElementById('searchResults');

        if (searchInput) {
            // Existing search input listener
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                clearButton.classList.toggle('hidden', !query);
                this.performSearch(query, resultsContainer);
            });

            // Add trending search listeners
            document.addEventListener('click', (e) => {
                // Trending search click
                if (e.target.closest('.trending-search')) {
                    const query = e.target.closest('.trending-search').dataset.query;
                    searchInput.value = query;
                    this.performSearch(query, resultsContainer);
                }

                // Category search click
                if (e.target.closest('.category-search')) {
                    const category = e.target.closest('.category-search').dataset.category;
                    searchInput.value = category;
                    this.performSearch(category, resultsContainer, true);
                }
            });

            // Clear button
            clearButton?.addEventListener('click', () => {
                searchInput.value = '';
                clearButton.classList.add('hidden');
                resultsContainer.innerHTML = this.renderSearchSuggestions();
            });
        }
    }

    performSearch(query, resultsContainer, isCategory = false) {
        if (!query.trim()) {
            resultsContainer.innerHTML = this.renderSearchSuggestions();
            return;
        }

        const filteredProducts = products.filter(product => {
            if (isCategory) {
                return query === 'All' || product.category === query;
            }
            return (
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase()) ||
                product.category.toLowerCase().includes(query.toLowerCase())
            );
        });

        if (filteredProducts.length === 0) {
            resultsContainer.innerHTML = `
                <div class="text-center py-8">
                    <i class="fas fa-search text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">No results found for "${query}"</p>
                </div>
            `;
            return;
        }

        resultsContainer.innerHTML = `
            <div class="p-4">
                <div class="mb-4">
                    <p class="text-gray-500">Found ${filteredProducts.length} results for "${query}"</p>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    ${filteredProducts.map(product => this.renderProductCard(product)).join('')}
                </div>
            </div>
        `;
    }

    renderDeliveryDetails() {
        const html = `
            <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div class="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                    <div class="p-4 border-b flex items-center justify-between">
                        <h2 class="text-xl font-bold">Delivery Details</h2>
                        <button class="close-delivery p-2 hover:bg-gray-100 rounded-full">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>

                    <form id="deliveryForm" class="p-6 space-y-6">
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                                <select class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500">
                                    <option>Select saved address</option>
                                    <option>Add new address</option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Delivery Time</label>
                                <div class="grid grid-cols-2 gap-3">
                                    <button type="button" class="p-3 border rounded-lg text-center hover:bg-gray-50">
                                        <div class="font-medium">Standard</div>
                                        <div class="text-sm text-gray-500">2-3 business days</div>
                                    </button>
                                    <button type="button" class="p-3 border rounded-lg text-center hover:bg-gray-50">
                                        <div class="font-medium">Express</div>
                                        <div class="text-sm text-gray-500">Next day delivery</div>
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Delivery Instructions</label>
                                <textarea
                                    class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 h-24"
                                    placeholder="Any special instructions for delivery"></textarea>
                            </div>
                        </div>

                        <div class="space-y-3 bg-gray-50 p-4 rounded-lg">
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-600">Subtotal</span>
                                <span>$${this.getCartTotal()}</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-600">Delivery Fee</span>
                                <span>$10.00</span>
                            </div>
                            <div class="flex justify-between font-medium pt-2 border-t">
                                <span>Total</span>
                                <span>$${this.getCartTotal() + 10}</span>
                            </div>
                        </div>

                        <button type="submit" 
                            class="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors">
                            Proceed to Payment
                        </button>
                    </form>
                </div>
            </div>
        `;

        const modal = document.createElement('div');
        modal.innerHTML = html;
        const modalElement = modal.firstElementChild;
        document.body.appendChild(modalElement);

        // Setup form handlers
        const form = document.getElementById('deliveryForm');
        const closeBtn = document.querySelector('.close-delivery');

        // Close on button click
        closeBtn?.addEventListener('click', () => {
            modalElement.remove();
        });

        // Close on click outside
        modalElement.addEventListener('click', (e) => {
            if (e.target === modalElement) {
                modalElement.remove();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                modalElement.remove();
                document.removeEventListener('keydown', closeOnEscape);
            }
        });

        // Form submission
        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.showNotification('Order placed successfully!');
            modalElement.remove();
            this.cart = [];
            this.navigateTo('home');
        });
    }

    renderLanding() {
        const html = `
            <div class="min-h-screen bg-gradient-to-b from-green-50 to-white">
                <!-- Header -->
                <div class="fixed top-0 left-0 right-0 bg-white z-10 max-w-md mx-auto border-b">
                    <div class="p-4 flex justify-between items-center">
                        <div class="flex items-center gap-2">
                            <i class="fas fa-shopping-bag text-green-500"></i>
                            <h1 class="text-xl font-bold">Ready Mart</h1>
                        </div>
                        <button class="get-started-btn bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                            Get Started
                        </button>
                    </div>
                </div>

                <!-- Hero Section -->
                <div class="pt-24 px-6 pb-10">
                    <div class="text-center mb-10">
                        <h1 class="text-4xl font-bold mb-4">Shop Smarter, <br>Live Better</h1>
                        <p class="text-gray-600 mb-8">Your one-stop destination for all your shopping needs. Get the best deals on premium products.</p>
                        <button class="get-started-btn bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-600 transition-colors text-lg font-semibold">
                            Start Shopping
                        </button>
                    </div>

                    <!-- Features -->
                    <div class="grid gap-6 mb-10">
                        <div class="bg-white p-6 rounded-xl shadow-sm">
                            <div class="flex items-start gap-4">
                                <div class="bg-green-100 p-3 rounded-lg">
                                    <i class="fas fa-truck text-green-500 text-xl"></i>
                                </div>
                                <div>
                                    <h3 class="font-semibold mb-1">Fast Delivery</h3>
                                    <p class="text-gray-600 text-sm">Get your orders delivered within 24 hours</p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-white p-6 rounded-xl shadow-sm">
                            <div class="flex items-start gap-4">
                                <div class="bg-green-100 p-3 rounded-lg">
                                    <i class="fas fa-shield-alt text-green-500 text-xl"></i>
                                </div>
                                <div>
                                    <h3 class="font-semibold mb-1">Secure Payments</h3>
                                    <p class="text-gray-600 text-sm">100% secure payment methods</p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-white p-6 rounded-xl shadow-sm">
                            <div class="flex items-start gap-4">
                                <div class="bg-green-100 p-3 rounded-lg">
                                    <i class="fas fa-undo text-green-500 text-xl"></i>
                                </div>
                                <div>
                                    <h3 class="font-semibold mb-1">Easy Returns</h3>
                                    <p class="text-gray-600 text-sm">Hassle-free return policy</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Popular Categories -->
                    <div class="mb-10">
                        <h2 class="text-xl font-bold mb-4">Popular Categories</h2>
                        <div class="grid grid-cols-2 gap-4">
                            <button class="bg-white p-4 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow">
                                <i class="fas fa-mobile-alt text-3xl text-green-500 mb-2"></i>
                                <p class="font-medium">Electronics</p>
                            </button>
                            <button class="bg-white p-4 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow">
                                <i class="fas fa-tshirt text-3xl text-green-500 mb-2"></i>
                                <p class="font-medium">Fashion</p>
                            </button>
                            <button class="bg-white p-4 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow">
                                <i class="fas fa-utensils text-3xl text-green-500 mb-2"></i>
                                <p class="font-medium">Groceries</p>
                            </button>
                            <button class="bg-white p-4 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow">
                                <i class="fas fa-home text-3xl text-green-500 mb-2"></i>
                                <p class="font-medium">Home</p>
                            </button>
                        </div>
                    </div>

                    <!-- Download App Section -->
                    <div class="bg-green-500 text-white p-6 rounded-xl mb-10">
                        <h2 class="text-xl font-bold mb-2">Get the Ready Mart App</h2>
                        <p class="mb-4 text-green-50">Shop on the go with our mobile app</p>
                        <div class="flex gap-4">
                            <button class="flex-1 bg-black text-white p-3 rounded-lg flex items-center justify-center gap-2">
                                <i class="fab fa-apple text-2xl"></i>
                                <div class="text-left">
                                    <div class="text-xs">Download on the</div>
                                    <div class="font-medium">App Store</div>
                                </div>
                            </button>
                            <button class="flex-1 bg-black text-white p-3 rounded-lg flex items-center justify-center gap-2">
                                <i class="fab fa-google-play text-2xl"></i>
                                <div class="text-left">
                                    <div class="text-xs">Get it on</div>
                                    <div class="font-medium">Play Store</div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.app.innerHTML = html;
        this.setupLandingListeners();
    }

    setupLandingListeners() {
        const getStartedButtons = document.querySelectorAll('.get-started-btn');
        getStartedButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.navigateTo('home');
            });
        });
    }
}

// Initialize the app
const app = new ECommerceApp(); 