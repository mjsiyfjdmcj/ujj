// Constants and Data
const TEMPLATES = [
    {
        id: 't1',
        name: 'Nebula Ultra',
        description: 'Our most stunning creation. High-frame animations, glassmorphism, and dynamic 3D elements.',
        category: 'Personal Portfolio',
        price: 200,
        beautyScore: 10,
        imageUrl: 'https://picsum.photos/seed/nebula/800/600',
        features: ['3D Hero Section', 'Advanced Dark Mode', 'Interactive Background', 'Mobile Optimized']
    },
    {
        id: 't2',
        name: 'Zenith Portfolio',
        description: 'Clean, minimalist, and breathtakingly elegant. Perfect for modern creatives.',
        category: 'Personal Portfolio',
        price: 200,
        beautyScore: 9.5,
        imageUrl: 'https://picsum.photos/seed/zenith/800/600',
        features: ['Minimalist UI', 'Custom Typefaces', 'Smooth Page Transitions', 'Portfolio Gallery']
    },
    {
        id: 't3',
        name: 'Connect Portal',
        description: 'A professional training and course portal with a sleek modern interface.',
        category: 'Training & Courses',
        price: 500,
        beautyScore: 7,
        imageUrl: 'https://picsum.photos/seed/portal/800/600',
        features: ['LMS Integration', 'User Dashboard', 'Video Player', 'Quiz Module']
    },
    {
        id: 't4',
        name: 'Standard Pro',
        description: 'Highly functional business portal. Clean and balanced design for enterprise needs.',
        category: 'Business Portal',
        price: 500,
        beautyScore: 6.5,
        imageUrl: 'https://picsum.photos/seed/business/800/600',
        features: ['CRM Dashboard', 'Analytics Panel', 'Team Management', 'Data Export']
    },
    {
        id: 't5',
        name: 'Basic Corporate',
        description: 'Solid, dependable, and traditional. Focused on performance over visual flair.',
        category: 'Business Portal',
        price: 1000,
        beautyScore: 4,
        imageUrl: 'https://picsum.photos/seed/basic/800/600',
        features: ['Static Layout', 'Legacy Support', 'SEO Optimized', 'Fast Load Time']
    },
    {
        id: 't6',
        name: 'Legacy Personal',
        description: 'Simple personal site. No distractions, just your content.',
        category: 'Personal Portfolio',
        price: 1000,
        beautyScore: 3.5,
        imageUrl: 'https://picsum.photos/seed/simple/800/600',
        features: ['Single Page', 'Text Focus', 'Contact Form', 'Clean Code']
    }
];

// State management
let currentPage = 'HOME';
let currentFilter = 'All';
let isLoading = false;

// Page management
function setPage(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => {
        p.style.display = 'none';
        p.classList.remove('active');
    });
    
    // Show selected page
    const pageElement = document.getElementById(`${page.toLowerCase()}-page`);
    if (pageElement) {
        pageElement.style.display = 'block';
        setTimeout(() => pageElement.classList.add('active'), 10);
    }
    
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === page) {
            item.classList.add('active');
        }
    });
    
    currentPage = page;
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Load templates if templates page
    if (page === 'TEMPLATES') {
        renderTemplates();
    }
}

// Filter management
function setFilter(filter) {
    currentFilter = filter;
    
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });
    
    renderTemplates();
}

