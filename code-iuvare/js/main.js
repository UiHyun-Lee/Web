const text = document.querySelector("#scene-text");
const navbar = document.querySelector(".navbar-wrapper");
const sceneOne = document.querySelector(".scene.one");
const sceneOneText = document.getElementById("scene-one-text");
const paragraph = document.getElementById("intro-paragraph");
const introBlock = document.querySelector(".intro-block");
let typingInstance = null;
const originalHTML = paragraph.innerHTML; // back up for the full text of Mission statement

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            paragraph.style.visibility = "visible";
            paragraph.innerHTML = "";

            if (typingInstance) typingInstance.reset();

            typingInstance = new TypeIt("#intro-paragraph", {
                speed: 20,
                lifeLike: false,
                waitUntilVisible: false
            }).type(originalHTML).go();
        } else {
            if (typingInstance) {
                typingInstance.reset();
                typingInstance = null;
            }
            paragraph.innerHTML = "";
            paragraph.style.visibility = "hidden";
        }
    });
}, { threshold: 0.3 });
observer.observe(introBlock);

window.addEventListener("load", () => {
    window.dispatchEvent(new Event("scroll"));
});

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
        text.style.transform = `translateX(-50%) scale(${scale})`;
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

document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // 애니메이션 클래스 추가 후 잠시 뒤 제거 (재실행 가능하게)
                    sceneOneText.classList.add("jump-animate");

                    setTimeout(() => {
                        sceneOneText.classList.remove("jump-animate");
                    }, 600); // 애니메이션 시간과 일치
                }
            });
        },
        {
            threshold: 0.5,
        }
    );
    observer.observe(sceneOne);
});

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

