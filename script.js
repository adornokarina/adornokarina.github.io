// Smooth scrolling para o formulário
function scrollToForm() {
    document.getElementById('form-section').scrollIntoView({
        behavior: 'smooth'
    });
}

// Animações ao scroll
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

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.problem-card, .transformation-item, .process-step, .testimonial-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Validação e envio do formulário
document.getElementById('leadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Validação básica
    if (!data.name || !data.email || !data.phone || !data.profession) {
        showMessage('Por favor, preencha todos os campos.', 'error');
        return;
    }
    
    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showMessage('Por favor, insira um email válido.', 'error');
        return;
    }
    
    // Simular envio (aqui você integraria com seu backend)
    const submitButton = document.querySelector('.form-submit');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        showMessage('Obrigada! Em breve entraremos em contato para agendar sua consulta gratuita.', 'success');
        this.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Analytics/tracking aqui
        console.log('Lead capturado:', data);
    }, 2000);
});

// Função para mostrar mensagens
function showMessage(message, type) {
    // Remove mensagem anterior se existir
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    // Estilos da mensagem
    messageDiv.style.cssText = `
        padding: 15px 20px;
        border-radius: 10px;
        margin-top: 20px;
        text-align: center;
        font-weight: 500;
        ${type === 'success' 
            ? 'background: rgba(32, 178, 170, 0.1); color: #40e0d0; border: 1px solid #20b2aa;' 
            : 'background: rgba(255, 99, 99, 0.1); color: #ff6363; border: 1px solid #ff6363;'
        }
    `;
    
    document.querySelector('.cta-content').appendChild(messageDiv);
    
    // Remove a mensagem após 5 segundos
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Efeito parallax suave no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-img');
    
    if (hero && heroImage) {
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// Animação de digitação para o título
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Contador de visitantes (simulado)
function updateVisitorCounter() {
    const counter = document.createElement('div');
    counter.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(32, 178, 170, 0.9);
        color: white;
        padding: 10px 15px;
        border-radius: 25px;
        font-size: 0.9rem;
        z-index: 1000;
        backdrop-filter: blur(10px);
    `;
    
    const visitors = Math.floor(Math.random() * 50) + 120;
    counter.textContent = `${visitors} mulheres visualizando agora`;
    
    document.body.appendChild(counter);
    
    // Remove após 10 segundos
    setTimeout(() => {
        counter.remove();
    }, 10000);
}

// Inicializar contador após 3 segundos
setTimeout(updateVisitorCounter, 3000);

// Efeito de hover nas imagens
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.hero-img, .transform-img');
    
    images.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.filter = 'brightness(1.1) contrast(1.1)';
        });
        
        img.addEventListener('mouseleave', () => {
            img.style.filter = 'brightness(1) contrast(1)';
        });
    });
});

// Lazy loading para imagens
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Prevenção de spam no formulário
let lastSubmission = 0;
const SUBMISSION_COOLDOWN = 30000; // 30 segundos

document.getElementById('leadForm').addEventListener('submit', function(e) {
    const now = Date.now();
    if (now - lastSubmission < SUBMISSION_COOLDOWN) {
        e.preventDefault();
        showMessage('Aguarde um momento antes de enviar novamente.', 'error');
        return;
    }
    lastSubmission = now;
});

// Tracking de eventos (para analytics)
function trackEvent(eventName, properties = {}) {
    // Aqui você integraria com Google Analytics, Facebook Pixel, etc.
    console.log('Event tracked:', eventName, properties);
    
    // Exemplo para Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
}

// Track scroll depth
let maxScroll = 0;
window.addEventListener('scroll', () => {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    
    if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        // Track milestones
        if (scrollPercent >= 25 && maxScroll < 25) {
            trackEvent('scroll_25_percent');
        } else if (scrollPercent >= 50 && maxScroll < 50) {
            trackEvent('scroll_50_percent');
        } else if (scrollPercent >= 75 && maxScroll < 75) {
            trackEvent('scroll_75_percent');
        } else if (scrollPercent >= 90 && maxScroll < 90) {
            trackEvent('scroll_90_percent');
        }
    }
});

// Track CTA clicks
document.querySelectorAll('.cta-primary').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('cta_click', {
            button_text: button.textContent,
            button_location: button.closest('section').className
        });
    });
});
