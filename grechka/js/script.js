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

fetch('https://private-57b4e3-grchhtml.apiary-mock.com/slides').then(function(response) {
    if(response.ok) {
        response.json().then(function(json) {
            let data = json;
            console.log(data);
        });
    } else {
        console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
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