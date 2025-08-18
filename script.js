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

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Animate elements on scroll
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .destination-card, .feature, .ecolodge-card, .tour-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const tourInterest = this.querySelector('select').value;
        const preferredDate = this.querySelector('input[type="date"]').value;
        const numPeople = this.querySelector('input[type="number"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !tourInterest) {
            showNotification('Please fill in the required fields (Name, Email, Tour Interest)', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        if (numPeople && (numPeople < 2 || numPeople > 6)) {
            showNotification('Group size must be between 2-6 people', 'error');
            return;
        }
        
        // Format the inquiry message
        let inquiryDetails = `Tour Inquiry from ${name}\n\n`;
        inquiryDetails += `Email: ${email}\n`;
        inquiryDetails += `Tour Interest: ${tourInterest}\n`;
        if (preferredDate) inquiryDetails += `Preferred Date: ${preferredDate}\n`;
        if (numPeople) inquiryDetails += `Number of People: ${numPeople}\n`;
        if (message) inquiryDetails += `\nAdditional Information:\n${message}`;
        
        // Simulate form submission with detailed success message
        showNotification('¡Gracias! Your tour inquiry has been received. We will contact you within 24 hours to discuss your Amazon adventure in Bolivia!', 'success');
        this.reset();
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Destination card hover effects
document.querySelectorAll('.destination-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const img = this.querySelector('.destination-image img');
        if (img) {
            img.style.transform = 'scale(1.1)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const img = this.querySelector('.destination-image img');
        if (img) {
            img.style.transform = 'scale(1)';
        }
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add loading styles if they don't exist
    if (!document.querySelector('#loading-styles')) {
        const style = document.createElement('style');
        style.id = 'loading-styles';
        style.textContent = `
            body:not(.loaded) {
                overflow: hidden;
            }
            body:not(.loaded)::before {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            body:not(.loaded)::after {
                content: 'Welcome to Amazonia Bolivia...';
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: white;
                font-size: 1.5rem;
                font-weight: 600;
                z-index: 10000;
                animation: pulse 2s infinite;
            }
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
        `;
        document.head.appendChild(style);
    }
});

// Add click-to-call functionality for phone numbers
document.querySelectorAll('.contact-item').forEach(item => {
    const text = item.textContent;
    if (text.includes('+1') || text.includes('(')) {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const phoneNumber = text.replace(/\D/g, '');
            if (phoneNumber) {
                window.location.href = `tel:+${phoneNumber}`;
            }
        });
    }
});

// Add email functionality
document.querySelectorAll('.contact-item').forEach(item => {
    const text = item.textContent;
    if (text.includes('@')) {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const email = text.trim();
            window.location.href = `mailto:${email}`;
        });
    }
});

// Enhanced phone and email functionality for Bolivia contact info
document.addEventListener('DOMContentLoaded', () => {
    // Add click-to-call functionality for Bolivian phone numbers
    document.querySelectorAll('.contact-item').forEach(item => {
        const text = item.textContent;
        if (text.includes('+591')) {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => {
                const phoneNumber = text.match(/\+591[\s\d-]+/)[0].replace(/\s|-/g, '');
                window.location.href = `tel:${phoneNumber}`;
            });
            item.title = 'Click to call';
        }
        
        if (text.includes('@')) {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => {
                const email = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)[0];
                window.location.href = `mailto:${email}?subject=Amazon Tour Inquiry - Bala Tours`;
            });
            item.title = 'Click to send email';
        }
        
        if (text.includes('www.')) {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => {
                const url = text.match(/www\.[a-zA-Z0-9.-]+/)[0];
                window.open(`https://${url}`, '_blank');
            });
            item.title = 'Click to visit website';
        }
    });
});

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Back to top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #2c5aa0;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    z-index: 1000;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(44, 90, 160, 0.3);
`;

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'flex';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopButton.addEventListener('mouseenter', () => {
    backToTopButton.style.transform = 'translateY(-3px)';
    backToTopButton.style.background = '#ff6b6b';
});

backToTopButton.addEventListener('mouseleave', () => {
    backToTopButton.style.transform = 'translateY(0)';
    backToTopButton.style.background = '#2c5aa0';
});

// Tour card interactions
document.querySelectorAll('.tour-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Ecolodge card hover effects
document.querySelectorAll('.ecolodge-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const img = this.querySelector('.ecolodge-image img');
        if (img) {
            img.style.transform = 'scale(1.1)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const img = this.querySelector('.ecolodge-image img');
        if (img) {
            img.style.transform = 'scale(1)';
        }
    });
});