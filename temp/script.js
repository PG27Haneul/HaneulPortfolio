// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu if open
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
}

// Add click event listeners to navigation links
document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        scrollToSection(sectionId);
    });
});

// Active section highlighting
function updateActiveSection() {
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    const scrollPosition = window.scrollY + 300;

    for (const section of sections) {
        const element = document.getElementById(section);
        const navLink = document.querySelector(`[data-section="${section}"]`);

        if (element && navLink) {
            const offsetTop = element.offsetTop;
            const height = element.offsetHeight;

            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
                // Remove active class from all links
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                // Add active class to current section link
                navLink.classList.add('active');
                break;
            }
        }
    }
}

// Modal functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target.id);
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal[style*="block"]');
        openModals.forEach(modal => {
            closeModal(modal.id);
        });
    }
});

// Modal functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target.id);
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal[style*="block"]');
        openModals.forEach(modal => {
            closeModal(modal.id);
        });
    }
});

// Scroll event listener for active section highlighting
window.addEventListener('scroll', updateActiveSection);

// Animated counters for hero stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-value');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// Animate skill level bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.level-fill');

    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        setTimeout(() => {
            bar.style.width = level + '%';
        }, 500);
    });
}

// Contact form handling
const contactForm = document.getElementById('contactForm');
const submitBtn = contactForm.querySelector('.cyber-submit');
const btnContent = submitBtn.querySelector('.btn-content');
const btnLoading = submitBtn.querySelector('.btn-loading');
const statusIndicator = document.querySelector('.status-indicator');
const statusText = document.querySelector('.status-text');

emailjs.init("zCGHcU1pkCns5AK1J");

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Show loading state
    btnContent.style.display = 'none';
    btnLoading.style.display = 'flex';
    statusIndicator.style.background = '#ffaa00';
    statusText.textContent = 'TRANSMITTING...';

    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Simple validation
    if (!name || !email || !message) {
        showNotification('ERROR: All fields required', 'error');
        resetFormState();
        return;
    }

    // Send the email using EmailJS
    emailjs.send("service_q2f6w0o", "template_18lmgv9", {
        message: message,
        from_name: name,
        reply_to: email,
    })
        .then(() => {
            showNotification('MESSAGE_TRANSMITTED_SUCCESSFULLY', 'success');
            contactForm.reset();
            statusIndicator.style.background = '#00ff88';
            statusText.textContent = 'TRANSMISSION_COMPLETE';
        }, (error) => {
            showNotification('TRANSMISSION_FAILED: ' + error.text, 'error');
            statusIndicator.style.background = '#ff0066';
            statusText.textContent = 'TRANSMISSION_ERROR';
        })
        .finally(() => {
            resetFormState();
        });
});

function resetFormState() {
    setTimeout(() => {
        btnContent.style.display = 'block';
        btnLoading.style.display = 'none';
        statusIndicator.style.background = '#00ff88';
        statusText.textContent = 'READY';
    }, 2000);
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `cyber-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : '✗'}</span>
            <span class="notification-text">${message}</span>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(10, 10, 10, 0.95);
        border: 2px solid ${type === 'success' ? '#00ff88' : '#ff0066'};
        border-radius: 8px;
        padding: 1rem 1.5rem;
        color: ${type === 'success' ? '#00ff88' : '#ff0066'};
        font-family: 'Orbitron', monospace;
        font-weight: 600;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 0 20px ${type === 'success' ? 'rgba(0, 255, 136, 0.3)' : 'rgba(255, 0, 102, 0.3)'};
    `;

    document.body.appendChild(notification);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-icon {
        font-size: 1.2rem;
        font-weight: bold;
    }
    
    .notification-text {
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
`;
document.head.appendChild(notificationStyles);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            // Trigger skill bar animations when skills section is visible
            if (entry.target.classList.contains('skills')) {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .skills');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Start counter animation after a delay
    setTimeout(animateCounters, 1000);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.grid-overlay');
    const particles = document.querySelector('.floating-particles');

    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }

    if (particles) {
        particles.style.transform = `translateY(${scrolled * 0.3}px) rotate(${scrolled * 0.1}deg)`;
    }
});

// Glitch effect for navbar on scroll
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }

    lastScrollY = currentScrollY;
});

// Add cyber glitch effects
function addGlitchEffect() {
    const glitchElements = document.querySelectorAll('.hero-title, .nav-logo');

    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.animation = 'glitch 0.3s ease-in-out';
        });

        element.addEventListener('animationend', () => {
            element.style.animation = '';
        });
    });
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
    addGlitchEffect();

    // Add random glitch effects periodically
    setInterval(() => {
        const randomElements = document.querySelectorAll('.terminal-line, .stat-value');
        const randomElement = randomElements[Math.floor(Math.random() * randomElements.length)];
        if (randomElement && Math.random() < 0.1) { // 10% chance
            randomElement.style.animation = 'glitch 0.2s ease-in-out';
            setTimeout(() => {
                randomElement.style.animation = '';
            }, 200);
        }
    }, 3000);
});

// Matrix rain effect (optional - can be enabled)
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';

    document.body.appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");

    const fontSize = 10;
    const columns = canvas.width / fontSize;

    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function draw() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff88';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 35);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Uncomment to enable matrix rain effect
// createMatrixRain();

// Enhanced scroll reveal animations
const enhancedRevealElements = document.querySelectorAll('section');
const enhancedRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');

            // Add staggered animations for child elements
            const childElements = entry.target.querySelectorAll('.skill-card, .project-card, .contact-item');
            childElements.forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, { threshold: 0.15 });

enhancedRevealElements.forEach(el => {
    enhancedRevealObserver.observe(el);
});