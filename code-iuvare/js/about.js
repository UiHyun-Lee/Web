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
        let scale = 1 + ratio * 3.5;
        const yOffset = Math.min(rawYOffset, 60);
        xOffset = Math.max(xOffset, 15);

        aboutText.style.left = `${xOffset}%`;
        aboutText.style.top = `${yOffset}vh`;
        aboutText.style.transform = `translateX(-50%) scale(${scale})`;


        const textRect = aboutText.getBoundingClientRect();
        const sectionRect = targetSection.getBoundingClientRect();
        const textCenter = textRect.top + textRect.height / 2;
        const sectionCenter = sectionRect.top + sectionRect.height / 2;

        // text opacity
        let opacity = 1;
        const fadeThreshold = sectionRect.height / 2;

        if (textCenter > sectionRect.top && textCenter < sectionRect.bottom) {
            const distance = Math.abs(textCenter - sectionCenter);
            opacity = Math.max(0, 1 - distance / fadeThreshold);
        } else if (textRect.bottom > sectionRect.bottom) {
            opacity = 0;
        } else {
            opacity = 1;
        }

        aboutText.style.opacity = opacity.toFixed(2);

        // text color
        const sectionTopInPage = targetSection.offsetTop;
        const viewportBottom = window.scrollY + window.innerHeight;

        if (viewportBottom > sectionTopInPage) {
            const textRect = aboutText.getBoundingClientRect(); // about text
            const sectionRect = targetSection.getBoundingClientRect(); // about section

            if (textRect.bottom > sectionRect.top) {
                aboutText.style.color = "#ffffff";
            } else {
                aboutText.style.color = "#2c3e50";
            }
        } else {
            // default
            aboutText.style.color = "#2c3e50";
        }
    }
    // about parallax
    document.querySelector('.about-background')
        .style.backgroundPositionY = `${scrollY * 0.5}px`;

    // count-up aniamtion
    const counters = document.querySelectorAll(".counter");

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            entry.target.textContent = '0';

            if (entry.isIntersecting) {
                const targetStr = entry.target.getAttribute('data-target');
                const targetNum = parseFloat(targetStr);
                const unit = entry.target.getAttribute('data-unit') || ''; // 단위

                const decimalPlaces = targetStr.includes('.') ? targetStr.split('.')[1].length : 0;

                let count = 0;
                const increment = targetNum / 100;

                const updateCounter = () => {
                    count += increment;

                    if (count >= targetNum) {
                        entry.target.textContent = Number(targetNum).toFixed(decimalPlaces) + unit;
                    } else {
                        entry.target.textContent = count.toFixed(decimalPlaces) + unit;
                        requestAnimationFrame(updateCounter);
                    }
                };

                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    counters.forEach((counter) => {
        counterObserver.observe(counter);
    });


});
//
// // article slide-up animation
// const articles = document.querySelectorAll(".article");
//
// const articleObserver = new IntersectionObserver((entries, observer) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             entry.target.classList.add('show');
//         } else {
//             entry.target.classList.remove('show');
//         }
//     });
// }, { threshold: 0.3 });
//
// articles.forEach(article => {
//     articleObserver.observe(article);
// });
//
