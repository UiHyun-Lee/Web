const text = document.querySelector("#scene-text");
const navbar = document.querySelector(".navbar-wrapper");
const sceneOne = document.querySelector(".scene.one");
const paragraph = document.getElementById("intro-paragraph");

document.addEventListener("DOMContentLoaded", () => {
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
            paragraph.appendChild(node); // <br>
        }
    });

    const spans = paragraph.querySelectorAll("span");

    window.addEventListener("scroll", () => {
        const rect = paragraph.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const start = windowHeight * 0.2;
        const end = windowHeight * 0.8;
        const progress = (rect.top - start) / (end - start);
        const ratio = Math.max(0, Math.min(1, 1 - progress));

        const speedFactor = 0.5; // Adjust this value to change the speed of the color transition
        const total = spans.length;
        const visibleChars = Math.floor(total * ratio );

        spans.forEach((span, i) => {
            span.style.color = i < visibleChars ? "black" : "gray";
        });
    });
});
// const paragraph = document.getElementById("intro-paragraph");
// const introBlock = document.querySelector(".intro-block");
// let typingInstance = null;
// const originalHTML = paragraph.innerHTML; // back up for the full text of Mission statement
//
// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             paragraph.style.visibility = "visible";
//             paragraph.innerHTML = "";
//
//             if (typingInstance) typingInstance.reset();
//
//             typingInstance = new TypeIt("#intro-paragraph", {
//                 speed: 20,
//                 lifeLike: false,
//                 waitUntilVisible: false
//             }).type(originalHTML).go();
//         } else {
//             if (typingInstance) {
//                 typingInstance.reset();
//                 typingInstance = null;
//             }
//             paragraph.innerHTML = "";
//             paragraph.style.visibility = "hidden";
//         }
//     });
// }, { threshold: 0.3 });
// observer.observe(introBlock);
//
// window.addEventListener("load", () => {
//     window.dispatchEvent(new Event("scroll"));
// });

// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             paragraph.style.visibility = "visible";
//         }
//         if (!entry.isIntersecting && typingInstance) {
//             typingInstance.freeze()
//             // paragraph.style.visibility = "hidden";
//         }
//     });
// }, {threshold: 0.3}); // if 30% then go
//
// observer.observe(introBlock);


window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const max = window.innerHeight * 1.5;
    const ratio = Math.min(scrollY / max, 1);

    // text parallax + scale
    if (text) {
        const topOffset = 10 + ratio * 90;
        const scale = 1 + ratio * 1.5;
        text.style.top = `${topOffset}vh`;
        text.style.transform = `translateX(-150%) scale(${scale})`;
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navbar.classList.remove("visible");
                } else {
                    navbar.classList.add("visible");
                }
            });
        },
        {
            root: null, // viewport
            threshold: 0.1
        }
    );
    observer.observe(sceneOne);
});
//
// document.addEventListener("DOMContentLoaded", () => {
//     const observer = new IntersectionObserver(
//         (entries) => {
//             entries.forEach((entry) => {
//                 if (entry.isIntersecting) {
//                     sceneOneText.classList.add("jump-animate");
//
//                     setTimeout(() => {
//                         sceneOneText.classList.remove("jump-animate");
//                     }, 600);
//                 }
//             });
//         },
//         {
//             threshold: 0.5,
//         }
//     );
//     observer.observe(sceneOne);
// });

//
// const hello = document.querySelector(".hello__div");
// setInterval(hello__function, 20000);
//
// function hello__function() {
//     hello.style.display = "none";
//     setTimeout(function () {
//         hello.style.display = "flex";
//     }, 10);
// }
//
// document.addEventListener("DOMContentLoaded", () => {
//
//     let ticking = false;
//
//     function checkJumpTrigger() {
//         const rect = sceneOneText.getBoundingClientRect();
//         const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
//
//         if (isVisible) {
//             sceneOneText.classList.add("jump-animate");
//
//             setTimeout(() => {
//                 sceneOneText.classList.remove("jump-animate");
//             }, 600);
//         }
//     }
//
//     window.addEventListener("scroll", () => {
//         if (!ticking) {
//             window.requestAnimationFrame(() => {
//                 checkJumpTrigger();
//                 ticking = false;
//             });
//             ticking = true;
//         }
//     });
// });

