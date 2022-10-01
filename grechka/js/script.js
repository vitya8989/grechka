const slider = document.querySelector('.slider');
const sliderWrapper = slider.querySelector('.slider__wrapper');

window.addEventListener('load', () => {
    initSlider();
})

const initSlider = () => {
    const slider = new Swiper('.slider', {
        speed: 700,
        slidesPerView: 1,
        navigation: {
            nextEl: '.slider__btn--next',
            prevEl: '.slider__btn--left'
        },
    });
}

fetch('https://grchhtml.docs.apiary.io/slides', {
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
}).then(function(response) {
    if(response.ok) {
        console.log('ок');
    } else {
        console.log('Network request failed');
    }
});

const createSlide = (imgSrc, sliderWr) => {
    let slide = document.createElement('div');
    slide.classList.add('slider__slide');
    slide.classList.add('swiper-slide');
    let img = document.createElement('img');
    img.src = imgSrc;
    slide.append(img);
    sliderWr.append(slide);
}