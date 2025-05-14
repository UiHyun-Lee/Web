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

});

// TypeIt text typing effect
new TypeIt(".intro-text", {
    speed: 20,
    lifeLike: false,
    waitUntilVisible: true
}).pause(1000).go();
document.querySelector("#about-text")
