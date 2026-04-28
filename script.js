// 1. Counter Animation
const counter = document.getElementById('follower-count');
const updateCounter = () => {
    let target = 30400;
    let count = 0;
    let speed = 300;
    const update = () => {
        if (count < target) {
            count += speed;
            counter.innerText = Math.floor(count).toLocaleString() + "+";
            requestAnimationFrame(update);
        } else {
            counter.innerText = target.toLocaleString() + "+";
        }
    }
    update();
}
setTimeout(updateCounter, 1000);

// 2. Cursor Behavior
const dot = document.getElementById('cursor-dot');
const outline = document.getElementById('cursor-outline');

window.addEventListener('mousemove', (e) => {
    dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    outline.style.left = `${e.clientX}px`;
    outline.style.top = `${e.clientY}px`;
});

// 3. Hover Scaling
document.querySelectorAll('.cert-card, .social-card, .profile-img, .logo').forEach(item => {
    item.addEventListener('mouseenter', () => {
        outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        outline.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    });
    item.addEventListener('mouseleave', () => {
        outline.style.transform = 'translate(-50%, -50%) scale(1)';
        outline.style.borderColor = 'var(--accent)';
    });
});

// 4. Scroll Reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
// Terminal Submit Animation
const contactForm = document.querySelector('.contact-form');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = document.querySelector('.exec-btn');
        
        btn.innerText = "> TRANSMITTING DATA...";
        btn.style.opacity = "0.7";
        
        setTimeout(() => {
            btn.innerText = "SUCCESS: MESSAGE EXECUTED";
            btn.style.background = "#27c93f";
            btn.style.opacity = "1";
            contactForm.reset();
        }, 2000);
    });
}

// Add terminal inputs to cursor scale effect
document.querySelectorAll('input, textarea, .exec-btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
        const outline = document.getElementById('cursor-outline');
        outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        outline.style.borderColor = 'white';
    });
    el.addEventListener('mouseleave', () => {
        const outline = document.getElementById('cursor-outline');
        outline.style.transform = 'translate(-50%, -50%) scale(1)';
        outline.style.borderColor = 'var(--accent)';
    });
});