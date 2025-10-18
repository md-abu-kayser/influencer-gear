document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initThemeSelector();
  initDarkMode();
  initNavigation();
  initProductFilters();
  initTestimonialsSlider();
  initCart();
  initSearch();
  initScrollEffects();
  initLoadingScreen();
  initAnimations();
});

// Theme Selector Functionality
function initThemeSelector() {
  const themeToggle = document.querySelector(".theme-toggle");
  const themeOptions = document.querySelectorAll(".theme-option");

  themeToggle.addEventListener("click", function () {
    const themeSelector = document.querySelector(".theme-selector");
    themeSelector.classList.toggle("active");
  });

  themeOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const theme = this.getAttribute("data-theme");
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("selectedTheme", theme);

      // Close theme selector
      document.querySelector(".theme-selector").classList.remove("active");
    });
  });

  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem("selectedTheme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }
}

// Dark Mode Toggle Functionality
function initDarkMode() {
  const darkModeToggle = document.getElementById("dark-mode-switch");

  // Check for saved dark mode preference
  const isDarkMode = localStorage.getItem("darkMode") === "true";

  if (isDarkMode) {
    document.body.classList.add("dark-mode");
    darkModeToggle.checked = true;
  }

  darkModeToggle.addEventListener("change", function () {
    if (this.checked) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "false");
    }
  });
}

// Navigation Functionality
function initNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.classList.remove("no-scroll");

      // Update active link
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".nav-container")) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.classList.remove("no-scroll");
    }
  });
}

// Product Filters Functionality
function initProductFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productsGrid = document.querySelector(".products-grid");

  // Sample product data
  const products = [
    {
      id: 1,
      name: "Professional DSLR Camera",
      category: "camera",
      price: 1299.99,
      originalPrice: 1599.99,
      rating: 4.8,
      reviewCount: 124,
      image: "images/main-camera.png",
      badge: "Best Seller",
      description:
        "High-resolution camera perfect for professional photography and videography.",
    },
    {
      id: 2,
      name: "Wireless Lavalier Microphone",
      category: "audio",
      price: 89.99,
      originalPrice: 119.99,
      rating: 4.6,
      reviewCount: 87,
      image: "images/mic.png",
      badge: "New",
      description: "Crystal clear audio recording for interviews and vlogging.",
    },
    {
      id: 3,
      name: "Studio Lighting Kit",
      category: "lighting",
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.5,
      reviewCount: 56,
      image: "images/lights.png",
      badge: "Sale",
      description:
        "Professional lighting setup for perfect illumination in any condition.",
    },
    {
      id: 4,
      name: "4K Action Camera",
      category: "camera",
      price: 349.99,
      originalPrice: 399.99,
      rating: 4.7,
      reviewCount: 203,
      image: "images/action.png",
      badge: "Popular",
      description: "Capture all your adventures in stunning 4K resolution.",
    },
    {
      id: 5,
      name: "Camera Tripod Stand",
      category: "accessories",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.4,
      reviewCount: 142,
      image: "images/tripod.png",
      badge: "",
      description: "Sturdy tripod for stable shots in any environment.",
    },
    {
      id: 6,
      name: "Professional Drone",
      category: "camera",
      price: 899.99,
      originalPrice: 1099.99,
      rating: 4.9,
      reviewCount: 78,
      image: "images/drone.png",
      badge: "Premium",
      description:
        "Aerial photography and videography with advanced stabilization.",
    },
    {
      id: 7,
      name: "Ring Light with Stand",
      category: "lighting",
      price: 59.99,
      originalPrice: 79.99,
      rating: 4.3,
      reviewCount: 91,
      image: "images/single-light.png",
      badge: "",
      description: "Perfect lighting for makeup tutorials and close-up shots.",
    },
    {
      id: 8,
      name: "Camera Lens Kit",
      category: "accessories",
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.7,
      reviewCount: 64,
      image: "images/camera.png",
      badge: "Bundle",
      description:
        "Multiple lenses for different photography styles and situations.",
    },
    {
      id: 9,
      name: "Wireless Earbuds",
      category: "audio",
      price: 129.99,
      originalPrice: 159.99,
      rating: 4.5,
      reviewCount: 118,
      image: "images/airpod.png",
      badge: "New",
      description: "High-quality audio for monitoring and personal listening.",
    },
  ];

  // Render products
  function renderProducts(filter = "all") {
    productsGrid.innerHTML = "";

    const filteredProducts =
      filter === "all"
        ? products
        : products.filter((product) => product.category === filter);

    filteredProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.innerHTML = `
                ${
                  product.badge
                    ? `<div class="product-badge">${product.badge}</div>`
                    : ""
                }
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-actions">
                        <button class="action-btn quick-view" data-id="${
                          product.id
                        }">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn add-wishlist" data-id="${
                          product.id
                        }">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-rating">
                        <div class="rating-stars">
                            ${generateStarRating(product.rating)}
                        </div>
                        <span class="rating-count">(${
                          product.reviewCount
                        })</span>
                    </div>
                    <div class="product-price">
                        <span class="price">$${product.price.toFixed(2)}</span>
                        ${
                          product.originalPrice
                            ? `<span class="original-price">$${product.originalPrice.toFixed(
                                2
                              )}</span>`
                            : ""
                        }
                    </div>
                    <button class="btn btn-primary add-to-cart" data-id="${
                      product.id
                    }">
                        <span>Add to Cart</span>
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            `;

      productsGrid.appendChild(productCard);
    });

    // Add event listeners to new buttons
    attachProductEventListeners();
  }

  // Generate star rating HTML
  function generateStarRating(rating) {
    let stars = "";
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars += '<i class="fas fa-star"></i>';
    }

    if (hasHalfStar) {
      stars += '<i class="fas fa-star-half-alt"></i>';
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars += '<i class="far fa-star"></i>';
    }

    return stars;
  }

  // Attach event listeners to product buttons
  function attachProductEventListeners() {
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const productId = this.getAttribute("data-id");
        addToCart(parseInt(productId));

        // Show feedback
        this.innerHTML = '<span>Added!</span> <i class="fas fa-check"></i>';
        this.style.backgroundColor = "#27ae60";

        setTimeout(() => {
          this.innerHTML =
            '<span>Add to Cart</span> <i class="fas fa-shopping-cart"></i>';
          this.style.backgroundColor = "";
        }, 1500);
      });
    });

    // Quick view buttons
    const quickViewButtons = document.querySelectorAll(".quick-view");
    quickViewButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const productId = this.getAttribute("data-id");
        // In a real application, this would open a product quick view modal
        console.log("Quick view product:", productId);
      });
    });

    // Wishlist buttons
    const wishlistButtons = document.querySelectorAll(".add-wishlist");
    wishlistButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const productId = this.getAttribute("data-id");
        // In a real application, this would add the product to a wishlist
        this.innerHTML = '<i class="fas fa-heart" style="color: #e02c6d;"></i>';

        setTimeout(() => {
          this.innerHTML = '<i class="fas fa-heart"></i>';
        }, 1500);
      });
    });
  }

  // Filter button event listeners
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Update active filter button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Filter products
      const filter = this.getAttribute("data-filter");
      renderProducts(filter);
    });
  });

  // Initial render
  renderProducts();
}

