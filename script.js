/**
 * MYSTERIO PORTFOLIO - CORE ENGINE
 */

// --- 1. CONFIGURATION ---
// Ek hi jagah webhook URL ko set rakha hai
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1521604338039132360/bcihAt7OVGLvYJggRejuZc6Fln-II01pZx1_RjZDMIvSOrz9OfWfPouDvYvQ2PZElixC"; 

// --- 2. PREMIUM CURSOR LOGIC ---
const dot = document.getElementById('cursor-dot');
const outline = document.getElementById('cursor-outline');

window.addEventListener('mousemove', (e) => {
    if(dot) dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    if(outline) {
        outline.animate({
            left: `${e.clientX}px`,
            top: `${e.clientY}px`
        }, { duration: 400, fill: "forwards" });
    }
});

// Cursor scaling on hover including all new additions
const hoverTargets = 'a, button, .cert-card, .poetry-card, .tool-card, input, textarea, .profile-img, .dock-item, nav .logo';
document.querySelectorAll(hoverTargets).forEach(item => {
    item.addEventListener('mouseenter', () => {
        if(outline) {
            outline.style.transform = 'translate(-50%, -50%) scale(1.8)';
            outline.style.background = 'rgba(255, 255, 255, 0.1)';
            outline.style.borderColor = 'white';
        }
    });
    item.addEventListener('mouseleave', () => {
        if(outline) {
            outline.style.transform = 'translate(-50%, -50%) scale(1)';
            outline.style.background = 'transparent';
            outline.style.borderColor = 'var(--accent)';
        }
    });
});

// --- 3. LIVE FOLLOWER COUNTER ---
const counterEl = document.getElementById('follower-count');
const startCounter = () => {
    if(!counterEl) return;
    let target = 30927;
    let current = 0;
    let step = target / 90;
    
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

// --- 4. DISCORD UPLINK ENGINE (DIRECT VIA REPO ENVIRONMENT) ---
// FIXED: Yahan se double 'const' declaration ko poora hata diya hai taaki crash na ho
const contactForm = document.getElementById('my-form');
const submitBtn = document.getElementById('submit-btn');

if(contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if(submitBtn) {
            submitBtn.innerText = "> Transmitting Data...";
            submitBtn.disabled = true;
        }

        let userIp = "Hidden/Unknown";
        try {
            const ipRes = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipRes.json();
            userIp = ipData.ip;
        } catch (err) { console.error("IP Logging failed"); }

        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        const payload = {
            embeds: [{
                title: "📡 INCOMING DATA PACKET",
                color: 3066993,
                fields: [
                    { name: "👤 IDENTITY", value: `\`${name}\``, inline: true },
                    { name: "📩 ENDPOINT", value: `\`${email}\``, inline: true },
                    { name: "🌐 SOURCE IP", value: `\`${userIp}\``, inline: false },
                    { name: "💬 TRANSMISSION", value: `>>> ${message}` }
                ],
                footer: { text: "Mysterio Terminal OS v2.7" },
                timestamp: new Date()
            }]
        };

        try {
            const response = await fetch(DISCORD_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                if(submitBtn) {
                    submitBtn.innerText = "SUCCESS: Message Executed";
                    submitBtn.style.background = "#27c93f";
                }
                contactForm.reset();
            } else {
                throw new Error("Transmission Rejected");
            }
        } catch (err) {
            if(submitBtn) {
                submitBtn.innerText = "ERROR: UPLINK FAILED";
                submitBtn.style.background = "#ff5f56";
                submitBtn.disabled = false;
            }
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

// --- 6. CERTIFICATE POPUP SYSTEM ---
let popupTimeout;

function showPopup(imgSrc, title) {
    const popup = document.getElementById('certPopup');
    const pImg = document.getElementById('popupImg');
    const pTitle = document.getElementById('popupTitle');
    const pBar = document.getElementById('progressBar');

    if (popup && pImg && pTitle && pBar) {
        pImg.src = imgSrc;
        pTitle.innerText = title;
        popup.style.display = 'block';

        pBar.style.animation = 'none';
        void pBar.offsetWidth; // Force reflow
        pBar.style.animation = 'timerFill 7s linear forwards';

        clearTimeout(popupTimeout);
        popupTimeout = setTimeout(() => {
            closePopup();
        }, 7000);
    }
}

function closePopup() {
    const popup = document.getElementById('certPopup');
    if (popup) popup.style.display = 'none';
}

// --- 7. DOCK INTERACTIVE TRACKER & TOOLS ENGINE ---
const dockItems = document.querySelectorAll('.dock-item');
const portfolioSections = document.querySelectorAll('section');

function showToolPopup(name, description, link, terminalLog) {
    const popup = document.getElementById('toolPopup');
    const tName = document.getElementById('toolPopupName');
    const tTitle = document.getElementById('toolDisplayTitle');
    const tDesc = document.getElementById('toolDisplayDesc');
    const tLog = document.getElementById('toolDisplayTerminal');
    const tBtn = document.getElementById('toolExecuteBtn');

    if (popup && tName && tTitle && tDesc && tLog && tBtn) {
        tName.innerText = `${name.toLowerCase().replace(/\s+/g, '_')}.sh`;
        tTitle.innerText = name;
        tDesc.innerText = description;
        tLog.innerText = `[SUCCESS] ${terminalLog}`;
        tBtn.href = link;
        popup.style.display = 'block';
    }
}

function closeToolPopup() {
    const popup = document.getElementById('toolPopup');
    if (popup) popup.style.display = 'none';
}

// Window tracker logic for floating active states
window.addEventListener('scroll', () => {
    let currentSectionId = "";
    
    if (window.pageYOffset < 300) {
        dockItems.forEach(item => item.classList.remove('active-dock'));
        document.querySelector('.dock-profile-btn')?.classList.add('active-dock');
        return;
    }

    portfolioSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
            currentSectionId = section.getAttribute('id') || "";
        }
    });

    dockItems.forEach(item => {
        item.classList.remove('active-dock');
        if (item.getAttribute('href') === `#${currentSectionId}`) {
            item.classList.add('active-dock');
        }
    });
});

// ESC Key Event Handler for Global Close
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        closePopup();
        closeToolPopup();
    }
});
