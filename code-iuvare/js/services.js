export function initServices() {

    // Accordion img toggle
    function toggleAccordion(headerEl) {
        const block = headerEl.closest('.service-block');
        const contentEl = headerEl.nextElementSibling;
        const icon = headerEl.querySelector('.toggle-icon');
        const isOpen = block.classList.contains('open');

        if (isOpen) {
            contentEl.style.height = "0px";
            contentEl.style.opacity = "0";
            block.classList.remove('open');
            icon.classList.remove("rotate");
        } else {
            contentEl.style.height = contentEl.scrollHeight + "px";
            contentEl.style.opacity = "1";
            block.classList.add('open');
            icon.classList.add("rotate");
        }
    }

    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', function() {
            toggleAccordion(this);
        });
    });

    // service blocks parallax
    const serviceBlocks = document.querySelectorAll(".service-block");

    window.addEventListener("scroll", () => {
        const windowHeight = window.innerHeight;

        serviceBlocks.forEach(block => {
            const rect = block.getBoundingClientRect();
            const offsetTop = rect.top;
            const distanceFromCenter = offsetTop - windowHeight / 2;
            const parallaxSpeed = 0.4;
            const translateY = distanceFromCenter * parallaxSpeed;
            block.style.transform = `translateY(${translateY}px)`;
        });
    });

    // title parallax
    const text = document.querySelector(".service-main-text");

    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        const max = window.innerHeight * 1.5;
        const ratio = Math.min(scrollY / max, 1);

        if (text) {
            const yOffset = (1 - ratio) * 30;
            const scale = 1 + ratio * 0.5;
            text.style.transform = `translateY(-${yOffset}vh) scale(${scale})`;
        }
    });
}
