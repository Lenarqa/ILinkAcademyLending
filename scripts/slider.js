const slider = document.querySelectorAll(".slide");
const slidesContainer = document.querySelector(".slidesContainer");

const nextBtn = document.querySelector(".nextBtn");
const prevBtn = document.querySelector(".prevBtn");

const navigationDots = document.querySelector(".navigationDots");

let slideWidth = slider[0].clientWidth;
let currentSlide = 0;

const init = () => {
    slider.forEach( (slide, i) => {
        slide.style.left = 100 * i + "%";
    });

    slider[0].classList.add("active");
};


const initNavigationDots = ()=> {
    for (let i = 0; i < slider.length; i++) {
        const dot = document.createElement("div");
        dot.classList.add("singleDot");
        navigationDots.appendChild(dot);
        dot.addEventListener("click", ()=> {
            nextSlide(i)
        });
    }
    navigationDots.children[0].classList.add("active");
};

const setActiveClass = ()=> {
    let currentActivSlide = document.querySelector(".slide.active");
    currentActivSlide.classList.remove("active");
    slider[currentSlide].classList.add("active");

    // dots
    let currentActivDot = document.querySelector(".singleDot.active");
    currentActivDot.classList.remove("active");
    navigationDots.children[currentSlide].classList.add("active");
}

nextSlide = (slideIndex)=> {
    slidesContainer.style.transform = `translateX(-${slideWidth * slideIndex}px)`; 
    currentSlide = slideIndex;
    setActiveClass();
};

nextBtn.addEventListener("click", ()=> {
    if(currentSlide >= slider.length-1) {
        nextSlide(0)
        return;
    }
    currentSlide++;
    nextSlide(currentSlide);
});

prevBtn.addEventListener("click", ()=> {
    if(currentSlide <= 0) {
        nextSlide(slider.length-1)
        return;
    }
    currentSlide--;
    nextSlide(currentSlide);
});

init();
initNavigationDots();