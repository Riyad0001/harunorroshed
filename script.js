// Enhanced JavaScript for Modern Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initNavbarBehavior();
    initScrollAnimations();
    initCounterAnimations();
    initScrollToTop();
    initLoadingAnimation();
    initInteractiveEffects();
    initKeyboardNavigation();
    initPerformanceMonitoring();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enhanced navbar behavior with modern effects
function initNavbarBehavior() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    let isScrollingDown = false;

    if (navbar) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Add scrolled class for background change
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll (optional - can be enabled)
            /*
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
            lastScrollTop = scrollTop;
            */

            // Update active nav link based on scroll position
            updateActiveNavLink(scrollTop);
        });
    }
}

// Update active navigation link based on scroll position
function updateActiveNavLink(scrollTop) {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Advanced scroll animations with staggered effects
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                const delay = index * 100;
                setTimeout(() => {
                    entry.target.classList.add('animate-on-scroll', 'animate');
                }, delay);

                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.stat-card, .skill-card, .project-preview-card, .achievement-card, .experience-item'
    );

    animatedElements.forEach((element, index) => {
        element.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(element);
    });

    // Special animation for hero elements
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    });

    // Add animation classes to hero elements
    const heroElements = document.querySelectorAll('.hero .display-4, .hero .subtitle, .hero .lead');
    heroElements.forEach((element, index) => {
        element.style.animation = `fadeInUp 0.8s ease-out ${index * 0.2}s both`;
        element.style.animationPlayState = 'paused';
        heroObserver.observe(element);
    });
}

// Enhanced counter animations with easing
function initCounterAnimations() {
    const counters = document.querySelectorAll('.counter');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
        let current = 0;
        const increment = target / 100;
        let animationId;

        const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

        const updateCounter = () => {
            current += increment;
            const progress = Math.min(current / target, 1);
            const easedProgress = easeOutQuart(progress);

            counter.textContent = Math.floor(easedProgress * target);

            if (progress < 1) {
                animationId = requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        const counterObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Reset counter
                    current = 0;
                    counter.textContent = '0';

                    // Start animation
                    updateCounter();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counterObserver.observe(counter);
    });
}

// Scroll to top functionality with progress indicator
function initScrollToTop() {
    // Create scroll to top button if it doesn't exist
    let scrollToTopBtn = document.querySelector('.scroll-to-top');

    if (!scrollToTopBtn) {
        scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollToTopBtn);
    }

    // Add scroll progress indicator
    const progressRing = document.createElement('div');
    progressRing.className = 'scroll-progress';
    scrollToTopBtn.appendChild(progressRing);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        if (scrollTop > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }

        // Update progress ring
        progressRing.style.background = `conic-gradient(var(--primary-color) ${scrollPercent}%, transparent ${scrollPercent}%)`;
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Loading animation
function initLoadingAnimation() {
    document.body.classList.add('loading');

    // Remove loading class after initial animations
    setTimeout(() => {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
    }, 100);
}

// Interactive effects and micro-animations
function initInteractiveEffects() {
    // Button click effects
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn')) {
            e.target.style.transform = 'scale(0.98)';
            setTimeout(() => {
                e.target.style.transform = '';
            }, 150);
        }
    });

    // Card hover effects enhancement
    const cards = document.querySelectorAll('.stat-card, .skill-card, .project-preview-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Magnetic effect for social links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Typing effect for hero subtitle (optional)
    const subtitle = document.querySelector('.hero .subtitle');
    if (subtitle && subtitle.textContent) {
        const originalText = subtitle.textContent;
        subtitle.textContent = '';
        let i = 0;

        const typeWriter = () => {
            if (i < originalText.length) {
                subtitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };

        // Start typing effect after hero is visible
        const heroObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriter, 1000);
                    heroObserver.unobserve(entry.target);
                }
            });
        });
        heroObserver.observe(subtitle);
    }
}

// Keyboard navigation support
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC key to close modals
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal.show');
            modals.forEach(modal => {
                const bsModal = bootstrap.Modal.getInstance(modal);
                if (bsModal) bsModal.hide();
            });
        }

        // Tab navigation improvements
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    // Remove keyboard navigation class on mouse usage
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Performance monitoring and optimization
function initPerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.loadEventStart;

            console.log(`🚀 Portfolio loaded in ${loadTime.toFixed(2)}ms`);

            // Send analytics if needed
            if (typeof gtag !== 'undefined') {
                gtag('event', 'page_load_time', {
                    event_category: 'performance',
                    event_label: 'portfolio',
                    value: Math.round(loadTime)
                });
            }
        });
    }

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add CSS for scroll to top button and progress indicator
const style = document.createElement('style');
style.textContent = `
    .scroll-to-top {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 3rem;
        height: 3rem;
        background: var(--gradient-primary);
        color: var(--white);
        border: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);
        z-index: 1000;
    }

    .scroll-to-top.show {
        opacity: 1;
        transform: translateY(0);
    }

    .scroll-to-top:hover {
        transform: translateY(-2px) scale(1.1);
        box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
    }

    .scroll-progress {
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        border-radius: 50%;
        background: conic-gradient(var(--primary-color) 0%, transparent 0%);
        transition: background 0.3s ease;
        z-index: -1;
    }

    .keyboard-navigation .btn:focus,
    .keyboard-navigation .nav-link:focus {
        outline: 3px solid var(--primary-color);
        outline-offset: 2px;
    }

    @media (max-width: 768px) {
        .scroll-to-top {
            bottom: 1rem;
            right: 1rem;
            width: 2.5rem;
            height: 2.5rem;
        }
    }
`;
document.head.appendChild(style);

// Add loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body.loading * {
        animation-play-state: paused !important;
    }

    body.loaded * {
        animation-play-state: running !important;
    }
`;
document.head.appendChild(loadingStyle);