// Testimonials Slider Functionality
function initTestimonialsSlider() {
  const track = document.querySelector(".testimonials-track");
  const dotsContainer = document.querySelector(".slider-dots");
  const prevButton = document.querySelector(".slider-btn.prev");
  const nextButton = document.querySelector(".slider-btn.next");

  // Sample testimonial data
  const testimonials = [
    {
      id: 1,
      text: "The equipment I purchased from InfluencerGear completely transformed my content quality. My engagement has doubled since I started using their professional gear!",
      author: "Jessica Parker",
      role: "Beauty Influencer",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
      id: 2,
      text: "As a travel vlogger, I need reliable equipment that can withstand different environments. InfluencerGear products have never let me down, even in the most challenging conditions.",
      author: "Marcus Chen",
      role: "Travel Vlogger",
      avatar: "https://randomuser.me/api/portraits/men/54.jpg",
    },
    {
      id: 3,
      text: "The customer service is exceptional! They helped me choose the perfect lighting setup for my home studio. The results are professional-level quality without the studio price tag.",
      author: "Sophia Rodriguez",
      role: "Fitness Influencer",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      id: 4,
      text: "I've tried many different brands, but the audio equipment from InfluencerGear is by far the best. Crystal clear sound that makes my podcasts stand out from the competition.",
      author: "David Thompson",
      role: "Podcast Host",
      avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    },
  ];

  let currentSlide = 0;

  // Render testimonials
  function renderTestimonials() {
    track.innerHTML = "";
    dotsContainer.innerHTML = "";

    testimonials.forEach((testimonial, index) => {
      // Create testimonial card
      const testimonialCard = document.createElement("div");
      testimonialCard.className = "testimonial-card";
      testimonialCard.innerHTML = `
                <div class="testimonial-content">
                    <p class="testimonial-text">${testimonial.text}</p>
                    <div class="testimonial-author">
                        <div class="author-avatar">
                            <img src="${testimonial.avatar}" alt="${testimonial.author}">
                        </div>
                        <div class="author-info">
                            <h4>${testimonial.author}</h4>
                            <p>${testimonial.role}</p>
                        </div>
                    </div>
                </div>
            `;

      track.appendChild(testimonialCard);

      // Create dot
      const dot = document.createElement("div");
      dot.className = `slider-dot ${index === currentSlide ? "active" : ""}`;
      dot.setAttribute("data-index", index);
      dotsContainer.appendChild(dot);

      // Dot click event
      dot.addEventListener("click", function () {
        goToSlide(parseInt(this.getAttribute("data-index")));
      });
    });

    updateSliderPosition();
  }

  // Update slider position
  function updateSliderPosition() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots
    const dots = document.querySelectorAll(".slider-dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  // Go to specific slide
  function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateSliderPosition();
  }

  // Next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonials.length;
    updateSliderPosition();
  }

  // Previous slide
  function prevSlide() {
    currentSlide =
      (currentSlide - 1 + testimonials.length) % testimonials.length;
    updateSliderPosition();
  }

  // Event listeners
  prevButton.addEventListener("click", prevSlide);
  nextButton.addEventListener("click", nextSlide);

  // Auto advance slides
  let slideInterval = setInterval(nextSlide, 5000);

  // Pause on hover
  const slider = document.querySelector(".testimonials-slider");
  slider.addEventListener("mouseenter", () => clearInterval(slideInterval));
  slider.addEventListener("mouseleave", () => {
    slideInterval = setInterval(nextSlide, 5000);
  });

  // Initial render
  renderTestimonials();
}

