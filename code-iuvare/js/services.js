function toggleAccordion(headerEl) {
    const contentEl = headerEl.nextElementSibling;
    const icon = headerEl.querySelector('.toggle-icon');

    const isOpen = contentEl.style.height && contentEl.style.height !== "0px";

    if (isOpen) {
        contentEl.style.height = "0px";
        contentEl.style.opacity = "0";
        icon.textContent = "+";
    } else {
        contentEl.style.height = contentEl.scrollHeight + "px";
        contentEl.style.opacity = "1";
        icon.textContent = "−";
    }
}