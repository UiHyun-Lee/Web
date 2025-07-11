import { initAbout } from './about.js';
import { initServices } from './services.js';

//navbar
const navbar = document.querySelector(".navbar-wrapper");
const sceneTwo = document.querySelector(".scene.two");

function checkNavbar() {
    const rect = sceneTwo.getBoundingClientRect();
    const reached = rect.top <= 0;

    if (reached) {
        navbar.classList.add("visible");
    } else {
        navbar.classList.remove("visible");
    }
}

window.addEventListener("scroll", checkNavbar);
window.addEventListener("resize", checkNavbar);
window.addEventListener("DOMContentLoaded", checkNavbar);



document.addEventListener("DOMContentLoaded", () => {
    initAbout();
    initServices();
});

// Typing effect for the intro paragraph
const paragraph = document.getElementById("home-intro-paragraph");

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
            paragraph.appendChild(node);
        }
    });

    const spans = paragraph.querySelectorAll("span");

    function updateTypingEffect() {
        const rect = paragraph.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const appear = windowHeight * 0.95;
        const disappear = -rect.height * 0.6;

        let ratio = (appear - rect.top) / (appear - disappear);
        ratio = Math.max(0, Math.min(1, ratio));

        const total = spans.length;
        const visibleChars = Math.floor(total * ratio);

        spans.forEach((span, i) => {
            span.style.color = i < visibleChars ? "black" : "gray";
        });
    }

    window.addEventListener("scroll", updateTypingEffect);
    window.addEventListener("resize", updateTypingEffect);
    updateTypingEffect();
});


// Parallax effect for the intro section
const whyHeadline = document.getElementById('why-headline');
const whyWrapper = whyHeadline.parentElement;

// parallax effect for the headlines
function parallaxHeadline(headline, wrapper, xStart = -25, xEnd = 0, threshold = 0.2, opacityStart = 0.2, opacityEnd = 1) {
    const rect = wrapper.getBoundingClientRect();
    const winHeight = window.innerHeight;

    const visible =
        Math.max(
            0,
            Math.min(
                1,
                (winHeight - Math.max(0, rect.top)) / Math.min(rect.height, winHeight)
            )
        );

    if (rect.bottom > 0 && rect.top < winHeight * (1 - threshold)) {
        const ratio = Math.min(1, Math.max(0, (winHeight - rect.top) / (winHeight * (1 - threshold))));
        const x = xStart + (xEnd - xStart) * ratio;
        const op = opacityStart + (opacityEnd - opacityStart) * ratio;

        headline.style.transform = `translateX(${x}%)`;
        headline.style.opacity = op;
    } else {
        headline.style.transform = `translateX(${xStart}%)`;
        headline.style.opacity = opacityStart;
    }
}

window.addEventListener('scroll', () => {
    parallaxHeadline(whyHeadline, whyWrapper, -25, 18, 0.2, 0.2, 1);
});

window.addEventListener('DOMContentLoaded', () => {
    parallaxHeadline(whyHeadline, whyWrapper, -25, 18, 0.2, 0.2, 1);
});

const navToggle = document.querySelector('.nav-toggle');
const menu      = document.querySelector('.menu');

navToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
});