// Shopping Cart Functionality
function initCart() {
  const cartBtn = document.querySelector(".cart-btn");
  const cartSidebar = document.querySelector(".cart-sidebar");
  const cartOverlay = document.querySelector(".cart-overlay");
  const closeCart = document.querySelector(".close-cart");
  const continueShopping = document.querySelector(".continue-shopping");
  const cartContent = document.querySelector(".cart-content");
  const cartCount = document.querySelector(".cart-count");
  const totalPrice = document.querySelector(".total-price");

  let cartItems = [];

  // Open cart
  cartBtn.addEventListener("click", openCart);

  // Close cart
  closeCart.addEventListener("click", closeCartFunc);
  continueShopping.addEventListener("click", closeCartFunc);
  cartOverlay.addEventListener("click", closeCartFunc);

  function openCart() {
    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");
    document.body.classList.add("no-scroll");
    renderCartItems();
  }

  function closeCartFunc() {
    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }

  // Add item to cart
  function addToCart(productId) {
    const products = {
      1: {
        name: "Professional DSLR Camera",
        price: 1299.99,
        image: "images/main-camera.png",
      },
      2: {
        name: "Wireless Lavalier Microphone",
        price: 89.99,
        image: "images/mic.png",
      },
      3: {
        name: "Studio Lighting Kit",
        price: 199.99,
        image: "images/lights.png",
      },
      4: {
        name: "4K Action Camera",
        price: 349.99,
        image: "images/action.png",
      },
      5: {
        name: "Camera Tripod Stand",
        price: 79.99,
        image: "images/tripod.png",
      },
      6: {
        name: "Professional Drone",
        price: 899.99,
        image: "images/drone.png",
      },
      7: {
        name: "Ring Light with Stand",
        price: 59.99,
        image: "images/single-light.png",
      },
      8: { name: "Camera Lens Kit", price: 299.99, image: "images/camera.png" },
      9: {
        name: "Wireless Earbuds",
        price: 129.99,
        image: "images/airpod.png",
      },
    };

    const product = products[productId];

    // Check if product is already in cart
    const existingItem = cartItems.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }

    updateCartUI();

    // If cart is open, update the display
    if (cartSidebar.classList.contains("active")) {
      renderCartItems();
    }
  }

  // Remove item from cart
  function removeFromCart(productId) {
    cartItems = cartItems.filter((item) => item.id !== productId);
    updateCartUI();
    renderCartItems();
  }

  // Update item quantity
  function updateQuantity(productId, newQuantity) {
    const item = cartItems.find((item) => item.id === productId);

    if (item) {
      if (newQuantity <= 0) {
        removeFromCart(productId);
      } else {
        item.quantity = newQuantity;
        updateCartUI();
        renderCartItems();
      }
    }
  }

  // Update cart UI (count and total)
  function updateCartUI() {
    // Update cart count
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update total price
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    totalPrice.textContent = `$${total.toFixed(2)}`;
  }

  // Render cart items
  function renderCartItems() {
    cartContent.innerHTML = "";

    if (cartItems.length === 0) {
      cartContent.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                    <p>Add some products to get started!</p>
                </div>
            `;
      return;
    }

    cartItems.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-actions">
                        <button class="quantity-btn decrease" data-id="${
                          item.id
                        }">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${
                          item.id
                        }">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="remove-item" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;

      cartContent.appendChild(cartItem);
    });

    // Add event listeners to cart item buttons
    const decreaseButtons = document.querySelectorAll(".quantity-btn.decrease");
    const increaseButtons = document.querySelectorAll(".quantity-btn.increase");
    const removeButtons = document.querySelectorAll(".remove-item");

    decreaseButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const productId = parseInt(this.getAttribute("data-id"));
        const item = cartItems.find((item) => item.id === productId);
        if (item) {
          updateQuantity(productId, item.quantity - 1);
        }
      });
    });

    increaseButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const productId = parseInt(this.getAttribute("data-id"));
        const item = cartItems.find((item) => item.id === productId);
        if (item) {
          updateQuantity(productId, item.quantity + 1);
        }
      });
    });

    removeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const productId = parseInt(this.getAttribute("data-id"));
        removeFromCart(productId);
      });
    });
  }

  // Checkout button
  const checkoutBtn = document.querySelector(".checkout-btn");
  checkoutBtn.addEventListener("click", function () {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    alert("Proceeding to checkout!");
    closeCartFunc();
  });

  // Make addToCart function globally available
  window.addToCart = addToCart;
}

// Search Functionality
function initSearch() {
  const searchBtn = document.querySelector(".search-btn");
  const searchModal = document.querySelector(".search-modal");
  const closeSearch = document.querySelector(".close-search");

  searchBtn.addEventListener("click", openSearch);
  closeSearch.addEventListener("click", closeSearchFunc);

  function openSearch() {
    searchModal.classList.add("active");
    document.body.classList.add("no-scroll");

    // Focus on search input
    setTimeout(() => {
      document.querySelector(".search-bar input").focus();
    }, 300);
  }

  function closeSearchFunc() {
    searchModal.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }

  // Close search when clicking outside
  searchModal.addEventListener("click", function (event) {
    if (event.target === searchModal) {
      closeSearchFunc();
    }
  });

  // Search functionality
  const searchInput = document.querySelector(".search-bar input");
  const searchSubmit = document.querySelector(".search-submit");

  searchSubmit.addEventListener("click", performSearch);
  searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      performSearch();
    }
  });

  function performSearch() {
    const query = searchInput.value.trim();
    if (query) {
      // this would perform an actual search
      console.log("Searching for:", query);
      closeSearchFunc();
      searchInput.value = "";

      // Show search results (simulated)
      alert(`Search results for: ${query}`);
    }
  }
}

// Scroll Effects
function initScrollEffects() {
  const backToTop = document.querySelector(".back-to-top");

  // Show/hide back to top button
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }

    // Header shadow on scroll
    const header = document.querySelector(".header");
    if (window.pageYOffset > 50) {
      header.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.boxShadow = "none";
    }
  });

  // Back to top functionality
  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Loading Screen
function initLoadingScreen() {
  const loadingScreen = document.querySelector(".loading-screen");

  // Simulate loading time
  setTimeout(() => {
    loadingScreen.classList.add("hidden");

    // Remove from DOM after animation completes
    setTimeout(() => {
      loadingScreen.remove();
    }, 500);
  }, 2000);
}

// Animations
function initAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".product-card, .collection-card, .feature-item, .blog-card, .testimonial-card"
  );
  animateElements.forEach((el) => {
    el.classList.add("animate-on-scroll");
    observer.observe(el);
  });

  // Add CSS for animations
  const style = document.createElement("style");
  style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-on-scroll.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .product-card:nth-child(odd).animate-on-scroll {
            transition-delay: 0.1s;
        }
        
        .product-card:nth-child(even).animate-on-scroll {
            transition-delay: 0.2s;
        }
    `;
  document.head.appendChild(style);
}
