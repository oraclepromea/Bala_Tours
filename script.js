// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Add null checks for navigation elements
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 25px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }
});

// Tab functionality for itineraries
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Add active class to clicked button
                button.classList.add('active');

                // Show corresponding content
                const targetTab = button.getAttribute('data-tab');
                const targetContent = document.getElementById(targetTab);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }
});

// Booking form handling - Add null check
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const bookingData = {};
        
        formData.forEach((value, key) => {
            bookingData[key] = value;
        });
        
        // Basic validation
        if (!bookingData.name || !bookingData.email || !bookingData.tour || !bookingData['group-size']) {
            alert('Please fill in all required fields marked with *');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(bookingData.email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('.submit-btn');
        if (submitBtn) {
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Request...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual backend integration)
            setTimeout(() => {
                // Create mailto link for now (until backend is set up)
                const subject = encodeURIComponent(`Tour Booking Request - ${bookingData.tour}`);
                const body = encodeURIComponent(`
Dear Bala Tours,

I would like to request a quote and check availability for the following tour:

Name: ${bookingData.name}
Email: ${bookingData.email}
Phone: ${bookingData.phone || 'Not provided'}
Tour Package: ${bookingData.tour}
Preferred Start Date: ${bookingData['preferred-date'] || 'Flexible'}
Group Size: ${bookingData['group-size']} people
Special Requests: ${bookingData['special-requests'] || 'None'}

Please contact me with availability and final pricing.

Best regards,
${bookingData.name}
                `);
                
                window.location.href = `mailto:balatours@yahoo.com?subject=${subject}&body=${body}`;
                
                // Reset form
                this.reset();
                
                // Show success message
                const successDiv = document.createElement('div');
                successDiv.className = 'success-message';
                successDiv.style.cssText = `
                    background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 10px;
                    margin-top: 1rem;
                    text-align: center;
                    font-weight: 600;
                    animation: fadeInUp 0.5s ease;
                `;
                successDiv.innerHTML = '<i class="fas fa-check-circle"></i> Request sent! We\'ll respond within 24 hours.';
                
                this.appendChild(successDiv);
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successDiv.remove();
                }, 5000);
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply scroll animations to elements
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.feature, .service-card, .destination-card, .tour-card, .testimonial-card, .trust-card, .ecolodge-card'
    );
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Gallery hover effects
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.querySelector('img').style.filter = 'brightness(0.7)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.querySelector('img').style.filter = 'brightness(1)';
    });
});

// Counter animation for stats (if you want to add them later)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Enhanced icon loading check with improved fallback system
function checkAndFixIcons() {
    setTimeout(() => {
        // Check if Font Awesome loaded properly first
        const testEl = document.createElement('i');
        testEl.className = 'fas fa-home';
        testEl.style.cssText = 'position: absolute; left: -9999px; font-size: 16px;';
        document.body.appendChild(testEl);
        
        setTimeout(() => {
            const computedStyle = window.getComputedStyle(testEl, ':before');
            const content = computedStyle.getPropertyValue('content');
            const fontFamily = computedStyle.getPropertyValue('font-family');
            
            document.body.removeChild(testEl);
            
            // Enhanced check for Font Awesome loading
            const isFontAwesomeLoaded = content !== 'none' && 
                                      content !== '' && 
                                      (fontFamily.includes('Font Awesome') || 
                                       content.charCodeAt(0) > 61440);
            
            if (!isFontAwesomeLoaded) {
                console.log('Font Awesome not detected, activating comprehensive fallbacks');
                document.body.classList.add('fa-fallback');
                
                // Apply specific fallbacks for critical icons
                const criticalIcons = document.querySelectorAll('.fab, .fas, .far, .fa');
                criticalIcons.forEach(icon => {
                    const parentLink = icon.closest('a');
                    const iconClasses = icon.className;
                    
                    // Enhanced fallback system for social media icons
                    if (parentLink) {
                        if (parentLink.href.includes('facebook')) {
                            icon.textContent = 'f';
                            icon.style.cssText = 'background: #1877f2; color: white; padding: 4px 8px; border-radius: 3px; font-weight: bold; font-family: sans-serif !important; text-decoration: none;';
                        } else if (parentLink.href.includes('whatsapp') || parentLink.href.includes('wa.me')) {
                            icon.textContent = 'W';
                            icon.style.cssText = 'background: #25d366; color: white; padding: 4px 8px; border-radius: 3px; font-weight: bold; font-family: sans-serif !important; text-decoration: none;';
                        } else if (parentLink.href.includes('tripadvisor')) {
                            icon.textContent = 'T';
                            icon.style.cssText = 'background: #00cc66; color: white; padding: 4px 8px; border-radius: 3px; font-weight: bold; font-family: sans-serif !important; text-decoration: none;';
                        }
                    }
                    
                    // Fallbacks for common functional icons
                    if (iconClasses.includes('fa-phone')) {
                        icon.textContent = '📞';
                        icon.style.fontFamily = 'sans-serif';
                    } else if (iconClasses.includes('fa-envelope')) {
                        icon.textContent = '✉';
                        icon.style.fontFamily = 'sans-serif';
                    } else if (iconClasses.includes('fa-clock')) {
                        icon.textContent = '🕐';
                        icon.style.fontFamily = 'sans-serif';
                    } else if (iconClasses.includes('fa-map-marker') || iconClasses.includes('fa-map-marked')) {
                        icon.textContent = '📍';
                        icon.style.fontFamily = 'sans-serif';
                    } else if (iconClasses.includes('fa-users')) {
                        icon.textContent = '👥';
                        icon.style.fontFamily = 'sans-serif';
                    } else if (iconClasses.includes('fa-certificate')) {
                        icon.textContent = '🏆';
                        icon.style.fontFamily = 'sans-serif';
                    } else if (iconClasses.includes('fa-shield')) {
                        icon.textContent = '🛡';
                        icon.style.fontFamily = 'sans-serif';
                    } else if (iconClasses.includes('fa-leaf')) {
                        icon.textContent = '🌿';
                        icon.style.fontFamily = 'sans-serif';
                    } else if (iconClasses.includes('fa-star')) {
                        icon.textContent = '⭐';
                        icon.style.fontFamily = 'sans-serif';
                    } else if (iconClasses.includes('fa-info')) {
                        icon.textContent = 'ℹ';
                        icon.style.fontFamily = 'sans-serif';
                    }
                });
            } else {
                console.log('Font Awesome loaded successfully');
            }
        }, 300);
    }, 1000);
}

