const text = document.querySelector("#scene-text");
const navbar = document.querySelector(".navbar-wrapper");
const sceneOne = document.querySelector(".scene.one");
const paragraph = document.getElementById("intro-paragraph");


document.addEventListener("DOMContentLoaded", () => {
    const childNodes = Array.from(paragraph.childNodes);
    paragraph.innerHTML = '';

    childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            const chars = [...node.textContent];
            chars.forEach(char => {
                const span = document.createElement("span");
                span.textContent = char;
                paragraph.appendChild(span);
            });
        } else {
            paragraph.appendChild(node); // <br>
        }
    });

    const spans = paragraph.querySelectorAll("span");

    window.addEventListener("scroll", () => {
        const rect = paragraph.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const start = windowHeight * 0.2;
        const end = windowHeight * 0.8;
        const progress = (rect.top - start) / (end - start);
        const ratio = Math.max(0, Math.min(1, 1 - progress));

        const speedFactor = 0.5; // Adjust this value to change the speed of the color transition
        const total = spans.length;
        const visibleChars = Math.floor(total * ratio );

        spans.forEach((span, i) => {
            span.style.color = i < visibleChars ? "black" : "gray";
        });
    });
});

// mission statement text
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const max = window.innerHeight * 7.5; // Todo
    const ratio = Math.min(scrollY / max, 1);

    // text parallax + scale
    if (text) {
        const topOffset = 10 + ratio * 90;
        const scale = 1 + ratio * 1.5;
        text.style.top = `${topOffset}vh`;
        text.style.transform = `translateX(-150%) scale(${scale})`;
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navbar.classList.remove("visible");
                } else {
                    navbar.classList.add("visible");
                }
            });
        },
        {
            root: null, // viewport
            threshold: 0.1
        }
    );
    observer.observe(sceneOne);
});

// Logo holo
const container = document.querySelector('.text-card-container');
const overlay = container.querySelector('.overlay');
const texts = container.querySelector('.shiny-text');

let ticking = false;
let isMouseInside = false;
let lastX = 0, lastY = 0;
let leaveTimeout = null;

container.addEventListener('mouseenter', () => {
    isMouseInside = true;
    clearTimeout(leaveTimeout);
});

container.addEventListener('mousemove', (e) => {
    isMouseInside = true;
    clearTimeout(leaveTimeout);

    const rect = container.getBoundingClientRect();
    const offsetX = Math.floor((e.clientX - rect.left) / 10) * 10;
    const offsetY = Math.floor((e.clientY - rect.top) / 10) * 10;

    if (Math.abs(offsetX - lastX) < 5 && Math.abs(offsetY - lastY) < 5) return;
    lastX = offsetX;
    lastY = offsetY;

    if (!ticking) {
        window.requestAnimationFrame(() => {
            const centerX = container.clientWidth / 2;
            const centerY = container.clientHeight / 2;

            const rotateX = (offsetY - centerY) / 10;
            const rotateY = (offsetX - centerX) / -10;
            const fontSize = parseFloat(window.getComputedStyle(texts).fontSize);
            const blurRadius = fontSize * 0.3;

            container.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            overlay.style.opacity = 1;
            overlay.style.background = `radial-gradient(circle at ${offsetX}px ${offsetY}px, rgba(255,255,255,0.6), transparent 60%)`;
            texts.style.textShadow = `${(offsetX - centerX)/10}px ${(offsetY - centerY)/10}px ${blurRadius}px rgba(255,255,255,0.4)`;

            ticking = false;
        });
        ticking = true;
    }
});

container.addEventListener('mouseleave', () => {
    isMouseInside = false;

    leaveTimeout = setTimeout(() => {
        if (!isMouseInside) {
            container.style.transition = 'transform 0.9s ease';
            container.style.transform = 'rotateX(0deg) rotateY(0deg)';
            overlay.style.opacity = 0;
            texts.style.textShadow = 'none';
        }
    }, 300);
});
