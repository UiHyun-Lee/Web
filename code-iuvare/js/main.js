window.addEventListener("load", () => {
    window.dispatchEvent(new Event("scroll"));
});

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const max = window.innerHeight * 1.5;
    const ratio = Math.min(scrollY / max, 1);

    const leftCurtain = document.querySelector(".curtain.left");
    const rightCurtain = document.querySelector(".curtain.right");

    const opacity = ratio * 0.7;
    leftCurtain.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
    rightCurtain.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;

    const leftX = 100 - ratio * 100;
    const rightX = ratio * 100;

    // ✅ 여기가 핵심입니다 — 백틱 사용!
    leftCurtain.style.clipPath = `polygon(0 0, ${leftX}% 0, 0 100%)`;
    rightCurtain.style.clipPath = `polygon(100% 0, 100% 100%, ${rightX}% 0)`;
});

let text = document.querySelector(".scene-text");

new TypeIt(".intro-text", {
    speed: 20,
    lifeLike: false,
    waitUntilVisible: true}).pause(1000)
                            .go();

document.addEventListener("DOMContentLoaded", () => {

})