// Enhanced WhatsApp button with better fallback
function addWhatsAppButton() {
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/59171245281?text=Hello! I\'m interested in booking a tour with Bala Tours.';
    whatsappBtn.target = '_blank';
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    
    // Enhanced styling with fallback
    whatsappBtn.style.cssText = `
        position: fixed !important;
        width: 60px !important;
        height: 60px !important;
        bottom: 20px !important;
        right: 20px !important;
        background: #25d366 !important;
        color: white !important;
        border-radius: 50% !important;
        text-align: center !important;
        font-size: 30px !important;
        box-shadow: 2px 2px 10px rgba(0,0,0,0.2) !important;
        z-index: 1000 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        text-decoration: none !important;
        transition: all 0.3s ease !important;
        animation: pulse 2s infinite !important;
        font-family: 'Font Awesome 6 Brands', 'Font Awesome 5 Brands', sans-serif !important;
    `;
    
    // Add hover effect
    whatsappBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '2px 2px 15px rgba(0,0,0,0.3)';
    });
    
    whatsappBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '2px 2px 10px rgba(0,0,0,0.2)';
    });
    
    // Fallback icon check
    setTimeout(() => {
        const iconEl = whatsappBtn.querySelector('i');
        const computedStyle = window.getComputedStyle(iconEl, ':before');
        const content = computedStyle.getPropertyValue('content');
        
        if (content === 'none' || content === '' || content === '"\\f232"') {
            // Font Awesome not working, use text fallback
            whatsappBtn.innerHTML = '<span style="font-weight: bold; font-size: 24px;">W</span>';
            whatsappBtn.style.background = '#25d366';
            whatsappBtn.title = 'Contact us on WhatsApp';
        }
    }, 1000);
    
    document.body.appendChild(whatsappBtn);
    
    // Add pulse animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        /* Enhanced icon fallbacks */
        .fab.fa-whatsapp:before {
            content: "\\f232" !important;
            font-family: 'Font Awesome 6 Brands', 'Font Awesome 5 Brands', sans-serif !important;
        }
        
        .fab.fa-facebook-f:before {
            content: "\\f39e" !important;
            font-family: 'Font Awesome 6 Brands', 'Font Awesome 5 Brands', sans-serif !important;
        }
        
        /* Fallback for social media icons if Font Awesome completely fails */
        .footer-social-link, .social-link {
            position: relative;
        }
        
        .footer-social-link:before, .social-link:before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 20px;
            height: 20px;
            border-radius: 3px;
            color: white;
            font-weight: bold;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: -1;
        }
        
        .facebook .fab.fa-facebook-f {
            font-family: 'Font Awesome 6 Brands', 'Font Awesome 5 Brands', sans-serif !important;
        }
        
        .whatsapp .fab.fa-whatsapp {
            font-family: 'Font Awesome 6 Brands', 'Font Awesome 5 Brands', sans-serif !important;
        }
    `;
    document.head.appendChild(style);

    // Enhanced icon fallback CSS for better compatibility
    const enhancedIconCSS = `
        /* Enhanced Font Awesome fallback system */
        .fab.fa-whatsapp:before {
            content: "\\f232" !important;
            font-family: 'Font Awesome 6 Brands', 'Font Awesome 5 Brands', 'Font Awesome 6 Free', 'Font Awesome 5 Free', sans-serif !important;
        }
        
        .fab.fa-facebook-f:before {
            content: "\\f39e" !important;
            font-family: 'Font Awesome 6 Brands', 'Font Awesome 5 Brands', 'Font Awesome 6 Free', 'Font Awesome 5 Free', sans-serif !important;
        }
        
        .fas.fa-map-marked-alt:before {
            content: "\\f3c5" !important;
            font-family: 'Font Awesome 6 Free', 'Font Awesome 5 Free', sans-serif !important;
        }
        
        /* Enhanced fallback for when Font Awesome completely fails */
        .fa-fallback .footer-social-link, 
        .fa-fallback .social-link {
            position: relative;
            overflow: visible;
        }
        
        .fa-fallback .footer-social-link i, 
        .fa-fallback .social-link i {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
            font-weight: bold !important;
            display: inline-block !important;
            width: auto !important;
            text-align: center !important;
            line-height: 1 !important;
        }
        
        /* Specific styling for floating WhatsApp button fallback */
        .fa-fallback .whatsapp-float i {
            font-size: 24px !important;
            font-weight: bold !important;
        }
        
        /* Enhanced social media icon backgrounds for better visibility */
        .fa-fallback .social-link.facebook i,
        .fa-fallback .footer-social-link[href*="facebook"] i {
            background: #1877f2 !important;
            color: white !important;
            padding: 2px 6px !important;
            border-radius: 3px !important;
        }
        
        .fa-fallback .social-link.whatsapp i,
        .fa-fallback .footer-social-link[href*="whatsapp"] i,
        .fa-fallback .footer-social-link[href*="wa.me"] i {
            background: #25d366 !important;
            color: white !important;
            padding: 2px 6px !important;
            border-radius: 3px !important;
        }
        
        .fa-fallback .social-link.tripadvisor i,
        .fa-fallback .footer-social-link[href*="tripadvisor"] i {
            background: #00cc66 !important;
            color: white !important;
            padding: 2px 6px !important;
            border-radius: 3px !important;
        }
    `;
    
    // Apply enhanced CSS
    const enhancedStyle = document.createElement('style');
    enhancedStyle.textContent = enhancedIconCSS;
    document.head.appendChild(enhancedStyle);
}

// Enhanced icon loading check
function checkAndFixIcons() {
    setTimeout(() => {
        // Check all social media icons
        const socialIcons = document.querySelectorAll('.fab, .fas');
        socialIcons.forEach(icon => {
            const computedStyle = window.getComputedStyle(icon, ':before');
            const content = computedStyle.getPropertyValue('content');
            const fontFamily = computedStyle.getPropertyValue('font-family');
            
            // If icon is not loading properly
            if (content === 'none' || content === '' || !fontFamily.includes('Font Awesome')) {
                const parentLink = icon.closest('a');
                if (parentLink) {
                    // Add text fallback based on the link
                    if (parentLink.href.includes('facebook')) {
                        icon.style.display = 'none';
                        const fallback = document.createElement('span');
                        fallback.textContent = 'f';
                        fallback.style.cssText = 'background: #1877f2; color: white; padding: 4px 8px; border-radius: 3px; font-weight: bold;';
                        icon.parentNode.insertBefore(fallback, icon);
                    } else if (parentLink.href.includes('whatsapp') || parentLink.href.includes('wa.me')) {
                        icon.style.display = 'none';
                        const fallback = document.createElement('span');
                        fallback.textContent = 'W';
                        fallback.style.cssText = 'background: #25d366; color: white; padding: 4px 8px; border-radius: 3px; font-weight: bold;';
                        icon.parentNode.insertBefore(fallback, icon);
                    } else if (parentLink.href.includes('tripadvisor')) {
                        icon.style.display = 'none';
                        const fallback = document.createElement('span');
                        fallback.textContent = 'T';
                        fallback.style.cssText = 'background: #00cc66; color: white; padding: 4px 8px; border-radius: 3px; font-weight: bold;';
                        icon.parentNode.insertBefore(fallback, icon);
                    }
                }
            }
        });
    }, 2000);
}

// Initialize WhatsApp button
document.addEventListener('DOMContentLoaded', addWhatsAppButton);

// Add booking modal functionality
function createBookingModal() {
    const modal = document.createElement('div');
    modal.className = 'booking-modal';
    modal.style.cssText = `
        display: none;
        position: fixed;
        z-index: 2000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        backdrop-filter: blur(5px);
    `;
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.cssText = `
        background: white;
        margin: 5% auto;
        padding: 0;
        border-radius: 15px;
        width: 90%;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        animation: modalSlideIn 0.3s ease;
    `;
    
    modalContent.innerHTML = `
        <div class="modal-header" style="background: linear-gradient(135deg, #2d7a2d 0%, #1a5a1a 100%); color: white; padding: 2rem; border-radius: 15px 15px 0 0;">
            <h3 style="margin: 0; font-size: 1.5rem;">Quick Booking</h3>
            <span class="close" style="position: absolute; right: 1.5rem; top: 1.5rem; font-size: 2rem; cursor: pointer; color: white; opacity: 0.8;">&times;</span>
        </div>
        <div class="modal-body" style="padding: 2rem;">
            <p style="color: #666; margin-bottom: 2rem; text-align: center;">Fill out this form and we'll get back to you within 24 hours with availability and pricing.</p>
            ${document.querySelector('.contact-form').innerHTML}
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    return modal;
}

