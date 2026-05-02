/**
 * MYSTERIO PORTFOLIO - CORE ENGINE
 * Features: Discord Webhook, IP Tracker, Premium Cursor, Scroll Reveal
 */

// --- 1. CONFIGURATION ---
const DISCORD_WEBHOOK_URL = "https://discordapp.com/api/webhooks/1499825178392395846/TYpjw_zFO4h24LVQAkdqqcNZNPGr5AiX23SMzQxrFjhDcxmkQ9ZJkwjWNvdCvoELe8RR"; 

// --- 2. PREMIUM CURSOR LOGIC ---
const dot = document.getElementById('cursor-dot');
const outline = document.getElementById('cursor-outline');

window.addEventListener('mousemove', (e) => {
    // Immediate dot movement
    dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    
    // Smooth outline animation
    outline.animate({
        left: `${e.clientX}px`,
        top: `${e.clientY}px`
    }, { duration: 400, fill: "forwards" });
});

// Cursor scaling on hover
const hoverTargets = 'a, button, .cert-card, .bento-item, input, textarea, .profile-img';
document.querySelectorAll(hoverTargets).forEach(item => {
    item.addEventListener('mouseenter', () => {
        outline.style.transform = 'translate(-50%, -50%) scale(1.8)';
        outline.style.background = 'rgba(255, 255, 255, 0.1)';
        outline.style.borderColor = 'white';
    });
    item.addEventListener('mouseleave', () => {
        outline.style.transform = 'translate(-50%, -50%) scale(1)';
        outline.style.background = 'transparent';
        outline.style.borderColor = 'var(--accent)';
    });
});

// --- 3. LIVE FOLLOWER COUNTER ---
const counterEl = document.getElementById('follower-count');
const startCounter = () => {
    let target = 30927;
    let current = 0;
    let step = target / 90; // Speed control
    
    const update = () => {
        if (current < target) {
            current += step;
            counterEl.innerText = Math.floor(current).toLocaleString() + "+";
            requestAnimationFrame(update);
        } else {
            counterEl.innerText = target.toLocaleString() + "+";
        }
    };
    update();
};
setTimeout(startCounter, 1000);

// --- 4. DISCORD WEBHOOK + IP TRACKER ---
const contactForm = document.getElementById('my-form'); // Ensure your form has this ID
const submitBtn = document.getElementById('submit-btn');

if(contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        submitBtn.innerText = "> Transmitting Data...";
        submitBtn.disabled = true;

        // Fetch User IP
        let userIp = "Hidden/Unknown";
        try {
            const ipRes = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipRes.json();
            userIp = ipData.ip;
        } catch (err) { console.error("IP Logging failed"); }

        // Get Form Data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Discord Embed Payload (Cyber Style)
        const payload = {
            embeds: [{
                title: "🚨 INCOMING DATA PACKET",
                color: 3066993, // Premium Green
                fields: [
                    { name: "👤 IDENTITY", value: `\`${name}\``, inline: true },
                    { name: "📧 ENDPOINT", value: `\`${email}\``, inline: true },
                    { name: "🌐 SOURCE IP", value: `\`${userIp}\``, inline: false },
                    { name: "💬 TRANSMISSION", value: `>>> ${message}` }
                ],
                footer: { text: "Mysterio Terminal OS v2.7" },
                timestamp: new Date()
            }]
        };

        // Send to Discord
        try {
            const response = await fetch(DISCORD_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                submitBtn.innerText = "SUCCESS: Message Executed";
                submitBtn.style.background = "#27c93f";
                contactForm.reset();
            } else {
                throw new Error("Webhook Error");
            }
        } catch (err) {
            submitBtn.innerText = "ERROR: UPLINK FAILED";
            submitBtn.style.background = "#ff5f56";
            submitBtn.disabled = false;
        }
    });
}

// --- 5. SCROLL REVEAL ANIMATION ---
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
let autoClose;

function showPopup(imgSrc) {
    const popup = document.getElementById('certPopup');
    const pImg = document.getElementById('popupImg');
    const bar = document.querySelector('.timer-bar');

    pImg.src = imgSrc;
    popup.style.display = 'block';

    // Reset and start animation
    bar.classList.remove('animate-timer');
    void bar.offsetWidth; // Force reflow
    bar.classList.add('animate-timer');

    // Auto close logic
    clearTimeout(autoClose);
    autoClose = setTimeout(() => {
        closePopup();
    }, 7000);
}

function closePopup() {
    document.getElementById('certPopup').style.display = 'none';
}
let popupTimeout;

function showPopup(imgSrc, title) {
    const popup = document.getElementById('certPopup');
    const pImg = document.getElementById('popupImg');
    const pTitle = document.getElementById('popupTitle');
    const pBar = document.getElementById('progressBar');

    pImg.src = imgSrc;
    pTitle.innerText = title;
    popup.style.display = 'block';

    // Animation restart
    pBar.style.animation = 'none';
    void pBar.offsetWidth; // Trigger reflow
    pBar.style.animation = 'timerFill 7s linear forwards';

    // Clear previous timer and set new one
    clearTimeout(popupTimeout);
    popupTimeout = setTimeout(() => {
        closePopup();
    }, 7000);
}

function closePopup() {
    document.getElementById('certPopup').style.display = 'none';
}

// Esc key se bhi band ho jaye
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closePopup();
});
