window.addEventListener("load", () => {
    window.dispatchEvent(new Event("scroll"));
});

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const max = window.innerHeight * 1.5;
    const ratio = Math.min(scrollY / max, 1);

    // Curtain
    const leftCurtain = document.querySelector(".curtain.left");
    const rightCurtain = document.querySelector(".curtain.right");
    const opacity = ratio * 0.7;
    const leftX = 100 - ratio * 100;
    const rightX = ratio * 100;

    if (leftCurtain && rightCurtain) {
        leftCurtain.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
        rightCurtain.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
        leftCurtain.style.clipPath = `polygon(0 0, ${leftX}% 0, 0 100%)`;
        rightCurtain.style.clipPath = `polygon(100% 0, 100% 100%, ${rightX}% 0)`;
    }

    // text parallax + scale
    const text = document.querySelector("#scene-text");
    if (text) {
        const topOffset = 10 + ratio * 70;
        const scale = 1 + ratio * 1.5;
        text.style.top = `${topOffset}vh`;
        text.style.transform = `translateX(-50%) scale(${scale})`;
    }

    // image parallax
    const image = document.querySelector(".intro-image img");
    if (image) {

        const offset = scrollY * 0.2;
        image.style.transform = `translateY(${offset}px)`;
    }

    // about text parallax
    const aboutText = document.querySelector("#about-text");
    const aboutSection = document.querySelector(".about-background");
    const targetSection = document.querySelector(".about-section");

    if (aboutText && aboutSection && targetSection) {
        let xOffset = 50 - ratio * 100;
        const rawYOffset = 30 + ratio * 100;
        const scale = 1 + ratio * 3.5;
        const yOffset = Math.min(rawYOffset, 50);

        xOffset = Math.max(xOffset, 15);

        aboutText.style.left = `${xOffset}%`;
        aboutText.style.top = `${yOffset}vh`;
        aboutText.style.transform = `translateX(-50%) scale(${scale})`;

        const sectionTopInPage = targetSection.offsetTop;
        const viewportBottom = window.scrollY + window.innerHeight;

        if (viewportBottom > sectionTopInPage) {
            const textRect = aboutText.getBoundingClientRect();
            const sectionRect = targetSection.getBoundingClientRect();
            const textCenter = textRect.top + textRect.height / 2;
            const sectionCenter = sectionRect.top + sectionRect.height / 2;
            const textCenterTop = sectionCenter - textRect.height / 2;

            if (textRect.bottom > sectionRect.top) {
                aboutText.style.color = "#ffffff";
            } else {
                aboutText.style.color = "#2c3e50";
            }

            if (Math.abs(textCenter - sectionCenter) < 2) {
                aboutText.style.top = `${textCenterTop}px`;
            } else {
                const yOffset = Math.min(rawYOffset, 50);
                aboutText.style.top = `${yOffset}vh`;
            }

            aboutText.style.left = `${xOffset}%`;
            aboutText.style.transform = `translateX(-50%) scale(${scale})`;
        } else {
            // 섹션 안 보이면 항상 기본 색
            aboutText.style.color = "#2c3e50";
        }
    }

    document.querySelector('.about-background')
        .style.backgroundPositionY = `${scrollY * 0.5}px`;
});

// TypeIt text typing effect
new TypeIt(".intro-text", {
    speed: 20,
    lifeLike: false,
    waitUntilVisible: true
}).pause(1000).go();
document.querySelector("#about-text")
