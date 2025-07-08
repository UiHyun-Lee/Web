export function initAbout() {

    // parallax effect for the about headline
    const aboutHeadline = document.getElementById('about-headline');
    const aboutWrapper = aboutHeadline;

    function parallaxAbout(headline, wrapper, xStart = 0, xEnd = 0, threshold = 0.15, opacityStart = 0.2, opacityEnd = 1) {
        const rect = wrapper.getBoundingClientRect();
        const winHeight = window.innerHeight;

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
        parallaxAbout(aboutHeadline, aboutWrapper, -20, 50, 0.12, 0.2, 1);
    });
    window.addEventListener('DOMContentLoaded', () => {
        parallaxAbout(aboutHeadline, aboutWrapper, -20, 50, 0.12, 0.2, 1);
    });


// Typing effect for the intro paragraph
    const paragraph = document.getElementById("about-intro-paragraph");
    if (paragraph) {
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
                span.style.color = i < visibleChars ? "gray" : "white";
            });
        }

        window.addEventListener("scroll", updateTypingEffect);
        window.addEventListener("resize", updateTypingEffect);
        updateTypingEffect();
    }

    // parallax & counter
    const shot = document.getElementById('head-shot');
    const wrapper = document.getElementById('container-wrapper');
    const section = document.getElementById('head-shot-wrapper');
    const sticky = section.querySelector('.sticky-area');
    let counterStarted = false;
    let counterTimeout = null;

    function handleParallaxBlocks() {
        const sectionRect = section.getBoundingClientRect();
        const winHeight = window.innerHeight;

        if (sectionRect.bottom <= winHeight * 0.15 || sectionRect.top >= winHeight * 0.92) {
            shot.style.opacity = 0;
            shot.style.transform = `translateX(-60vw)`;
            wrapper.style.opacity = 0;
            wrapper.style.transform = `translateX(50vw)`;
            counterStarted = false;
            return;
        }

        const stickyRect = sticky.getBoundingClientRect();

        const imgStart = winHeight * 0.95;
        const imgEnd = winHeight * 0.38;
        let ratio = (imgStart - stickyRect.top) / (imgStart - imgEnd);
        ratio = Math.max(0, Math.min(1, ratio));

        let textRatio = 0;
        const textStart = winHeight * 0.36;
        const textEnd = winHeight * 0.10;
        if (ratio >= 0.99) {
            let t = (textStart - stickyRect.top) / (textStart - textEnd);
            t = Math.max(0, Math.min(1, t));
            textRatio = t;
        }

        shot.style.opacity = ratio;
        shot.style.transform = `translateX(${-60 + 60 * ratio}vw)`;
        wrapper.style.opacity = textRatio;
        wrapper.style.transform = `translateX(${50 - 50 * textRatio}vw)`;


        if (!counterStarted && textRatio === 1 && wrapper.style.opacity === "1") {
            counterStarted = true;
            counterTimeout = setTimeout(() => {
                startCounters();
            }, 400); // 0.8초 있다가 등장
        }
        if (textRatio < 1) {
            counterStarted = false;
            if (counterTimeout) {
                clearTimeout(counterTimeout);
                counterTimeout = null;
            }
            // 다시 스크롤 올리면 숫자 숨김
            document.querySelectorAll('.counter').forEach(c => {
                c.classList.remove('visible');
                c.textContent = ''; // 또는 '0' 등 원하는 값
            });
        }
    }

    window.addEventListener('scroll', handleParallaxBlocks);
    window.addEventListener('resize', handleParallaxBlocks);
    window.addEventListener('DOMContentLoaded', handleParallaxBlocks);

    // counter
    function startCounters() {
        document.querySelectorAll(".counter").forEach(counter => {
            counter.classList.add('visible');
            const targetStr = counter.getAttribute('data-target');
            const targetNum = parseFloat(targetStr);
            const unit = counter.getAttribute('data-unit') || '';
            const decimalPlaces = targetStr.includes('.') ? targetStr.split('.')[1].length : 0;
            let count = 0;
            const increment = targetNum / 70;

            function updateCounter() {
                count += increment;
                if (count >= targetNum) {
                    counter.textContent = Number(targetNum).toFixed(decimalPlaces) + unit;
                } else {
                    counter.textContent = count.toFixed(decimalPlaces) + unit;
                    requestAnimationFrame(updateCounter);
                }
            }

            counter.textContent = '';
            updateCounter();
        });
    }
}