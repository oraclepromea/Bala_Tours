// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 25px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Tab functionality for itineraries
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

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
});

// Booking form handling
document.getElementById('booking-form').addEventListener('submit', function(e) {
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
});

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

// Add floating WhatsApp button functionality
function addWhatsAppButton() {
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/59171245281?text=Hello! I\'m interested in booking a tour with Bala Tours.';
    whatsappBtn.target = '_blank';
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    whatsappBtn.style.cssText = `
        position: fixed;
        width: 60px;
        height: 60px;
        bottom: 20px;
        right: 20px;
        background: #25d366;
        color: white;
        border-radius: 50%;
        text-align: center;
        font-size: 30px;
        box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        transition: all 0.3s ease;
        animation: pulse 2s infinite;
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
    
    document.body.appendChild(whatsappBtn);
    
    // Add pulse animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
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

console.log('Bala Tours website loaded successfully! 🌿');