function toggleAccordion(headerEl) {
    const contentEl = headerEl.nextElementSibling;
    const icon = headerEl.querySelector('.toggle-icon');

    const isOpen = contentEl.style.height && contentEl.style.height !== "0px";

    if (isOpen) {
        contentEl.style.height = "0px";
        contentEl.style.opacity = "0";
        icon.classList.remove("rotate");
    } else {
        contentEl.style.height = contentEl.scrollHeight + "px";
        contentEl.style.opacity = "1";
        icon.classList.add("rotate");
    }
}

const serviceBlocks = document.querySelectorAll(".service-block");

window.addEventListener("scroll", () => {
    // const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    serviceBlocks.forEach(block => {
        const rect = block.getBoundingClientRect();
        const offsetTop = rect.top;

        // 화면 중앙에서 얼마나 떨어졌는지 기준
        const distanceFromCenter = offsetTop - windowHeight / 2;

        // parallax 강도 설정 (값이 작을수록 느리게 움직임)
        const parallaxSpeed = 0.4;

        // translateY 값 계산
        const translateY = distanceFromCenter * parallaxSpeed;

        // 적용
        block.style.transform = `translateY(${translateY}px)`;
    });
});