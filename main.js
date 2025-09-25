var typed = new Typed (".text",{
    strings:["Mahasiswa", "Afiliator", "Atlet e-sport"],
    typeSpeed:100,
    backSpeed:100,
    backDelay:1000,
    loop:true
});

// Smooth scroll dengan update active class
document.addEventListener('DOMContentLoaded', function() {
    const navbarLinks = document.querySelectorAll('.navbar a');
    const sections = document.querySelectorAll('section[id]');  // Ambil semua section dengan id
    // Fungsi scroll ke section
    navbarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();  // Prevent default link behavior
            const targetId = this.getAttribute('href').substring(1);  // Ambil id tanpa #
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'  // Scroll ke atas section
                });
                
                // Update active class
                navbarLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Auto-update active berdasarkan scroll (opsional, advanced)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navbarLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });  // Trigger saat 50% section visible
    sections.forEach(section => observer.observe(section));
});
// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initContactPage();
});

function initContactPage() {
    setupFormSubmission();
    setupContactItemHovers();
    setupInputFocusEffects();
    setupSocialLinkHovers();
}

// Form submission animation
function setupFormSubmission() {
    const form = document.querySelector('.contact-form form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = document.querySelector('.submit-btn');
            const originalText = btn.textContent;
            
            // Validate form before submission
            if (!validateForm()) {
                return;
            }
            
            // Start loading animation
            btn.textContent = 'Mengirim...';
            btn.style.background = 'linear-gradient(135deg, #00cc99, #009966)';
            btn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Success state
                btn.textContent = 'Terkirim!';
                btn.style.background = 'linear-gradient(135deg, #00ff88, #00cc66)';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = 'linear-gradient(135deg, #00ffff, #00cccc)';
                    btn.disabled = false;
                    form.reset();
                    
                    // Show success message
                    showNotification('Pesan berhasil dikirim! Terima kasih.', 'success');
                }, 2000);
            }, 1500);
        });
    }
}

// Form validation
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name) {
        showNotification('Nama harus diisi!', 'error');
        return false;
    }
    
    if (!email || !isValidEmail(email)) {
        showNotification('Email tidak valid!', 'error');
        return false;
    }
    
    if (!subject) {
        showNotification('Subject harus diisi!', 'error');
        return false;
    }
    
    if (!message) {
        showNotification('Pesan harus diisi!', 'error');
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Style notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '9999',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });

    // Set background based on type
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #00ff88, #00cc66)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ff4757, #ff3742)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #00ffff, #00cccc)';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Enhanced hover effects for contact items
function setupContactItemHovers() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Add glow effect
            this.style.boxShadow = '0 8px 25px rgba(0, 255, 255, 0.4)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 255, 255, 0.3)';
        });
        
        // Add click effect for mobile
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateX(0) scale(1)';
            }, 150);
        });
    });
}

// Input focus effects
function setupInputFocusEffects() {
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            const formGroup = this.parentElement;
            formGroup.style.transform = 'scale(1.02)';
            formGroup.style.transition = 'transform 0.2s ease';
            
            // Add typing animation to label
            const label = formGroup.querySelector('label');
            if (label) {
                label.style.color = '#00ffff';
                label.style.transform = 'translateY(-2px)';
                label.style.transition = 'all 0.2s ease';
            }
        });
        
        input.addEventListener('blur', function() {
            const formGroup = this.parentElement;
            formGroup.style.transform = 'scale(1)';
            
            // Reset label
            const label = formGroup.querySelector('label');
            if (label) {
                label.style.color = 'white';
                label.style.transform = 'translateY(0)';
            }
        });
        
        // Add input animation
        input.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.style.background = 'rgba(255, 255, 255, 0.15)';
            } else {
                this.style.background = 'rgba(255, 255, 255, 0.1)';
            }
        });
    });
}

// Social link hover effects
function setupSocialLinkHovers() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach((link, index) => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
            this.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            
            // Add ripple effect
            createRippleEffect(this);
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click animation
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            this.style.transform = 'translateY(-5px) scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px) scale(1.1)';
            }, 150);
            
            // Show tooltip
            showSocialTooltip(this, link.getAttribute('title'));
        });
    });
}

// Create ripple effect
function createRippleEffect(element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.transform = 'translate(-50%, -50%) scale(0)';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(0, 255, 255, 0.3)';
    ripple.style.position = 'absolute';
    ripple.style.pointerEvents = 'none';
    ripple.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
    ripple.style.zIndex = '-1';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    // Animate ripple
    setTimeout(() => {
        ripple.style.transform = 'translate(-50%, -50%) scale(1)';
        ripple.style.opacity = '0';
    }, 50);

    // Remove ripple
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 600);
}

// Show social tooltip
function showSocialTooltip(element, text) {
    // Remove existing tooltip
    const existingTooltip = document.querySelector('.social-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
    
    const tooltip = document.createElement('div');
    tooltip.className = 'social-tooltip';
    tooltip.textContent = `Opening ${text}...`;
    
    Object.assign(tooltip.style, {
        position: 'absolute',
        bottom: '60px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(0, 0, 0, 0.8)',
        color: '#00ffff',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        fontSize: '0.8rem',
        whiteSpace: 'nowrap',
        zIndex: '1000',
        opacity: '0',
        transition: 'opacity 0.3s ease'
    });
    
    element.appendChild(tooltip);
    
    // Animate in
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 50);
    
    // Remove after 2 seconds
    setTimeout(() => {
        tooltip.style.opacity = '0';
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.remove();
            }
        }, 300);
    }, 2000);
}

// Add scroll animations
function setupScrollAnimations() {
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

    // Observe contact items
    document.querySelectorAll('.contact-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Observe form groups
    document.querySelectorAll('.form-group').forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        group.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(group);
    });
}

// Add typing effect to section title
function addTypingEffect() {
    const title = document.querySelector('.section-title h1');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        
        let index = 0;
        const typeInterval = setInterval(() => {
            title.textContent = text.slice(0, index);
            index++;
            
            if (index > text.length) {
                clearInterval(typeInterval);
                
                // Add cursor blink effect
                const cursor = document.createElement('span');
                cursor.textContent = '|';
                cursor.style.animation = 'blink 1s infinite';
                cursor.style.marginLeft = '2px';
                title.appendChild(cursor);
                
                // Remove cursor after 3 seconds
                setTimeout(() => {
                    if (cursor.parentNode) {
                        cursor.remove();
                    }
                }, 3000);
            }
        }, 100);
    }
}

// Add CSS for blink animation
function addBlinkAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Initialize scroll animations and typing effect
document.addEventListener('DOMContentLoaded', function() {
    setupScrollAnimations();
    addTypingEffect();
    addBlinkAnimation();
});

// Add smooth scroll for navigation links
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add particle effect on page load (optional enhancement)
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    
    Object.assign(particlesContainer.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: '-1',
        overflow: 'hidden'
    });

    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createParticle(particlesContainer);
        }, i * 200);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    
    Object.assign(particle.style, {
        position: 'absolute',
        width: '2px',
        height: '2px',
        background: '#00ffff',
        borderRadius: '50%',
        opacity: Math.random() * 0.5 + 0.2,
        left: Math.random() * 100 + '%',
        top: '100%',
        animation: `float-up ${Math.random() * 10 + 10}s linear infinite`
    });

    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, 20000);
}

// Add CSS for particle animation
function addParticleAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-up {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize particle effect
setTimeout(() => {
    addParticleAnimation();
    createParticles();
}, 1000);
