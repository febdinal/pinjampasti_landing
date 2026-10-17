document.addEventListener('DOMContentLoaded', function() {
    const canHover = window.matchMedia('(hover: hover)').matches;
    
    const header = document.querySelector('.pinjampasti-header');
    const menuToggle = document.querySelector('.pinjampasti-menu-toggle');
    const navMenu = document.querySelector('.pinjampasti-nav-menu');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', menuToggle.classList.contains('active'));
        });
        menuToggle.setAttribute('aria-label', 'Buka menu');
        menuToggle.setAttribute('aria-expanded', 'false');
        navMenu.addEventListener('click', function(e) {
            if (e.target.closest('a')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animateElements = document.querySelectorAll('.pinjampasti-service-card, .pinjampasti-testimonial-card, .pinjampasti-feature-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    const buttons = document.querySelectorAll('.pinjampasti-btn-primary, .pinjampasti-btn-secondary');
    buttons.forEach(button => {
        canHover && button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        canHover && button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    const serviceCards = document.querySelectorAll('.pinjampasti-service-card');
    serviceCards.forEach(card => {
        canHover && card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        canHover && card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    const testimonialCards = document.querySelectorAll('.pinjampasti-testimonial-card');
    testimonialCards.forEach(card => {
        canHover && card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) rotate(1deg)';
        });
        
        canHover && card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
    
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 80 && !navMenu.classList.contains('active')) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });
    
  
    
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    function createFloatingElements() {
        const hero = document.querySelector('.pinjampasti-hero');
        if (!hero) return;
        
        for (let i = 0; i < 5; i++) {
            const floatingElement = document.createElement('div');
            floatingElement.style.position = 'absolute';
            floatingElement.style.width = Math.random() * 100 + 50 + 'px';
            floatingElement.style.height = floatingElement.style.width;
            floatingElement.style.background = 'rgba(255, 255, 255, 0.1)';
            floatingElement.style.borderRadius = '50%';
            floatingElement.style.left = Math.random() * 100 + '%';
            floatingElement.style.top = Math.random() * 100 + '%';
            floatingElement.style.animation = `float ${Math.random() * 3 + 2}s ease-in-out infinite alternate`;
            floatingElement.style.pointerEvents = 'none';
            
            hero.appendChild(floatingElement);
        }
    }
    
    createFloatingElements();
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            100% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        @media (max-width: 768px) {
            .pinjampasti-nav-menu.active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(20px);
                padding: 20px;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
            }
            
            .pinjampasti-menu-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .pinjampasti-menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .pinjampasti-menu-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
    `;
    document.head.appendChild(style);
}); 

// WhatsApp admin: ubah nomor di sini saja (format internasional tanpa +)
const PINJAMPASTI_WA_NUMBER = '6282218267895';
const PINJAMPASTI_WA_NUMBER_2 = '6283168354495';

const PINJAMPASTI_WA_MESSAGES = {
    batal: 'Halo Admin PinjamPasti, saya ingin mengajukan PEMBATALAN PINJAMAN.\n\nNama lengkap:\nNomor ponsel terdaftar:\nAlasan pembatalan:',
    bayar: 'Halo Admin PinjamPasti, saya ingin menanyakan PEMBAYARAN pinjaman.\n\nNama lengkap:\nNomor ponsel terdaftar:\nKebutuhan (cara bayar / konfirmasi / perpanjangan):',
    hapus: 'Halo Admin PinjamPasti, saya ingin mengajukan PENGHAPUSAN DATA PERMANEN akun dan data pribadi saya.\n\nNama lengkap:\nNomor KTP (4 digit terakhir):\nNomor ponsel terdaftar:',
    admin: 'Halo Admin PinjamPasti, saya ingin bertanya.'
};

const PINJAMPASTI_WA_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l4.9-1.4A10 10 0 1 0 12 2zm4.7 13.6c-.2.5-1.1 1-1.5 1-.4.1-.9.1-2.9-.7-2.4-1-4-3.4-4.1-3.6-.1-.2-1-1.3-1-2.5s.6-1.8.9-2c.2-.2.4-.3.6-.3h.4c.2 0 .3 0 .5.4l.7 1.7c.1.2.1.3 0 .4l-.3.4-.3.3c-.1.1-.2.3-.1.5.2.3.7 1.1 1.4 1.7.9.8 1.6 1 1.9 1.1.2.1.4.1.5-.1l.7-.9c.2-.2.3-.2.5-.1l1.7.8c.2.1.3.2.4.2.1.2.1.7-.1 1.1z"/></svg>';

function pinjampastiWaUrl(type, second) {
    const text = PINJAMPASTI_WA_MESSAGES[type] || PINJAMPASTI_WA_MESSAGES.admin;
    return 'https://wa.me/' + (second ? PINJAMPASTI_WA_NUMBER_2 : PINJAMPASTI_WA_NUMBER) + '?text=' + encodeURIComponent(text);
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('[data-wa]').forEach(function(el) {
        el.href = pinjampastiWaUrl(el.dataset.wa, el.dataset.waN === '2');
        el.target = '_blank';
        el.rel = 'noopener';
    });

    // Logo WhatsApp di tombol kartu bantuan
    document.querySelectorAll('.pinjampasti-wa-btn').forEach(function(btn) {
        btn.insertAdjacentHTML('afterbegin', PINJAMPASTI_WA_ICON);
    });

    // Tombol WhatsApp melayang di semua halaman
    const float = document.createElement('a');
    float.className = 'pinjampasti-wa-float';
    float.href = pinjampastiWaUrl('admin');
    float.target = '_blank';
    float.rel = 'noopener';
    float.setAttribute('aria-label', 'Hubungi admin via WhatsApp');
    float.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.5 1.7 6.4L3 29l6.8-1.8A13 13 0 0 0 16 29c7.2 0 13-5.8 13-13S23.2 3 16 3zm0 23.7c-2 0-3.9-.6-5.6-1.6l-.4-.2-4 1 1.1-3.9-.3-.4A10.7 10.7 0 1 1 16 26.7zm5.9-8c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.7 8.7 0 0 1-4.3-3.8c-.3-.6.3-.5.9-1.700.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.100-.9.400s-1.2 1.2-1.2 2.9 1.2 3.3 1.400 3.500 2.400 3.700 5.800 5.100c2.100.9 2.9.9 3.9.8.6-.1 1.9-.8 2.2-1.500s.3-1.400.2-1.500-.3-.2-.6-.3z"/></svg><span>Chat Admin</span>';
    document.body.appendChild(float);
});