// Template rendering
function renderTemplates() {
    const grid = document.getElementById('templates-grid');
    if (!grid) return;
    
    const filteredTemplates = currentFilter === 'All' 
        ? TEMPLATES 
        : TEMPLATES.filter(t => t.category === currentFilter);
    
    grid.innerHTML = filteredTemplates.map(template => `
        <div class="product-card group glass-hover transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
            <div class="relative aspect-video overflow-hidden shrink-0">
                <img 
                    src="${template.imageUrl}" 
                    alt="${template.name}"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                <!-- Category Badge -->
                <div class="absolute top-4 left-4 z-10">
                    <div class="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/80">
                        ${template.category}
                    </div>
                </div>

                <!-- Beauty Score Badge -->
                <div class="absolute top-4 right-4 z-10">
                    <div class="bg-indigo-600/80 backdrop-blur-md px-2 py-1 rounded-lg border border-indigo-400/30 text-[10px] font-black text-white">
                        ${template.beautyScore}/10
                    </div>
                </div>

                <!-- Overlay -->
                <div class="overlay absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                    <p class="text-white text-sm font-bold tracking-widest uppercase">
                        Exclusive Design
                    </p>
                    <div class="mt-2 text-xs text-gray-300 font-medium">Contact Architect for info</div>
                </div>
            </div>
            
            <div class="p-7 flex flex-col flex-1">
                <div class="flex justify-between items-start mb-3">
                    <h3 class="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">${template.name}</h3>
                    <span class="text-2xl font-black text-indigo-400 leading-none">${template.price}৳</span>
                </div>
                
                <p class="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed">
                    ${template.description}
                </p>

                <div class="mt-auto space-y-4">
                    <div class="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div 
                            class="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 transition-all duration-1000 ease-out" 
                            style="width: ${template.beautyScore * 10}%"
                        ></div>
                    </div>

                    <div class="flex flex-wrap gap-2">
                        ${template.features.slice(0, 2).map(f => `
                            <span class="text-[9px] bg-white/5 px-2 py-1 rounded-md border border-white/5 text-gray-400 uppercase font-bold tracking-tighter">
                                ${f}
                            </span>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Chat functionality
function sendMessage() {
    const input = document.getElementById('chat-input');
    const messagesContainer = document.getElementById('chat-messages');
    const sendButton = document.getElementById('send-button');
    
    if (!input.value.trim() || isLoading) return;
    
    const userMessage = input.value.trim();
    input.value = '';
    
    // Add user message
    addMessage('user', userMessage);
    
    // Show loading
    isLoading = true;
    sendButton.disabled = true;
    showLoadingMessage();
    
    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
        hideLoadingMessage();
        const response = getSimulatedResponse(userMessage);
        addMessage('assistant', response);
        isLoading = false;
        sendButton.disabled = false;
    }, 2000);
}

function addMessage(role, content) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = role === 'user' ? 'message-user' : 'message-assistant';
    
    messageDiv.innerHTML = `
        <div class="${role === 'user' ? 'message-bubble-user' : 'message-bubble-assistant'}">
            <p class="text-sm leading-relaxed whitespace-pre-wrap">${content}</p>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showLoadingMessage() {
    const messagesContainer = document.getElementById('chat-messages');
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-message';
    loadingDiv.className = 'message-assistant';
    
    loadingDiv.innerHTML = `
        <div class="message-bubble-assistant">
            <div class="loading-dots">
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
            </div>
        </div>
    `;
    
    messagesContainer.appendChild(loadingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideLoadingMessage() {
    const loadingMessage = document.getElementById('loading-message');
    if (loadingMessage) {
        loadingMessage.remove();
    }
}

function getSimulatedResponse(userMessage) {
    const responses = [
        "Based on your requirements, I'd recommend our 200 Taka tier. The ultra-premium aesthetics will give you the visual impact you're looking for while remaining incredibly affordable.",
        "For a professional business presence, consider our 500 Taka Standard tier. It balances functionality with modern design principles perfectly.",
        "If you prefer minimalist, traditional design, our 1000 Taka Legacy tier focuses on performance and reliability over visual complexity.",
        "The beauty of our inverted pricing model is that the most stunning designs are the most accessible. What specific features are most important to your project?",
        "Our AI analysis suggests that your project would benefit from the advanced animations and glassmorphism effects available in our premium 200 Taka tier."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the app
    setPage('HOME');
    
    // Chat input enter key
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Initialize filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => setFilter(btn.dataset.filter));
    });
});

// Utility functions
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mobile menu functions
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuBtn = document.getElementById('mobile-menu-btn');
    const icon = menuBtn.querySelector('i');
    
    if (mobileMenu.classList.contains('menu-open')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuBtn = document.getElementById('mobile-menu-btn');
    const icon = menuBtn.querySelector('i');
    
    mobileMenu.classList.add('menu-open');
    mobileMenu.style.transform = 'translateY(0)';
    mobileMenu.style.opacity = '1';
    mobileMenu.style.pointerEvents = 'auto';
    icon.className = 'fa-solid fa-times text-xl';
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuBtn = document.getElementById('mobile-menu-btn');
    const icon = menuBtn.querySelector('i');
    
    mobileMenu.classList.remove('menu-open');
    mobileMenu.style.transform = 'translateY(-100%)';
    mobileMenu.style.opacity = '0';
    mobileMenu.style.pointerEvents = 'none';
    icon.className = 'fa-solid fa-bars text-xl';
}

// Export for global access
window.setPage = setPage;
window.setFilter = setFilter;
window.sendMessage = sendMessage;
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;