// Add modal CSS animation
const modalStyle = document.createElement('style');
modalStyle.textContent = `
    @keyframes modalSlideIn {
        from {
            transform: translateY(-50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(modalStyle);

// Form input enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Set minimum date to today for date inputs
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInputs.forEach(input => {
        input.setAttribute('min', today);
    });
    
    // Add focus effects to form inputs
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
});

// Add price calculator
function calculateTourPrice(tour, groupSize, duration) {
    const basePrices = {
        'madidi-1day': 120,
        'madidi-2day': 200,
        'madidi-3day': 280,
        'pampas-2day': 180,
        'pampas-3day': 260,
        'pampas-4day': 340,
        'combined-5day': 440,
        'combined-6day': 520,
        'specialized': 320
    };
    
    let basePrice = basePrices[tour] || 0;
    let total = basePrice * parseInt(groupSize);
    
    // Group discounts
    if (groupSize >= 4) {
        total = total * 0.9; // 10% discount for 4+ people
    } else if (groupSize >= 6) {
        total = total * 0.85; // 15% discount for 6+ people
    }
    
    return total;
}

// Live price update on form change
document.addEventListener('change', function(e) {
    if (e.target.name === 'tour' || e.target.name === 'group-size') {
        const form = e.target.closest('form');
        const tourSelect = form.querySelector('select[name="tour"]');
        const groupSelect = form.querySelector('select[name="group-size"]');
        
        if (tourSelect.value && groupSelect.value) {
            const price = calculateTourPrice(tourSelect.value, groupSelect.value);
            
            // Show estimated price
            let priceDisplay = form.querySelector('.price-estimate');
            if (!priceDisplay) {
                priceDisplay = document.createElement('div');
                priceDisplay.className = 'price-estimate';
                priceDisplay.style.cssText = `
                    background: linear-gradient(135deg, #e67e22 0%, #d35400 100%);
                    color: white;
                    padding: 1rem;
                    border-radius: 10px;
                    text-align: center;
                    margin: 1rem 0;
                    font-weight: 600;
                `;
                form.insertBefore(priceDisplay, form.querySelector('.submit-btn'));
            }
            
            priceDisplay.innerHTML = `
                <i class="fas fa-calculator"></i>
                Estimated Total: $${price.toFixed(0)} USD
                <small style="display: block; opacity: 0.9; font-size: 0.9rem; margin-top: 0.5rem;">
                    Final price confirmed upon booking
                </small>
            `;
        }
    }
});

// Language Translation System for Bala Tours
class LanguageManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('bala-tours-language') || 'en';
        this.translations = {
            en: {
                // Navigation
                'nav-home': 'Home',
                'nav-about': 'About',
                'nav-tours': 'Tours',
                'nav-ecolodges': 'Ecolodges',
                'nav-wildlife': 'Wildlife',
                'nav-contact': 'Contact',

                // Hero Section
                'hero-title': 'Discover the Amazon with Bala Tours',
                'hero-subtitle': 'Authentic jungle experiences in the heart of Bolivia',
                'hero-tagline': 'Expert local guides • Sustainable tourism • Unforgettable wildlife encounters',
                'hero-btn-tours': 'Explore Tours',
                'hero-btn-contact': 'Contact Us',

                // About Section
                'about-title': 'About Bala Tours',
                'about-subtitle': 'Your trusted partner for authentic Amazon experiences',
                'about-intro-title': 'Welcome to the Heart of the Amazon',
                'about-intro-text': 'Bala Tours has been leading extraordinary jungle expeditions in the Bolivian Amazon for over a decade. We are a family-run business committed to providing authentic, sustainable, and safe wildlife experiences that connect you with the incredible biodiversity of the Pampas and Madidi National Park.',
                'about-mission-text': 'Our mission is to share the wonders of the Amazon while supporting local communities and conservation efforts. Every tour is carefully designed to maximize wildlife encounters while minimizing environmental impact.',
                'about-image-caption': 'Our experienced team of local guides and nature experts',

                // Features
                'feature-expert-title': 'Expert Local Guides',
                'feature-expert-text': 'Our experienced guides are born and raised in the Amazon, with deep knowledge of wildlife behavior and jungle survival.',
                'feature-safety-title': 'Safety First',
                'feature-safety-text': 'All tours include safety equipment, first aid kits, and our guides are certified in wilderness first aid.',
                'feature-sustainable-title': 'Sustainable Tourism',
                'feature-sustainable-text': 'We work closely with local communities to ensure our tours benefit both visitors and the environment.',

                // Trust & Safety Section
                'trust-title': 'Trust & Safety',
                'trust-subtitle': 'Your safety and satisfaction are our top priorities',
                'trust-certified-title': 'Certified & Licensed',
                'trust-certified-text': 'Officially licensed tour operator with all required permits and certifications.',
                'trust-local-title': 'Local Expertise',
                'trust-local-text': 'Born and raised in the Amazon, our guides have unparalleled knowledge of the region.',
                'trust-safety-title': 'Safety Equipment',
                'trust-safety-text': 'Professional safety equipment and protocols ensure your security throughout the adventure.',
                'guarantee-title': '100% Satisfaction Guarantee',
                'guarantee-text': 'We stand behind every tour. If you\'re not completely satisfied, we\'ll make it right.',

                // Tours Section
                'tours-title': 'Our Tours',
                'tours-subtitle': 'Choose your perfect Amazon adventure',
                'tour-highlights': 'Tour Highlights',
                'tour-duration': 'Duration',
                'tour-difficulty': 'Difficulty',
                'tour-group-size': 'Group Size',
                'tour-includes': 'Includes',
                'tour-whatsapp': 'Book via WhatsApp',

                // Contact Section
                'contact-title': 'Contact Us',
                'contact-subtitle': 'Ready to start your Amazon adventure?',
                'contact-phone': 'Phone / WhatsApp',
                'contact-email': 'Email',
                'contact-address': 'Address',
                'contact-hours': 'Office Hours',
                'contact-hours-detail': 'Monday to Sunday: 8:00 AM - 8:00 PM',
                'contact-location': 'Our Location',
                'contact-location-detail': 'Located in the heart of Rurrenabaque, Bolivia',
                'contact-whatsapp-btn': 'Message us on WhatsApp',
                'contact-booking': 'Quick Booking',
                'contact-booking-text': 'Send us a message on WhatsApp for instant booking and tour information.',
                'contact-booking-steps': 'How to Book',
                'contact-step1': 'Send us a WhatsApp message',
                'contact-step2': 'Tell us your preferred dates and tour',
                'contact-step3': 'Receive confirmation and payment details',
                'contact-step4': 'Enjoy your Amazon adventure!',
                'language-toggle-title': 'Choose Language',

                // Wildlife Gallery Section - English
                'wildlife-title': 'Amazing Wildlife',
                'wildlife-subtitle': 'Discover the incredible biodiversity of the Amazon',
                'wildlife-dolphins-title': 'Pink River Dolphins',
                'wildlife-dolphins-desc': 'Swim with these amazing creatures in the pristine waters of Pampas del Yacuma. These intelligent mammals are unique to the Amazon basin.',
                'wildlife-macaws-title': 'Colorful Macaws',
                'wildlife-macaws-desc': 'Observe the rare and endemic Blue-throated Macaw, found only in Bolivia. This endangered species is a highlight for birdwatchers.',
                'wildlife-capybaras-title': 'Friendly Capybaras',
                'wildlife-capybaras-desc': 'Meet the world\'s largest rodents in their natural habitat. These gentle giants are often seen lounging by the riverbanks.',
                'wildlife-caimans-title': 'Spectacular Caimans',
                'wildlife-caimans-desc': 'Spot these impressive reptiles during night excursions. Our guides will safely show you caimans in their natural environment.',
                'wildlife-howler-title': 'Howler Monkeys',
                'wildlife-howler-desc': 'Listen to the distinctive calls of howler monkeys echoing through the jungle canopy. These primates are among the loudest animals in the world.',
                'wildlife-sloths-title': 'Three-Toed Sloths',
                'wildlife-sloths-desc': 'Discover these slow-moving marvels hanging in the rainforest canopy. Sloths are masters of camouflage and energy conservation.',
                'wildlife-baby-monkeys-title': 'Baby Monkeys with Families',
                'wildlife-baby-monkeys-desc': 'Witness heartwarming moments of monkey families in their natural habitat. Baby monkeys learning from their mothers.',
                'wildlife-kingfisher-title': 'Vibrant Kingfishers',
                'wildlife-kingfisher-desc': 'Watch these colorful birds dive for fish along the riverbanks. The Amazon is home to multiple species of these beautiful fishing birds.',
                'wildlife-butterflies-title': 'Exotic Butterflies',
                'wildlife-butterflies-desc': 'Marvel at the incredible diversity of butterflies in the Amazon. From tiny jewel-like species to large morpho butterflies.',
                'wildlife-hawks-title': 'Majestic Birds of Prey',
                'wildlife-hawks-desc': 'Spot impressive hawks and other raptors soaring above the Amazon canopy. These skilled hunters are essential to the ecosystem.',
                'wildlife-piranhas-title': 'Legendary Piranhas',
                'wildlife-piranhas-desc': 'Try your hand at piranha fishing in the Amazon waters. Despite their reputation, these fish are fascinating creatures.',
                'wildlife-frogs-title': 'Colorful Tree Frogs',
                'wildlife-frogs-desc': 'Discover the amazing variety of frogs in the Amazon rainforest. From tiny poison dart frogs to larger tree frogs.',
                'wildlife-turtles-title': 'Ancient River Turtles',
                'wildlife-turtles-desc': 'Encounter these prehistoric creatures sunning themselves on logs and riverbanks. Some turtle species can live for over 100 years.',
                'wildlife-tarantulas-title': 'Amazonian Tarantulas',
                'wildlife-tarantulas-desc': 'For the brave-hearted, observe these impressive spiders in their natural habitat. Tarantulas play an important role in controlling insects.',
                'wildlife-capuchin-title': 'Intelligent Capuchin Monkeys',
                'wildlife-capuchin-desc': 'Watch these clever primates use tools and solve problems in the wild. Capuchin monkeys are among the most intelligent animals.',
                'wildlife-exotic-birds-title': 'Spectacular Exotic Birds',
                'wildlife-exotic-birds-desc': 'The Amazon is home to over 1,300 bird species. From tiny hummingbirds to magnificent toucans, the diversity is breathtaking.',

                // Certifications
                'cert-licensed': 'Licensed Tour Operator',
                'cert-safety': 'Safety Certified Guides',
                'cert-community': 'Community Partnership Program',

                // Ecolodges Section
                'ecolodges-title': 'Our Ecolodges',
                'ecolodges-subtitle': 'Comfortable accommodation in harmony with nature',
                'ecolodge-pampas-title': 'Caracoles Ecolodge',
                'ecolodge-pampas-location': 'Santa Rosa, Pampas',
                'ecolodge-pampas-description': 'Rustic wooden lodge on stilts overlooking the Yacuma River, designed to blend harmoniously with the wetland environment.',
                'ecolodge-madidi-title': 'Tacuaral Ecolodge',
                'ecolodge-madidi-location': 'Madidi National Park',
                'ecolodge-madidi-description': 'Eco-friendly lodge deep in the rainforest, built with sustainable materials and powered by solar energy.',
                'feature-beds': 'Comfortable beds with mosquito nets',
                'feature-bathroom': 'Shared bathroom facilities',
                'feature-meals': 'Delicious local cuisine',
                'feature-terrace': 'River view terrace',
                'feature-solar': 'Solar power',
                'feature-sustainable': 'Sustainable construction',
                'feature-wildlife': 'Wildlife viewing deck',
                'feature-guides': 'On-site naturalist guides',

                // Tour Details
                'madidi-title': 'Madidi Jungle Expedition',
                'madidi-badge': 'Adventure',
                'madidi-description': 'Explore one of the world\'s most biodiverse national parks with pristine rainforest, exotic wildlife, and indigenous communities.',
                'madidi-highlight1': 'Pristine rainforest exploration',
                'madidi-highlight2': 'Exotic bird and mammal spotting',
                'madidi-highlight3': 'Indigenous community visits',
                'madidi-highlight4': 'Canopy walks and river trails',
                'madidi-highlight5': 'Medicinal plant workshops',
                'madidi-highlight6': 'Night jungle sounds tour',
                'madidi-duration': '4 Days / 3 Nights',
                'madidi-difficulty': 'Moderate to Challenging',
                'madidi-group': 'Up to 6 people',
                'madidi-includes': 'Transportation, eco-lodge, all meals, guide, activities',
                'madidi-price': 'From $280 USD per person',

                'pampas-badge': 'Most Popular',
                'pampas-title': 'Pampas Wildlife Adventure',
                'pampas-description': 'Experience the incredible biodiversity of the Pampas wetlands, home to pink dolphins, caimans, capybaras, and hundreds of bird species.',
                'pampas-highlight1': 'Pink river dolphin encounters',
                'pampas-highlight2': 'Caiman spotting at night',
                'pampas-highlight3': 'Piranha fishing adventure',
                'pampas-highlight4': 'Capybara and monkey sightings',
                'pampas-highlight5': 'Spectacular bird watching',
                'pampas-highlight6': 'Sunset boat tours',
                'pampas-duration': '3 Days / 2 Nights',
                'pampas-difficulty': 'Easy to Moderate',
                'pampas-group': 'Up to 8 people',
                'pampas-includes': 'Transportation, accommodation, all meals, guide, activities',
                'pampas-price': 'From $180 USD per person',

                'combined-badge': 'Best Value',
                'combined-title': 'Complete Amazon Experience',
                'combined-description': 'The ultimate Amazon adventure combining the wildlife-rich Pampas with the pristine rainforest of Madidi National Park.',
                'combined-highlight1': 'Best of both ecosystems',
                'combined-highlight2': 'Maximum wildlife diversity',
                'combined-highlight3': 'Pampas wetlands exploration',
                'combined-highlight4': 'Madidi rainforest trekking',
                'combined-highlight5': 'Cultural community interactions',
                'combined-highlight6': 'Professional photography opportunities',
                'combined-duration': '6 Days / 5 Nights',
                'combined-difficulty': 'Moderate',
                'combined-group': 'Up to 8 people',
                'combined-includes': 'All transportation, accommodations, meals, guides, activities',
                'combined-price': 'From $420 USD per person',

                // Pricing Section
                'pricing-title': 'Tour Pricing & Inclusions',
                'pricing-subtitle': 'Transparent pricing with everything you need to know',
                'pricing-madidi-title': 'Madidi Jungle Tours',
                'pricing-pampas-title': 'Pampas Wildlife Tours',
                'pricing-combined-title': 'Combined Tours',
                'pricing-most-popular': 'Most Popular',
                'pricing-whats-included': 'What\'s Included',
                'pricing-madidi-transport': 'Transportation by boat to/from Tacuaral Ecolodge',
                'pricing-guide': 'Professional local guide (English/Spanish)',
                'pricing-meals': 'All meals during the tour',
                'pricing-madidi-accommodation': 'Accommodation at Tacuaral Ecolodge',
                'pricing-madidi-walks': 'Guided jungle walks and wildlife observation',
                'pricing-madidi-macaw': 'Visit to Caquiahuara macaw clay-lick',
                'pricing-madidi-night': 'Night jungle experiences',
                'pricing-madidi-plants': 'Medicinal plant demonstrations',
                'pricing-book-madidi': 'Book Madidi Tour',
                'pricing-pampas-transport': '4WD transportation to/from Caracoles Ecolodge',
                'pricing-pampas-accommodation': 'Accommodation at Caracoles Ecolodge',
                'pricing-pampas-boat': 'Boat excursions on Yacuma River',
                'pricing-pampas-dolphins': 'Swimming with pink dolphins',
                'pricing-pampas-fishing': 'Piranha fishing experience',
                'pricing-pampas-anaconda': 'Anaconda and caiman searching',
                'pricing-pampas-birds': 'Birdwatching (Blue-throated Macaw)',
                'pricing-book-pampas': 'Book Pampas Tour',
                'pricing-combined-transport': 'All transportation (boat & 4WD)',
                'pricing-combined-guides': 'Professional guides for both ecosystems',
                'pricing-combined-meals': 'All meals throughout the tour',
                'pricing-combined-accommodation': 'Accommodation at both ecolodges',
                'pricing-combined-experiences': 'Complete jungle and pampas experiences',
                'pricing-combined-macaw': 'Macaw clay-lick observation',
                'pricing-combined-community': 'Cultural community visits',
                'pricing-combined-night': 'Night wildlife experiences',
                'pricing-book-combined': 'Book Combined Tour',
                'pricing-not-included': 'Not Included',
                'pricing-not-transport': 'Transportation to/from Rurrenabaque',
                'pricing-not-fees': 'Park entrance fees (approx. $15 USD)',
                'pricing-not-equipment': 'Personal equipment (binoculars, camera)',
                'pricing-not-insurance': 'Travel insurance',
                'pricing-not-alcohol': 'Alcoholic beverages',
                'pricing-not-tips': 'Tips for guides (appreciated but not required)',
                'pricing-not-personal': 'Personal expenses and souvenirs',
                'pricing-booking-terms': 'Booking Terms',
                'pricing-deposit': '<strong>Deposit:</strong> 30% required to confirm reservation',
                'pricing-payment': '<strong>Payment:</strong> Cash (USD or Bolivianos) preferred',
                'pricing-cancellation': '<strong>Cancellation:</strong> 48 hours notice for refund',
                'pricing-group-size': '<strong>Group Size:</strong> Minimum 2, Maximum 6 people',
                'pricing-age-limit': '<strong>Age Limit:</strong> Suitable for ages 8-70',
                'pricing-season': '<strong>Season:</strong> Tours available year-round',
                'pricing-weather': '<strong>Weather:</strong> Tours operate rain or shine',

                // Policies Section
                'policies-title': 'Policies',
                'policy-reservations-title': 'Reservations & Payments',
                'policy-reservations-text': 'The reservations carried out through operators of tourism or travel agencies will be requested with an advance of 7 days before the beginning of the trip. Once confirmed the space readiness for the date and the required tour, the client should send to Bala Tours, through fax or electronic mail, the reservation form.',
                'policy-cancellations-title': 'Cancellations & Refunds',
                'policy-cancellations-text': 'The cancellation of a hired service should be notified in written form. If the cancellation is made after the total payment by the hired service, the percentage of retentions to apply arises of the following scale:',
                'policy-cancellation-2days': '2 days before the tour: <strong>50%</strong>',
                'policy-cancellation-sameday': 'The same day of the tour: <strong>100%</strong>',
                'policy-insurance-title': 'Insurance',
                'policy-insurance-text': 'It is the same tourists\' responsibility the recruiting of insurance of trip or against accidents, as well as to carry the necessary documentation at the moment of the trip.',
            },
            es: {
                // Navigation
                'nav-home': 'Inicio',
                'nav-about': 'Nosotros',
                'nav-tours': 'Tours',
                'nav-ecolodges': 'Ecolodges',
                'nav-wildlife': 'Vida Silvestre',
                'nav-contact': 'Contacto',

                // Hero Section
                'hero-title': 'Descubre la Amazonía con Bala Tours',
                'hero-subtitle': 'Experiencias auténticas en la selva del corazón de Bolivia',
                'hero-tagline': 'Guías locales expertos • Turismo sostenible • Encuentros inolvidables con la vida silvestre',
                'hero-btn-tours': 'Explorar Tours',
                'hero-btn-contact': 'Contáctanos',

                // About Section
                'about-title': 'Acerca de Bala Tours',
                'about-subtitle': 'Tu socio de confianza para experiencias auténticas en la Amazonía',
                'about-intro-title': 'Bienvenidos al Corazón de la Amazonía',
                'about-intro-text': 'Bala Tours ha estado liderando expediciones extraordinarias en la selva amazónica boliviana por más de una década. Somos un negocio familiar comprometido con brindar experiencias auténticas, sostenibles y seguras que te conectan con la increíble biodiversidad de los Pampas y el Parque Nacional Madidi.',
                'about-mission-text': 'Nuestra misión es compartir las maravillas de la Amazonía mientras apoyamos a las comunidades locales y los esfuerzos de conservación. Cada tour está cuidadosamente diseñado para maximizar los encuentros con la vida silvestre mientras minimizamos el impacto ambiental.',
                'about-image-caption': 'Nuestro equipo experimentado de guías locales y expertos en naturaleza',

                // Features
                'feature-expert-title': 'Guías Locales Expertos',
                'feature-expert-text': 'Nuestros guías experimentados nacieron y crecieron en la Amazonía, con profundo conocimiento del comportamiento de la vida silvestre y supervivencia en la selva.',
                'feature-safety-title': 'Seguridad Primero',
                'feature-safety-text': 'Todos los tours incluyen equipo de seguridad, botiquines de primeros auxilios, y nuestros guías están certificados en primeros auxilios en la naturaleza.',
                'feature-sustainable-title': 'Turismo Sostenible',
                'feature-sustainable-text': 'Trabajamos estrechamente con las comunidades locales para asegurar que nuestros tours beneficien tanto a los visitantes como al medio ambiente.',

                // Trust & Safety Section
                'trust-title': 'Confianza y Seguridad',
                'trust-subtitle': 'Tu seguridad y satisfacción son nuestras principales prioridades',
                'trust-certified-title': 'Certificado y Licenciado',
                'trust-certified-text': 'Operador turístico oficialmente licenciado con todos los permisos y certificaciones requeridas.',
                'trust-local-title': 'Experiencia Local',
                'trust-local-text': 'Nacidos y criados en la Amazonía, nuestros guías tienen un conocimiento incomparable de la región.',
                'trust-safety-title': 'Equipo de Seguridad',
                'trust-safety-text': 'Equipo profesional de seguridad y protocolos aseguran tu seguridad durante toda la aventura.',
                'guarantee-title': 'Garantía de Satisfacción 100%',
                'guarantee-text': 'Respaldamos cada tour. Si no estás completamente satisfecho, lo arreglaremos.',

                // Tours Section
                'tours-title': 'Nuestros Tours',
                'tours-subtitle': 'Elige tu aventura perfecta en la Amazonía',
                'tour-highlights': 'Destacados del Tour',
                'tour-duration': 'Duración',
                'tour-difficulty': 'Dificultad',
                'tour-group-size': 'Tamaño del Grupo',
                'tour-includes': 'Incluye',
                'tour-whatsapp': 'Reservar por WhatsApp',

                // Contact Section
                'contact-title': 'Contáctanos',
                'contact-subtitle': '¿Listo para comenzar tu aventura amazónica?',
                'contact-phone': 'Teléfono / WhatsApp',
                'contact-email': 'Correo Electrónico',
                'contact-address': 'Dirección',
                'contact-hours': 'Horario de Oficina',
                'contact-hours-detail': 'Lunes a Domingo: 8:00 AM - 8:00 PM',
                'contact-location': 'Nuestra Ubicación',
                'contact-location-detail': 'Ubicados en el corazón de Rurrenabaque, Bolivia',
                'contact-whatsapp-btn': 'Envíanos mensaje por WhatsApp',
                'contact-booking': 'Reserva Rápida',
                'contact-booking-text': 'Envíanos un mensaje por WhatsApp para reservas instantáneas e información de tours.',
                'contact-booking-steps': 'Cómo Reservar',
                'contact-step1': 'Envíanos un mensaje de WhatsApp',
                'contact-step2': 'Dinos tus fechas preferidas y tour',
                'contact-step3': 'Recibe confirmación y detalles de pago',
                'contact-step4': '¡Disfruta tu aventura amazónica!',
                'language-toggle-title': 'Elige Idioma',

                // Wildlife Gallery Section - Spanish
                'wildlife-title': 'Vida Silvestre Increíble',
                'wildlife-subtitle': 'Descubre la increíble biodiversidad de la Amazonía',
                'wildlife-dolphins-title': 'Delfines Rosados del Río',
                'wildlife-dolphins-desc': 'Nada con estas increíbles criaturas en las aguas prístinas de los Pampas del Yacuma. Estos mamíferos inteligentes son únicos de la cuenca amazónica.',
                'wildlife-macaws-title': 'Guacamayos Coloridos',
                'wildlife-macaws-desc': 'Observa el raro y endémico Guacamayo Barbazul, encontrado solo en Bolivia. Esta especie en peligro es destacada para observadores de aves.',
                'wildlife-capybaras-title': 'Capibaras Amigables',
                'wildlife-capybaras-desc': 'Conoce a los roedores más grandes del mundo en su hábitat natural. Estos gigantes gentiles descansan en las orillas del río.',
                'wildlife-caimans-title': 'Caimanes Espectaculares',
                'wildlife-caimans-desc': 'Observa estos impresionantes reptiles durante excursiones nocturnas. Nuestros guías te mostrarán caimanes de forma segura.',
                'wildlife-howler-title': 'Monos Aulladores',
                'wildlife-howler-desc': 'Escucha los llamados distintivos de los monos aulladores. Estos primates están entre los animales más ruidosos del mundo.',
                'wildlife-sloths-title': 'Perezosos de Tres Dedos',
                'wildlife-sloths-desc': 'Descubre estas maravillas de movimiento lento en el dosel del bosque. Los perezosos son maestros del camuflaje.',
                'wildlife-baby-monkeys-title': 'Bebés Monos con Familias',
                'wildlife-baby-monkeys-desc': 'Presencia momentos conmovedores de familias de monos en su hábitat natural. Bebés monos aprendiendo de sus madres.',
                'wildlife-kingfisher-title': 'Martín Pescadores Vibrantes',
                'wildlife-kingfisher-desc': 'Observa estas aves coloridas zambullirse por peces. La Amazonía es hogar de múltiples especies de estas hermosas aves.',
                'wildlife-butterflies-title': 'Mariposas Exóticas',
                'wildlife-butterflies-desc': 'Maravíllate con la increíble diversidad de mariposas. Desde especies pequeñas como joyas hasta grandes mariposas morpho.',
                'wildlife-hawks-title': 'Aves de Presa Majestuosas',
                'wildlife-hawks-desc': 'Observa halcones impresionantes volando sobre el dosel amazónico. Estos cazadores son esenciales para el equilibrio del ecosistema.',
                'wildlife-piranhas-title': 'Pirañas Legendarias',
                'wildlife-piranhas-desc': 'Prueba tu suerte pescando pirañas en las aguas amazónicas. A pesar de su reputación, estos peces son fascinantes.',
                'wildlife-frogs-title': 'Ranas de Árbol Coloridas',
                'wildlife-frogs-desc': 'Descubre la increíble variedad de ranas en el bosque amazónico. Desde pequeñas ranas venenosas hasta ranas grandes.',
                'wildlife-turtles-title': 'Tortugas de Río Ancestrales',
                'wildlife-turtles-desc': 'Encuentra estas criaturas prehistóricas tomando sol en troncos. Algunas especies pueden vivir más de 100 años.',
                'wildlife-tarantulas-title': 'Tarántulas Amazónicas',
                'wildlife-tarantulas-desc': 'Para los valientes, observa estas impresionantes arañas en su hábitat natural. Las tarántulas controlan insectos.',
                'wildlife-capuchin-title': 'Monos Capuchinos Inteligentes',
                'wildlife-capuchin-desc': 'Observa estos primates inteligentes usar herramientas. Los monos capuchinos están entre los animales más inteligentes.',
                'wildlife-exotic-birds-title': 'Aves Exóticas Espectaculares',
                'wildlife-exotic-birds-desc': 'La Amazonía es hogar de más de 1,300 especies de aves. Desde colibríes hasta tucanes, la diversidad es impresionante.',

                // Certifications - Spanish
                'cert-licensed': 'Operador Turístico Licenciado',
                'cert-safety': 'Guías Certificados en Seguridad',
                'cert-community': 'Programa de Asociación Comunitaria',

                // Ecolodges Section - Spanish
                'ecolodges-title': 'Nuestros Ecolodges',
                'ecolodges-subtitle': 'Alojamiento cómodo en armonía con la naturaleza',
                'ecolodge-pampas-title': 'Ecolodge Caracoles',
                'ecolodge-pampas-location': 'Santa Rosa, Pampas',
                'ecolodge-pampas-description': 'Alojamiento rústico de madera sobre pilotes con vista al río Yacuma, diseñado para mezclarse armoniosamente con el ambiente de humedales.',
                'ecolodge-madidi-title': 'Ecolodge Tacuaral',
                'ecolodge-madidi-location': 'Parque Nacional Madidi',
                'ecolodge-madidi-description': 'Alojamiento ecológico en lo profundo del bosque, construido con materiales sostenibles y alimentado por energía solar.',
                'feature-beds': 'Camas cómodas con mosquiteros',
                'feature-bathroom': 'Instalaciones de baño compartidas',
                'feature-meals': 'Deliciosa cocina local',
                'feature-terrace': 'Terraza con vista al río',
                'feature-solar': 'Energía solar',
                'feature-sustainable': 'Construcción sostenible',
                'feature-wildlife': 'Mirador de vida silvestre',
                'feature-guides': 'Guías naturalistas en el sitio',

                // Policies Section - Spanish
                'policies-title': 'Políticas',
                'policy-reservations-title': 'Reservas y Pagos',
                'policy-reservations-text': 'Las reservas realizadas a través de operadores turísticos o agencias de viajes deben solicitarse con al menos 7 días de anticipación al inicio del viaje. Una vez confirmada la disponibilidad para la fecha y el tour requerido, el cliente debe enviar a Bala Tours, por fax o correo electrónico, el formulario de reserva.',
                'policy-cancellations-title': 'Cancelaciones y Reembolsos',
                'policy-cancellations-text': 'La cancelación de un servicio contratado debe notificarse por escrito. Si la cancelación se realiza después del pago total del servicio contratado, el porcentaje de retención a aplicar es el siguiente:',
                'policy-cancellation-2days': '2 días antes del tour: <strong>50%</strong>',
                'policy-cancellation-sameday': 'El mismo día del tour: <strong>100%</strong>',
                'policy-insurance-title': 'Seguro',
                'policy-insurance-text': 'Es responsabilidad de los turistas contratar un seguro de viaje o contra accidentes, así como portar la documentación necesaria al momento del viaje.',
            }
        };
        this.init();
    }

    init() {
        // Wait for DOM to be ready before initializing
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.updateLanguage(this.currentLanguage);
                this.bindEvents();
            });
        } else {
            this.updateLanguage(this.currentLanguage);
            this.bindEvents();
        }
        
        // Also add a backup initialization after a short delay to catch any dynamically loaded content
        setTimeout(() => {
            this.updateLanguage(this.currentLanguage);
        }, 500);
    }

    updateLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('bala-tours-language', lang);

        // Update all translatable elements
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (this.translations[lang] && this.translations[lang][key]) {
                // Check if the translation contains HTML tags
                if (this.translations[lang][key].includes('<strong>') || 
                    this.translations[lang][key].includes('<em>') ||
                    this.translations[lang][key].includes('<br>') ||
                    this.translations[lang][key].includes('<span>')) {
                    element.innerHTML = this.translations[lang][key];
                } else {
                    element.textContent = this.translations[lang][key];
                }
            } else {
                // Log missing translations for debugging
                console.warn(`Missing translation for key: "${key}" in language: "${lang}"`);
            }
        });

        // Update placeholders
        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            if (this.translations[lang] && this.translations[lang][key]) {
                element.placeholder = this.translations[lang][key];
            }
        });

        // Update active language button
        document.querySelectorAll('.nav-lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });

        // Update document language attribute
        document.documentElement.lang = lang;

        // Force refresh of any dynamically loaded content
        this.refreshWildlifeGallery();
        
        // Refresh itinerary content specifically
        this.refreshItineraryContent();

        // Debug logging
        console.log(`Language updated to: ${lang}`);
        console.log(`Found ${document.querySelectorAll('[data-translate]').length} translatable elements`);
    }

    // New method to specifically handle itinerary content refresh
    refreshItineraryContent() {
        const itineraryTabs = document.querySelectorAll('.tab-content');
        itineraryTabs.forEach(tab => {
            const translatableElements = tab.querySelectorAll('[data-translate]');
            translatableElements.forEach(element => {
                const key = element.getAttribute('data-translate');
                if (this.translations[this.currentLanguage] && this.translations[this.currentLanguage][key]) {
                    // Check if the translation contains HTML tags
                    if (this.translations[this.currentLanguage][key].includes('<strong>') || 
                        this.translations[this.currentLanguage][key].includes('<em>') ||
                        this.translations[this.currentLanguage][key].includes('<br>') ||
                        this.translations[this.currentLanguage][key].includes('<span>')) {
                        element.innerHTML = this.translations[this.currentLanguage][key];
                    } else {
                        element.textContent = this.translations[this.currentLanguage][key];
                    }
                }
            });
        });
    }

    // New method to specifically handle wildlife gallery refresh
    refreshWildlifeGallery() {
        const wildlifeGallery = document.querySelector('.wildlife-large-gallery');
        if (wildlifeGallery) {
            // Force a re-render of wildlife gallery captions
            const overlays = wildlifeGallery.querySelectorAll('.wildlife-large-overlay');
            overlays.forEach(overlay => {
                const titleElement = overlay.querySelector('h3[data-translate]');
                const descElement = overlay.querySelector('p[data-translate]');
                
                if (titleElement) {
                    const titleKey = titleElement.getAttribute('data-translate');
                    if (this.translations[this.currentLanguage] && this.translations[this.currentLanguage][titleKey]) {
                        titleElement.textContent = this.translations[this.currentLanguage][titleKey];
                    }
                }
                
                if (descElement) {
                    const descKey = descElement.getAttribute('data-translate');
                    if (this.translations[this.currentLanguage] && this.translations[this.currentLanguage][descKey]) {
                        descElement.textContent = this.translations[this.currentLanguage][descKey];
                    }
                }
            });
        }
    }

    bindEvents() {
        // Wait for DOM to be ready
        const setupEvents = () => {
            const langButtons = document.querySelectorAll('.nav-lang-btn');
            console.log('Setting up language buttons:', langButtons.length);

            langButtons.forEach(btn => {
                // Remove any existing listeners
                btn.removeEventListener('click', this.handleLanguageClick);
                
                // Add new listener
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const lang = btn.getAttribute('data-lang');
                    console.log('Language button clicked, switching to:', lang);
                    
                    if (lang && this.translations[lang]) {
                        this.updateLanguage(lang);
                    } else {
                        console.error('Invalid language or missing translations:', lang);
                    }
                });
            });
        };

        // Setup events immediately if DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setupEvents);
        } else {
            setupEvents();
        }

        // Also use event delegation as backup
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-lang-btn')) {
                e.preventDefault();
                const lang = e.target.getAttribute('data-lang');
                console.log('Event delegation - Language button clicked:', lang);
                
                if (lang && this.translations[lang]) {
                    this.updateLanguage(lang);
                }
            }
        });
    }
}

// Mobile Navigation
class MobileNavigation {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.body = document.body;
        this.init();
    }

    init() {
        if (this.hamburger && this.navMenu) {
            this.hamburger.addEventListener('click', () => this.toggleMenu());
            
            // Close menu when clicking on nav links
            this.navMenu.addEventListener('click', (e) => {
                if (e.target.classList.contains('nav-link')) {
                    this.closeMenu();
                }
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
                    this.closeMenu();
                }
            });
        }
    }

    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        this.body.classList.toggle('menu-open');
    }

    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        this.body.classList.remove('menu-open');
    }
}

// Smooth Scrolling
class SmoothScroller {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Header Scroll Effect
class HeaderScrollEffect {
    constructor() {
        this.header = document.querySelector('.header');
        this.init();
    }

    init() {
        if (this.header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    this.header.classList.add('scrolled');
                } else {
                    this.header.classList.remove('scrolled');
                }
            });
        }
    }
}

// Intersection Observer for Animations
class AnimationObserver {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, this.observerOptions);

            // Observe elements that should animate
            document.querySelectorAll('.feature, .trust-card, .service-card, .destination-card, .ecolodge-card, .testimonial-card').forEach(el => {
                this.observer.observe(el);
            });
        }
    }
}

// WhatsApp Integration
class WhatsAppIntegration {
    constructor() {
        this.phoneNumber = '+59171245281'; // Replace with actual WhatsApp number
        this.init();
    }

    init() {
        document.querySelectorAll('.btn-whatsapp, [data-whatsapp]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const tourName = button.getAttribute('data-tour') || 'General Inquiry';
                const message = this.generateMessage(tourName);
                this.openWhatsApp(message);
            });
        });
    }

    generateMessage(tourName) {
        const currentLang = localStorage.getItem('bala-tours-language') || 'en';
        
        if (currentLang === 'es') {
            return `¡Hola! Estoy interesado en el tour "${tourName}" con Bala Tours. ¿Podrían darme más información sobre disponibilidad y precios? ¡Gracias!`;
        } else {
            return `Hello! I'm interested in the "${tourName}" tour with Bala Tours. Could you provide more information about availability and pricing? Thank you!`;
        }
    }

    openWhatsApp(message) {
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${this.phoneNumber.replace('+', '')}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    }
}

