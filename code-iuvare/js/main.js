const path = document.querySelector("#auroraPath");

const morphs = [
    "M0,150 Q250,100 500,150 T1000,150",
    "M0,150 Q250,50 500,180 T1000,150",
    "M0,150 Q250,120 500,130 T1000,150",
    "M0,150 Q250,80 500,160 T1000,150"
];

let index = 0;

function animateAurora() {
    gsap.to(path, {
        duration: 1.2,
        ease: "power1.inOut",
        attr: { d: morphs[(index + 1) % morphs.length] },
        onComplete: () => {
            index = (index + 1) % morphs.length;
            animateAurora();
        }
    });
}

animateAurora();