// main.js - Core functionality for Land Surveying & Property Valuation website

// ============================================
// THEME MANAGEMENT
// ============================================
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    updateThemeIcon();
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
}

function updateThemeIcon() {
    const isDark = document.body.classList.contains('dark-mode');
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
        btn.innerHTML = isDark ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon"></i>';
        btn.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    });
}

// ============================================
// RTL MANAGEMENT
// ============================================
function initRTL() {
    const savedDir = localStorage.getItem('direction') || 'ltr';
    if (savedDir === 'rtl') {
        document.body.classList.add('rtl');
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
    }
    updateRTLIcon();
}

function toggleRTL() {
    document.body.classList.toggle('rtl');
    const isRTL = document.body.classList.contains('rtl');
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', isRTL ? 'ar' : 'en');
    localStorage.setItem('direction', isRTL ? 'rtl' : 'ltr');
    updateRTLIcon();
}

function updateRTLIcon() {
    const isRTL = document.body.classList.contains('rtl');
    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
        btn.innerHTML = isRTL ? '<i class="bi bi-text-left"></i>' : '<i class="bi bi-text-right"></i>';
        btn.title = isRTL ? 'Switch to LTR' : 'Switch to RTL';
    });
}

// ============================================
// MOBILE NAVIGATION
// ============================================
function toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    if (menu && overlay) {
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    }
}

function closeMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    if (menu && overlay) {
        menu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Toggle mobile home dropdown
function toggleMobileDropdown(el) {
    const dropdown = el.nextElementSibling;
    if (dropdown) {
        dropdown.classList.toggle('active');
        const icon = el.querySelector('.dropdown-arrow');
        if (icon) icon.classList.toggle('rotated');
    }
}

// Toggle mobile pages dropdown
function toggleMobilePagesDropdown(el) {
    const dropdown = el.nextElementSibling;
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type) {
    type = type || 'info';
    document.querySelectorAll('.notification-toast').forEach(function(n) { n.remove(); });

    var toast = document.createElement('div');
    toast.className = 'notification-toast notification-' + type;

    var icons = { success: 'bi-check-circle-fill', error: 'bi-x-circle-fill', warning: 'bi-exclamation-triangle-fill', info: 'bi-info-circle-fill' };

    toast.innerHTML = '<div class="notification-content"><i class="bi ' + (icons[type] || icons.info) + '"></i><span>' + message + '</span></div><button class="notification-close" onclick="this.parentElement.remove()"><i class="bi bi-x"></i></button>';

    if (!document.getElementById('notification-styles')) {
        var style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = '.notification-toast{position:fixed;top:90px;right:20px;padding:1rem 1.5rem;border-radius:12px;display:flex;align-items:center;justify-content:space-between;gap:1rem;z-index:9999;animation:slideInRight .3s ease;box-shadow:0 4px 20px rgba(0,0,0,.15);max-width:400px;min-width:250px;}.notification-success{background:#d4edda;color:#155724;border:1px solid #c3e6cb;}.notification-error{background:#f8d7da;color:#721c24;border:1px solid #f5c6cb;}.notification-warning{background:#fff3cd;color:#856404;border:1px solid #ffeeba;}.notification-info{background:#cce5ff;color:#004085;border:1px solid #b8daff;}.notification-content{display:flex;align-items:center;gap:.75rem;}.notification-close{background:none;border:none;cursor:pointer;opacity:.7;font-size:1rem;color:inherit;}.notification-close:hover{opacity:1;}body.rtl .notification-toast{right:auto;left:20px;animation-name:slideInLeft;}';
        document.head.appendChild(style);
    }

    document.body.appendChild(toast);
    setTimeout(function() {
        if (toast.parentElement) {
            toast.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(function() { toast.remove(); }, 300);
        }
    }, 3000);
}

// ============================================
// CONTACT FORM
// ============================================
function handleContactForm(e) {
    e.preventDefault();
    var form = e.target;
    var name = form.querySelector('[name="name"]');
    var email = form.querySelector('[name="email"]');
    var subject = form.querySelector('[name="subject"]');
    var message = form.querySelector('[name="message"]');

    if (!name.value.trim()) { showNotification('Please enter your name.', 'error'); name.focus(); return; }
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { showNotification('Please enter a valid email address.', 'error'); email.focus(); return; }
    if (!subject.value.trim()) { showNotification('Please enter a subject.', 'error'); subject.focus(); return; }
    if (!message.value.trim()) { showNotification('Please enter your message.', 'error'); message.focus(); return; }

    showNotification('Message sent successfully! We will get back to you soon.', 'success');
    form.reset();
}

// ============================================
// SITE VISIT REQUEST FORM
// ============================================
function handleSiteVisitForm(e) {
    e.preventDefault();
    var form = e.target;
    var name = form.querySelector('[name="name"]');
    var email = form.querySelector('[name="email"]');
    var phone = form.querySelector('[name="phone"]');
    var service = form.querySelector('[name="service"]');
    var date = form.querySelector('[name="date"]');
    var address = form.querySelector('[name="address"]');

    if (!name || !name.value.trim()) { showNotification('Please enter your full name.', 'error'); if (name) name.focus(); return; }
    if (!email || !email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { showNotification('Please enter a valid email address.', 'error'); if (email) email.focus(); return; }
    if (!phone || !phone.value.trim()) { showNotification('Please enter a phone number.', 'error'); if (phone) phone.focus(); return; }
    var digits = (phone ? phone.value : '').replace(/\D/g, '');
    if (digits.length !== 10) { showNotification('Please enter a valid 10-digit phone number.', 'error'); if (phone) phone.focus(); return; }
    if (!service || !service.value) { showNotification('Please select a service.', 'error'); if (service) service.focus(); return; }
    if (!date || !date.value) { showNotification('Please select a preferred date.', 'error'); if (date) date.focus(); return; }
    var visitDate = new Date(date.value + 'T00:00:00');
    if (isNaN(visitDate.getTime())) { showNotification('Please select a valid date.', 'error'); if (date) date.focus(); return; }
    if (!address || !address.value.trim()) { showNotification('Please enter the property address.', 'error'); if (address) address.focus(); return; }

    showNotification('Your site visit request has been submitted successfully.', 'success');
    form.reset();
}

// ============================================
// NEWSLETTER FORM
// ============================================
function handleNewsletter(e) {
    if (e) e.preventDefault();
    var form = e.target || e;
    var input = form.querySelector('input[type="email"]');
    if (!input || !input.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    showNotification('Successfully subscribed to our newsletter!', 'success');
    input.value = '';
}

// ============================================
// COMING SOON FORM
// ============================================
function handleComingSoonForm(e) {
    if (e) e.preventDefault();
    var form = e.target;
    var input = form.querySelector('input[type="email"]');
    if (!input || !input.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    showNotification('Thank you! We will notify you when we launch.', 'success');
    form.reset();
}

// ============================================
// BLOG SEARCH & CATEGORY FILTERING
// ============================================
var activeBlogCategory = 'all';
var activeBlogSearchQuery = '';

function applyBlogFilters() {
    var cards = document.querySelectorAll('.blog-card');
    var noResults = document.getElementById('blogNoResults');
    var found = 0;

    cards.forEach(function(card) {
        var col = card.closest('div[class*="col"]');
        if (!col) return;

        // Category match
        var cardCat = (card.getAttribute('data-category') || col.getAttribute('data-category') || '').trim().toLowerCase();
        var metaText = (card.querySelector('.blog-meta') || { textContent: '' }).textContent.toLowerCase();
        
        var catMatch = (activeBlogCategory === 'all');
        if (!catMatch) {
            var targetCat = activeBlogCategory.toLowerCase();
            if (cardCat && (cardCat === targetCat || cardCat.indexOf(targetCat) !== -1 || targetCat.indexOf(cardCat) !== -1)) {
                catMatch = true;
            } else if (targetCat === 'boundary surveys' && metaText.indexOf('boundary') !== -1) {
                catMatch = true;
            } else if (targetCat === 'property valuation' && metaText.indexOf('valuation') !== -1) {
                catMatch = true;
            } else if (targetCat === 'construction' && metaText.indexOf('construction') !== -1) {
                catMatch = true;
            } else if (targetCat === 'land development' && (metaText.indexOf('land') !== -1 || metaText.indexOf('development') !== -1)) {
                catMatch = true;
            }
        }

        // Search match
        var title = (card.querySelector('.card-title') || { textContent: '' }).textContent.toLowerCase();
        var text = (card.querySelector('.card-text') || { textContent: '' }).textContent.toLowerCase();
        var fullText = title + ' ' + metaText + ' ' + text;
        var searchMatch = (!activeBlogSearchQuery || fullText.indexOf(activeBlogSearchQuery) !== -1);

        if (catMatch && searchMatch) {
            col.style.display = '';
            found++;
        } else {
            col.style.display = 'none';
        }
    });

    if (noResults) {
        noResults.style.display = (found === 0) ? 'block' : 'none';
    }

    var banner = document.getElementById('activeCategoryBanner');
    var label = document.getElementById('currentCategoryLabel');
    if (banner && label) {
        if (activeBlogCategory !== 'all') {
            banner.style.setProperty('display', 'flex', 'important');
            label.textContent = activeBlogCategory;
        } else {
            banner.style.setProperty('display', 'none', 'important');
        }
    }
}

function filterBlogCategory(category, el) {
    activeBlogCategory = category || 'all';

    // Update active class on category links
    document.querySelectorAll('.blog-category-link').forEach(function(link) {
        var linkCat = link.getAttribute('data-category');
        if (linkCat === activeBlogCategory) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    applyBlogFilters();
}

function handleBlogSearch(e) {
    if (e) e.preventDefault();
    var input = document.getElementById('blogSearchInput') || document.getElementById('blog-search');
    activeBlogSearchQuery = input ? input.value.trim().toLowerCase() : '';
    applyBlogFilters();
}

function resetBlogFilters() {
    activeBlogCategory = 'all';
    activeBlogSearchQuery = '';
    var input = document.getElementById('blogSearchInput') || document.getElementById('blog-search');
    if (input) input.value = '';
    filterBlogCategory('all');
}

// Backward compatibility alias
function filterBlog(category) {
    filterBlogCategory(category);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(function(el) { observer.observe(el); });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var target = this.getAttribute('href');
            if (target === '#') return;
            var element = document.querySelector(target);
            if (element) {
                e.preventDefault();
                var navHeight = (document.querySelector('.main-navbar') || {}).offsetHeight || 0;
                window.scrollTo({ top: element.offsetTop - navHeight - 20, behavior: 'smooth' });
            }
        });
    });
}

// ============================================
// COUNTER ANIMATION
// ============================================
function formatCounter(value, decimal, thousands) {
    var text;
    if (decimal > 0) {
        text = value.toFixed(decimal);
    } else {
        text = String(Math.round(value));
    }
    if (thousands) {
        text = Number(text).toLocaleString('en-US');
    }
    return text;
}

function animateCounters() {
    document.querySelectorAll('.counter').forEach(function(counter) {
        if (counter.__animated) return;
        var target = parseFloat(counter.dataset.target || counter.textContent);
        if (isNaN(target)) target = 0;
        var decimal = parseInt(counter.dataset.decimal || '0', 10);
        var suffix = counter.dataset.suffix || '';
        var thousands = counter.dataset.thousands === 'true' || counter.dataset.thousands === '1';
        var duration = 2000;
        var step = target / (duration / 16);
        var current = 0;
        var timer = setInterval(function() {
            current += step;
            if (current >= target) {
                counter.textContent = formatCounter(target, decimal, thousands) + suffix;
                clearInterval(timer);
            } else {
                counter.textContent = formatCounter(current, decimal, thousands) + suffix;
            }
        }, 16);
    });
}

// ============================================
// FOOTER YEAR
// ============================================
function setFooterYear() {
    document.querySelectorAll('.current-year').forEach(function(el) {
        el.textContent = new Date().getFullYear();
    });
}

// ============================================
// BACK TO TOP
// ============================================
function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function() {
        btn.style.display = window.scrollY > 300 ? 'flex' : 'none';
    });

    btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// TESTIMONIAL SLIDER
// ============================================
var currentTestimonial = 0;
function slideTestimonials(direction) {
    var track = document.querySelector('.testimonial-track');
    if (!track) return;
    var cards = track.querySelectorAll('.testimonial-card');
    var total = cards.length;

    currentTestimonial += direction;
    if (currentTestimonial < 0) currentTestimonial = total - 1;
    if (currentTestimonial >= total) currentTestimonial = 0;

    var cardWidth = cards[0].offsetWidth + 24;
    track.style.transform = 'translateX(-' + (currentTestimonial * cardWidth) + 'px)';
}

// ============================================
// SCROLL SPY - ACTIVE NAV LINK
// ============================================
function initScrollSpy() {
    var sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    window.addEventListener('scroll', function() {
        var scrollPos = window.scrollY + 100;
        sections.forEach(function(section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');
            var link = document.querySelector('.main-navbar a[href="#' + id + '"]');
            if (link) {
                if (scrollPos >= top && scrollPos < top + height) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    });
}

// ============================================
// DASHBOARD SIDEBAR TOGGLE
// ============================================
function toggleDashboardSidebar() {
    var sidebar = document.querySelector('.dashboard-sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

// ============================================
// HOME DROPDOWN ACTIVE STATE
// ============================================
function initHomeDropdownActiveState() {
    function updateDropdownActiveState() {
        var path = window.location.pathname || '';
        var cleanPath = decodeURIComponent(path).replace(/\/+$/, '');
        var currentPage = cleanPath.split('/').pop().toLowerCase();

        var isHome1 = (!currentPage || currentPage === 'index.html' || currentPage === 'index');
        var isHome2 = (currentPage === 'index-2.html' || currentPage === 'index-2');

        var dropdownItems = document.querySelectorAll('.main-navbar .dropdown-menu .dropdown-item, .mobile-menu .dropdown-item');
        dropdownItems.forEach(function(item) {
            var href = (item.getAttribute('href') || '').trim().toLowerCase();
            var targetPage = href.split('/').pop().split('?')[0].split('#')[0];

            if (targetPage === 'index.html' || targetPage === 'index') {
                if (isHome1) {
                    item.classList.add('active');
                    item.setAttribute('aria-current', 'page');
                } else {
                    item.classList.remove('active');
                    item.removeAttribute('aria-current');
                }
            } else if (targetPage === 'index-2.html' || targetPage === 'index-2') {
                if (isHome2) {
                    item.classList.add('active');
                    item.setAttribute('aria-current', 'page');
                } else {
                    item.classList.remove('active');
                    item.removeAttribute('aria-current');
                }
            }
        });

        var homeDropdownToggles = document.querySelectorAll('.main-navbar .nav-item.dropdown > .nav-link.dropdown-toggle');
        homeDropdownToggles.forEach(function(toggle) {
            if (isHome1 || isHome2) {
                toggle.classList.add('active');
            }
        });
    }

    updateDropdownActiveState();

    document.querySelectorAll('.main-navbar .dropdown').forEach(function(dropdown) {
        dropdown.addEventListener('show.bs.dropdown', updateDropdownActiveState);
    });

    window.addEventListener('popstate', updateDropdownActiveState);
    window.addEventListener('hashchange', updateDropdownActiveState);
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initRTL();
    initHomeDropdownActiveState();
    initScrollAnimations();
    initSmoothScroll();
    setFooterYear();
    initBackToTop();

    // Close mobile menu on resize to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991) closeMobileMenu();
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.mobile-menu .nav-link').forEach(function(link) {
        link.addEventListener('click', closeMobileMenu);
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        var navbar = document.querySelector('.main-navbar');
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
    });

    // Counter animation on scroll
    var counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.counter').forEach(function(counter) {
        counterObserver.observe(counter.closest('section') || counter.parentElement || counter);
    });

    // Blog live search input listener
    var blogSearchInput = document.getElementById('blogSearchInput');
    if (blogSearchInput) {
        blogSearchInput.addEventListener('input', function() {
            activeBlogSearchQuery = this.value.trim().toLowerCase();
            applyBlogFilters();
        });
    }

    // Check for category parameter in URL (e.g. from blog detail page)
    if (window.location.search) {
        var urlParams = new URLSearchParams(window.location.search);
        var categoryParam = urlParams.get('category');
        if (categoryParam) {
            filterBlogCategory(categoryParam);
        }
    }
});
