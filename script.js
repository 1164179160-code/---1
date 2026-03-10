// 视差滚动效果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // 英雄区视差
    const hero = document.querySelector('.hero-section');
    if (hero) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
    
    // 车型卡片视差
    const parallaxCards = document.querySelectorAll('.parallax-card');
    parallaxCards.forEach((card, index) => {
        const speed = parseFloat(card.dataset.speed) || 0.5;
        const cardTop = card.offsetTop;
        const cardHeight = card.offsetHeight;
        const windowHeight = window.innerHeight;
        
        if (scrolled + windowHeight > cardTop && scrolled < cardTop + cardHeight) {
            const yPos = (scrolled + windowHeight - cardTop) * speed;
            card.style.transform = `translateY(-${yPos * 0.1}px)`;
        }
    });
    
    // 导航栏背景透明度
    const navbar = document.querySelector('.navbar');
    if (scrolled > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// 平滑滚动
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

// 卡片悬停3D效果
const cards = document.querySelectorAll('.bike-card, .featured-card, .accessory-card, .feed-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// 滚动动画观察器
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 为所有卡片添加滚动动画
document.querySelectorAll('.bike-card, .featured-card, .accessory-card, .feed-card').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
});

// CTA按钮点击效果
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        document.querySelector('#bikes').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// 添加加载动画
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

// 鼠标跟随光效
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const spotlight = document.createElement('div');
    spotlight.style.position = 'fixed';
    spotlight.style.left = mouseX + 'px';
    spotlight.style.top = mouseY + 'px';
    spotlight.style.width = '300px';
    spotlight.style.height = '300px';
    spotlight.style.background = 'radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)';
    spotlight.style.pointerEvents = 'none';
    spotlight.style.transform = 'translate(-50%, -50%)';
    spotlight.style.zIndex = '1';
    spotlight.style.transition = 'opacity 0.3s';
    
    document.body.appendChild(spotlight);
    
    setTimeout(() => {
        spotlight.style.opacity = '0';
        setTimeout(() => spotlight.remove(), 300);
    }, 100);
});

console.log('🚴 极速骑行 APP 已加载完成');
