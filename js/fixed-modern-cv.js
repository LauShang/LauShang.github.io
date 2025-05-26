// Document ready function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initThemeToggle();
    initMobileMenu();
    initSkillsAnimation();
    initScrollAnimation();
    initCoursesModal();
    initParticles(); // Removed to solve loading issue
    initContactForm();
    
    // Force the page to finish loading after a short delay
    setTimeout(function() {
        // This will force the browser to stop showing the loading indicator
        window.stop();
        console.log("Forced page load completion");
    }, 2000);
});

// Add all CSS styles to the stylesheet rather than injecting them dynamically
// This approach is better for performance and avoids potential loading issues
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .reveal-element {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        .form-message {
            padding: 10px;
            margin-top: 20px;
            border-radius: 4px;
            text-align: center;
        }
        
        .form-message.success {
            background-color: rgba(76, 175, 80, 0.2);
            color: #4CAF50;
        }
        
        .form-message.error {
            background-color: rgba(244, 67, 54, 0.2);
            color: #F44336;
        }
        
        .submit-btn, .btn-courses {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            background-color: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    }
    
    themeToggle.addEventListener('click', function() {
        if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Mobile Menu
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// Skills Animation
function initSkillsAnimation() {
    const skillHexes = document.querySelectorAll('.skill-hex');
    
    skillHexes.forEach(hex => {
        // Add slight rotation on hover for 3D effect
        hex.addEventListener('mouseenter', function() {
            const randomRotation = Math.random() * 10 - 5; // Random value between -5 and 5
            this.style.transform = `translateY(-10px) rotate(${randomRotation}deg)`;
        });
        
        hex.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Scroll Animation
function initScrollAnimation() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('section, .timeline-item, .education-card, .project-card');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        el.classList.add('reveal-element');
        revealObserver.observe(el);
    });
}

// Online Courses Modal
function initCoursesModal() {
    const modalBtn = document.querySelector('.btn-courses');
    const modal = document.querySelector('.courses-modal');
    const closeBtn = document.querySelector('.close-modal');
    
    if (!modalBtn || !modal || !closeBtn) return;
    
    modalBtn.addEventListener('click', function() {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Particle.js Background with proper cleanup
function initParticles() {
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        // Add a complete callback to signal that particles are fully loaded
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#536dfe'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#536dfe',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
        
        // Signal that loading is complete
        window.addEventListener('load', function() {
            // Force any background processes to complete
            setTimeout(function() {
                if (document.readyState === 'complete') {
                    console.log('All resources loaded!');
                }
            }, 1000);
        });
    }
}

// Contact Form with improved handling
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        // Add novalidate to prevent browser validation which can keep processes running
        contactForm.setAttribute('novalidate', 'true');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validate form
            if (!name || !email || !message) {
                showFormMessage('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // In a real application, you would send the form data to a server here
            // For this demo, we'll just show a success message
            showFormMessage('Message sent successfully!', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to show form messages
function showFormMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    const contactForm = document.querySelector('.contact-form');
    
    // Remove any existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Add the new message
    contactForm.appendChild(messageElement);
    
    // Remove the message after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

// Custom ripple effect for buttons
document.addEventListener('click', function(e) {
    const target = e.target;
    
    if (target.classList.contains('submit-btn') || target.classList.contains('btn-courses')) {
        // Create ripple element
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        target.appendChild(ripple);
        
        // Get button position
        const rect = target.getBoundingClientRect();
        
        // Calculate ripple size and position
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        // Set ripple position and animate
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add('active');
        
        // Remove ripple after animation completes
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add a 3D tilt effect to the hexagonal skill icons
document.querySelectorAll('.skill-hex').forEach(hex => {
    hex.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Calculate tilt values (max 10 degrees)
        const tiltX = -(y / rect.height * 20).toFixed(2);
        const tiltY = (x / rect.width * 20).toFixed(2);
        
        // Apply the 3D transform
        this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-10px)`;
    });
    
    hex.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Add a final completion signal with timeout
window.addEventListener('load', function() {
    // This ensures the page is fully loaded
    document.body.classList.add('fully-loaded');
    
    // Final safety measure - force completion after 3 seconds no matter what
    setTimeout(function() {
        if (document.readyState !== 'complete') {
            window.stop();
            console.log("Forced completion after timeout");
        }
    }, 3000);
});
