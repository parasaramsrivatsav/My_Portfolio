// ============================================
// NAVIGATION MENU TOGGLE
// ============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================

window.addEventListener('scroll', () => {
    let current = '';

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// SMOOTH SCROLL REVEAL ANIMATION
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and items
document.querySelectorAll('.project-card, .skill-category, .cert-item, .timeline-item, .info-item, .stat-card').forEach(el => {
    el.style.animation = 'none';
    observer.observe(el);
});

// ============================================
// TYPING ANIMATION FOR HERO SUBTITLE
// ============================================

const heroSubtitle = document.querySelector('.hero-subtitle');
const text = heroSubtitle.textContent;
heroSubtitle.textContent = '';

let index = 0;
const speed = 50;

function typeText() {
    if (index < text.length) {
        heroSubtitle.textContent += text.charAt(index);
        index++;
        setTimeout(typeText, speed);
    }
}

// Start typing after a delay
setTimeout(() => {
    heroSubtitle.textContent = '';
    index = 0;
    typeText();
}, 500);

// ============================================
// SKILL TAG CLICK ANIMATION
// ============================================

const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach(tag => {
    tag.addEventListener('click', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'pulse 0.5s ease';
        }, 10);
    });

    tag.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1)';
    });

    tag.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});

// ============================================
// TECH BADGE ANIMATION
// ============================================

const techBadges = document.querySelectorAll('.tech-badge');
techBadges.forEach((badge, index) => {
    badge.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
});

// ============================================
// PROJECT CARD HOVER EFFECT
// ============================================

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ============================================
// STAT COUNTER ANIMATION
// ============================================

const statCards = document.querySelectorAll('.stat-card h3');

const counterObserverOptions = {
    threshold: 0.5,
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
            animateCounter(entry.target);
            entry.target.dataset.counted = true;
            counterObserver.unobserve(entry.target);
        }
    });
}, counterObserverOptions);

statCards.forEach(stat => {
    counterObserver.observe(stat);
});

function animateCounter(element) {
    const target = parseInt(element.textContent);
    let current = 0;
    const increment = target / 30;
    const duration = 30;
    let elapsed = 0;

    const timer = setInterval(() => {
        elapsed++;
        current += increment;
        
        if (current >= target) {
            element.textContent = element.textContent.match(/\d+/)[0] + element.textContent.match(/[^0-9]/)[0];
            clearInterval(timer);
        } else {
            const displayValue = Math.floor(current);
            const unit = element.textContent.match(/[^0-9]/);
            element.textContent = displayValue + (unit ? unit[0] : '');
        }
    }, duration);
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-to-top';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #6c5ce7, #a29bfe);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: 0 8px 32px rgba(108, 92, 231, 0.15);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseover', function() {
    this.style.transform = 'translateY(-5px)';
    this.style.boxShadow = '0 12px 48px rgba(108, 92, 231, 0.25)';
});

scrollTopBtn.addEventListener('mouseout', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 8px 32px rgba(108, 92, 231, 0.15)';
});

// ============================================
// PARALLAX EFFECT ON MOUSE MOVE
// ============================================

const animatedBox = document.querySelector('.animated-box');
const hero = document.querySelector('.hero');

hero.addEventListener('mousemove', (e) => {
    if (!animatedBox) return;
    
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const moveX = (x - centerX) * 0.1;
    const moveY = (y - centerY) * 0.1;
    
    animatedBox.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// ============================================
// CONTACT FORM HANDLING (if added in future)
// ============================================

// Link redirect functionality
document.addEventListener('click', (e) => {
    if (e.target.closest('a[target="_blank"]')) {
        // External links will open in new tab (browser default)
        console.log('Opening external link:', e.target.href);
    }
});

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ============================================
// PERFORMANCE: LAZY LOADING FOR IMAGES
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// DYNAMIC YEAR IN FOOTER
// ============================================

const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer p');
if (footerText) {
    footerText.textContent = `© ${currentYear} Parasaram Hanumanth Srivatsava. All rights reserved.`;
}

// ============================================
// ADD FOCUS STATES FOR ACCESSIBILITY
// ============================================

navLinks.forEach(link => {
    link.addEventListener('focus', function() {
        this.style.outline = '2px solid #6c5ce7';
        this.style.outlineOffset = '5px';
    });

    link.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// ============================================
// INTERSECTION OBSERVER FOR HEADER
// ============================================

const navbar = document.querySelector('.navbar');
const heroSection = document.querySelector('.hero');

const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            navbar.style.boxShadow = '0 8px 32px rgba(108, 92, 231, 0.15)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
}, {
    threshold: 0.1
});

if (heroSection) {
    headerObserver.observe(heroSection);
}

// ============================================
// LOG MESSAGE
// ============================================

console.log('Portfolio loaded successfully! 🚀');
console.log('Author: Parasaram Hanumanth Srivatsava');
console.log('Built with HTML, CSS, and JavaScript');
