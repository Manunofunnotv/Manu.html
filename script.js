// ==================== SMOOTH SCROLL & ACTIVE NAV ==================== 
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

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ==================== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = entry.target.dataset.animation || 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and personaje cards
document.querySelectorAll('.card, .personaje-card').forEach(el => {
    observer.observe(el);
});

// ==================== NAVBAR SCROLL EFFECT ==================== 
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ==================== PARALLAX EFFECT ==================== 
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    const scrollPosition = window.pageYOffset;
    
    if (hero) {
        hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    }
});

// ==================== MOUSE MOVE EFFECT ON HERO ==================== 
const heroContent = document.querySelector('.hero-content');

if (heroContent) {
    document.addEventListener('mousemove', (e) => {
        const heroImg = document.querySelector('.hero-img');
        if (heroImg) {
            const x = (e.clientX / window.innerWidth) * 20 - 10;
            const y = (e.clientY / window.innerHeight) * 20 - 10;
            heroImg.style.transform = `translateY(calc(-20px + ${y}px)) rotateX(${y * 0.1}deg) rotateY(${x * 0.1}deg)`;
        }
    });
}

// ==================== VIVA ANIMATION TRIGGER ==================== 
const cierreSection = document.querySelector('.cierre');
const vivaText = document.querySelector('.viva-text');

const cierreObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            vivaText.style.animation = 'none';
            // Trigger reflow
            void vivaText.offsetWidth;
            vivaText.style.animation = 'vivaAnimation 0.8s ease-out';
        }
    });
}, { threshold: 0.5 });

if (cierreSection) {
    cierreObserver.observe(cierreSection);
}

// ==================== SCROLL PROGRESS BAR ==================== 
function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    // Crear barra de progreso si no existe
    let progressBar = document.querySelector('.progress-bar');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #8B5CF6, #EC4899, #06B6D4);
            z-index: 1001;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);
    }
    progressBar.style.width = scrolled + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ==================== CURSOR EFFECT ==================== 
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor');
    
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.className = 'cursor';
        newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid #8B5CF6;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            display: none;
            box-shadow: inset 0 0 10px rgba(139, 92, 246, 0.3);
        `;
        document.body.appendChild(newCursor);
    }
    
    const cursor2 = document.querySelector('.cursor');
    cursor2.style.left = (e.clientX - 10) + 'px';
    cursor2.style.top = (e.clientY - 10) + 'px';
});

// ==================== LOAD ANIMATION ==================== 
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ==================== PAGE LOAD ANIMATIONS ==================== 
document.addEventListener('DOMContentLoaded', () => {
    // Agregar clase de carga completada
    document.body.classList.add('loaded');
    
    // Animar navbar
    const navbar = document.querySelector('.navbar');
    navbar.style.animation = 'slideDown 0.5s ease-out';
    
    // Animar hero
    const hero = document.querySelector('.hero');
    hero.style.animation = 'fadeIn 0.8s ease-out';
});