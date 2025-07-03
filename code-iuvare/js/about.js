export function initAbout() {

    const paragraph = document.getElementById("about-intro-paragraph");
// Typing effect for the intro paragraph
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
            const visibleChars = Math.floor(total * ratio);

            spans.forEach((span, i) => {
                span.style.color = i < visibleChars ? "black" : "gray";
            });
        });
    });

    const text = document.querySelector(".main-text");
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


// counter
    const counters = document.querySelectorAll(".counter");
    const containerWrapper = document.querySelector(".container-wrapper");

// (2) Counter 애니메이션을 animationend 이후에 시작
    containerWrapper.addEventListener("animationend", () => {
        counters.forEach(counter => {
            const targetStr = counter.getAttribute('data-target');
            const targetNum = parseFloat(targetStr);
            const unit = counter.getAttribute('data-unit') || '';
            const decimalPlaces = targetStr.includes('.') ? targetStr.split('.')[1].length : 0;

            let count = 0;
            const increment = targetNum / 100;

            const updateCounter = () => {
                count += increment;

                if (count >= targetNum) {
                    counter.textContent = Number(targetNum).toFixed(decimalPlaces) + unit;
                } else {
                    counter.textContent = count.toFixed(decimalPlaces) + unit;
                    requestAnimationFrame(updateCounter);
                }
            };

            counter.textContent = '0'; // 초기화
            updateCounter();
        });
    }, {once: true});

// 스크롤 트리거 초기화
    window.addEventListener("load", () => {
        window.dispatchEvent(new Event("scroll"));
    });
}