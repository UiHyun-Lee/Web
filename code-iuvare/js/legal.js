const navToggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.menu');

document.addEventListener("DOMContentLoaded", () => {


    if (navToggle && menu) {
        navToggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });

        const menuLinks = document.querySelectorAll('.menu a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    menu.classList.remove('active');
                }
            });
        });
    }
});