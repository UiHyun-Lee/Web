window.addEventListener("load", () => {
    window.dispatchEvent(new Event("scroll"));
});

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const max = window.innerHeight * 1.5;
    const ratio = Math.min(scrollY / max, 1);

    // about text parallax
    const aboutText = document.querySelector("#about-text");
    const aboutSection = document.querySelector(".about-background");
    const targetSection = document.querySelector(".about-block");

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
            const textRect = aboutText.getBoundingClientRect(); // about text
            const sectionRect = targetSection.getBoundingClientRect(); // about section
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
            // default
            aboutText.style.color = "#2c3e50";
        }
    }
    // about parallax
    document.querySelector('.about-background')
        .style.backgroundPositionY = `${scrollY * 0.5}px`;
});