// Tab System for Itineraries
class TabSystem {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('.tab-btn').forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                this.switchTab(targetTab);
                
                // Update active button
                document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    switchTab(tabId) {
        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // Show target tab content
        const targetContent = document.getElementById(tabId);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    }
}

// Form Handling
class FormHandler {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit(form);
            });
        });
    }

    handleSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // For now, redirect to WhatsApp with form data
        const message = this.formatFormData(data);
        const whatsapp = new WhatsAppIntegration();
        whatsapp.openWhatsApp(message);
    }

    formatFormData(data) {
        const currentLang = localStorage.getItem('bala-tours-language') || 'en';
        
        if (currentLang === 'es') {
            return `Consulta desde el sitio web:
Nombre: ${data.name || 'No especificado'}
Email: ${data.email || 'No especificado'}
Mensaje: ${data.message || 'No especificado'}`;
        } else {
            return `Website inquiry:
Name: ${data.name || 'Not specified'}
Email: ${data.email || 'Not specified'}
Message: ${data.message || 'Not specified'}`;
        }
    }
}

// Performance Optimization
class ImageLazyLoader {
    constructor() {
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            this.imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                this.imageObserver.observe(img);
            });
        }
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LanguageManager();
    new MobileNavigation();
    new SmoothScroller();
    new HeaderScrollEffect();
    new AnimationObserver();
    new WhatsAppIntegration();
    new TabSystem();
    new FormHandler();
    new ImageLazyLoader();
    
    // Initialize WhatsApp button and icon checking
    addWhatsAppButton();
    checkAndFixIcons();

    console.log('🌿 Bala Tours website initialized successfully!');
});

// Initialize language manager immediately
new LanguageManager();

// Itinerary Tabs Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize itinerary tabs
    initItineraryTabs();
});

function initItineraryTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab content
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // Ensure first tab is active by default
    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons[0].classList.add('active');
        tabContents[0].classList.add('active');
    }
}

console.log('Bala Tours website loaded successfully! 🌿');