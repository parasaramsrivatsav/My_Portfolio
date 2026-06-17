// ============================================
// CURSOR GLOW
// ============================================

const cursorGlow = document.getElementById('cursorGlow');

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top  = e.clientY + 'px';
});

// ============================================
// NAVBAR — SCROLL + HAMBURGER
// ============================================

const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu  = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    updateActiveLink();
    handleScrollTopBtn();
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
    });
});

function updateActiveLink() {
    let current = '';
    document.querySelectorAll('section[id]').forEach(section => {
        if (window.scrollY >= section.offsetTop - 220) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// ============================================
// TYPING ANIMATION — HERO SUBTITLE
// ============================================

const texts = [
    'Full Stack Developer',
    'Machine Learning Engineer',
    'AI Enthusiast',
    'Problem Solver'
];

let textIndex = 0;
let charIndex  = 0;
let isDeleting = false;
const subtitleEl = document.getElementById('heroSubtitle');

function typeLoop() {
    const current = texts[textIndex];

    if (isDeleting) {
        subtitleEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        subtitleEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === current.length) {
        setTimeout(() => { isDeleting = true; typeLoop(); }, 1800);
        return;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex  = (textIndex + 1) % texts.length;
    }

    const speed = isDeleting ? 50 : 80;
    setTimeout(typeLoop, speed);
}

setTimeout(typeLoop, 800);

// ============================================
// REVEAL ON SCROLL (IntersectionObserver)
// ============================================

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Also reveal skill/cert/project cards without .reveal
const generalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            generalObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-category, .cert-item, .stat-card').forEach(el => {
    generalObserver.observe(el);
});

// ============================================
// STAT COUNTER ANIMATION
// ============================================

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card    = entry.target;
            const target  = parseInt(card.dataset.count);
            const valEl   = card.querySelector('.stat-val');
            let current   = 0;
            const step    = Math.ceil(target / 40);
            const timer   = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                valEl.textContent = current;
            }, 40);
            statObserver.unobserve(card);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card[data-count]').forEach(el => statObserver.observe(el));

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

const scrollTopBtn = document.getElementById('scrollTop');

function handleScrollTopBtn() {
    if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// SKILL TAG — RIPPLE EFFECT ON CLICK
// ============================================

document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-anim 0.5s linear;
            background: rgba(0, 212, 170, 0.25);
            width: 60px; height: 60px;
            left: ${e.offsetX - 30}px;
            top:  ${e.offsetY - 30}px;
            pointer-events: none;
        `;
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 500);
    });
});

// Add ripple keyframe dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple-anim {
        to { transform: scale(4); opacity: 0; }
    }
`;
document.head.appendChild(rippleStyle);

// ============================================
// PROJECT CARD — TILT EFFECT
// ============================================

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect   = card.getBoundingClientRect();
        const x      = e.clientX - rect.left;
        const y      = e.clientY - rect.top;
        const cx     = rect.width  / 2;
        const cy     = rect.height / 2;
        const rotateX = ((y - cy) / cy) * -6;
        const rotateY = ((x - cx) / cx) *  6;
        card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        card.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.4s ease';
    });
});

// ============================================
// NAV LINK — SMOOTH KEYBOARD FOCUS
// ============================================

navLinks.forEach(link => {
    link.addEventListener('focus', () => {
        link.style.outline = '2px solid rgba(0, 212, 170, 0.5)';
        link.style.outlineOffset = '4px';
        link.style.borderRadius = '4px';
    });
    link.addEventListener('blur', () => {
        link.style.outline = '';
    });
});

// ============================================
// CLOSE MOBILE MENU ON OUTSIDE CLICK
// ============================================

document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
    }
});

// ============================================
// KEYBOARD — ESC TO CLOSE MENU
// ============================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
    }
});

// ============================================
// FOOTER YEAR
// ============================================

const footerYear = document.getElementById('footerYear');
if (footerYear) {
    const yr = new Date().getFullYear();
    footerYear.textContent = `© ${yr} Parasaram Hanumanth Srivatsava. All rights reserved.`;
}

// ============================================
// TECH BADGE STAGGER
// ============================================

document.querySelectorAll('.research-tech .tech-badge, .project-tech .tech-badge').forEach((badge, i) => {
    badge.style.transitionDelay = `${i * 40}ms`;
});

// ============================================
// CONSOLE
// ============================================

console.log('%c Portfolio Loaded 🚀', 'color:#00d4aa; font-size:16px; font-weight:bold;');
console.log('%c Parasaram Hanumanth Srivatsava', 'color:#f0b429; font-size:12px;');