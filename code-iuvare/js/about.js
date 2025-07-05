export function initAbout() {

// Typing effect for the intro paragraph
    const paragraph = document.getElementById("about-intro-paragraph");

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