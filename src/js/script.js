const slider = document.querySelector('.slider');
const sliderWrapper = slider.querySelector('.slider__wrapper');
const sliderTitles = slider.querySelector('.slider__titles');
const sliderTitleClass = 'slider__title';
const sliderTexts = slider.querySelector('.slider__texts');
const sliderTextClass = 'slider__text';
const sliderLikeWr = slider.querySelector('.like__btns');
const sliderLikeValue = slider.querySelector('.like__value');
const sliderPopup = slider.querySelector('.slider__popup');
const interleaveOffset = 0.5;
const interleaveOffsetMob = 0.9;
let offset = 0;
let firstRun = true;
let myUrl = window.location.href;

const socialLink = document.querySelectorAll('.social__link');

for (let link of socialLink) {
    if (link.classList.contains('social__link--ok')) {
        link.href = `https://connect.ok.ru/offer?url=${myUrl}`
    }
    if (link.classList.contains('social__link--vk')) {
        link.href = `https://vk.com/share.php?url=${myUrl}`;
    }
    if (link.classList.contains('social__link--fb')) {
        link.href = `https://www.facebook.com/sharer/sharer.php?u=${myUrl}`
    }
}

window.addEventListener('load', () => {
   const buildSlider = (offset, sliderSwiper, firstRun) => {
       fetch('https://private-anon-37bb657c01-grchhtml.apiary-mock.com/slides?offset=' + offset + '&limit=3'
       ).then(function (response) {
           if (response.ok) {
               response.json().then(function (json) {
                   let data = json;
                   updateSlider(data.data);
                   sliderSwiper.update();
                   let sliderTitleArr = slider.querySelectorAll('.slider__title');
                   let sliderTextArr = slider.querySelectorAll('.slider__text');
                   let sliderLike = slider.querySelectorAll('.like__btn');
                   if (window.innerWidth < 640) {
                       if (sliderSwiper.slides[sliderSwiper.activeIndex + 1]) {
                           sliderSwiper.slides[sliderSwiper.activeIndex + 1].querySelector('img').style.transform =
                               "translate3d(-32%, 0, 0)";
                       } else {
                           if (sliderSwiper.slides[sliderSwiper.activeIndex - 1]) {
                               sliderSwiper.slides[sliderSwiper.activeIndex - 1].querySelector('img').style.transform =
                                   "translate3d(-26%, 0, 0)";
                           }
                       }
                   }
                   if (firstRun) {
                       window.addEventListener('resize', () => {
                           if (window.innerWidth < 640) {
                               if (sliderSwiper.slides[sliderSwiper.activeIndex + 1]) {
                                   sliderSwiper.slides[sliderSwiper.activeIndex + 1].querySelector('img').style.transform =
                                       "translate3d(-32%, 0, 0)";
                               } else {
                                   if (sliderSwiper.slides[sliderSwiper.activeIndex - 1]) {
                                       sliderSwiper.slides[sliderSwiper.activeIndex - 1].querySelector('img').style.transform =
                                           "translate3d(-26%, 0, 0)";
                                   }
                               }
                           }
                       });
                   }
                   sliderSwiper.on('slidePrevTransitionStart', () => {
                       if (window.innerWidth < 640) {
                           if (sliderSwiper.slides[sliderSwiper.activeIndex - 1]) {
                               sliderSwiper.slides[sliderSwiper.activeIndex - 1].querySelector('img').style.transform =
                                   "translate3d(-26%, 0, 0)";
                           }
                           sliderSwiper.slides[sliderSwiper.activeIndex].querySelector('img').style.transform =
                               "translate3d(0, 0, 0)";
                           if (sliderSwiper.slides[sliderSwiper.activeIndex + 1]) {
                               sliderSwiper.slides[sliderSwiper.activeIndex + 1].querySelector('img').style.transform =
                                   "translate3d(-32%, 0, 0)";
                           }
                       }
                       for (let i = 0; i < sliderTitleArr.length; i++) {
                           sliderTitleArr[i].classList.remove('active');
                           sliderTextArr[i].classList.remove('active');
                           sliderLike[i].classList.remove('show');
                           if (sliderTitleArr[i].dataset.id == sliderSwiper.activeIndex + 1) {
                               sliderTitleArr[i].classList.add('next');
                           }
                           if (sliderTitleArr[i].dataset.id == sliderSwiper.activeIndex) {
                               sliderTitleArr[i].classList.remove('prev');
                               sliderTitleArr[i].classList.add('active');
                               sliderTextArr[i].classList.add('active');
                               sliderLike[i].classList.add('show');
                               sliderLikeValue.textContent = sliderLike[i].dataset.likeCount;
                           }
                       }
                   });
                   sliderSwiper.on('slideNextTransitionStart', () => {
                       if (window.innerWidth < 640) {
                           sliderSwiper.slides[sliderSwiper.activeIndex - 1].querySelector('img').style.transform =
                               "translate3d(-26%, 0, 0)";
                           sliderSwiper.slides[sliderSwiper.activeIndex].querySelector('img').style.transform =
                               "translate3d(0, 0, 0)";
                           if (sliderSwiper.slides[sliderSwiper.activeIndex + 1]) {
                               sliderSwiper.slides[sliderSwiper.activeIndex + 1].querySelector('img').style.transform =
                                   "translate3d(-32%, 0, 0)";
                           }
                       }
                       for (let i = 0; i < sliderTitleArr.length; i++) {
                           sliderTitleArr[i].classList.remove('active');
                           if (sliderTitleArr[i].dataset.id == sliderSwiper.activeIndex - 1) {
                               sliderTitleArr[i].classList.add('prev');
                               sliderTextArr[i].classList.remove('active');
                               sliderLike[i].classList.remove('show');
                           }
                           if (sliderTitleArr[i].dataset.id == sliderSwiper.activeIndex) {
                               sliderTitleArr[i].classList.remove('next');
                               sliderTitleArr[i].classList.add('active');
                               sliderTextArr[i].classList.add('active');
                               sliderTextArr[i].classList.remove('next');
                               sliderLike[i].classList.add('show');
                               sliderLikeValue.textContent = sliderLike[i].dataset.likeCount;
                           }
                       }
                       if (sliderSwiper.activeIndex + 1 == sliderSwiper.slides.length && firstRun) {
                           offset = sliderSwiper.slides.length;
                           if (data.countAll - offset > 0) {
                               buildSlider(offset, sliderSwiper, firstRun);
                               firstRun = false;
                           }
                       }
                   });
               });
           } else {
               createSlide(null, sliderWrapper);
           }
       });
   }

    const sliderSwiper = new Swiper('.slider', {
        speed: 1500,
        slidesPerView: 1,
        navigation: {
            nextEl: '.slider__btn--next',
            prevEl: '.slider__btn--prev'
        },
        watchSlidesProgress: true,
        allowTouchMove: false,
        on: {
            progress: function () {
                if (window.innerWidth >= 640) {
                    let swiper = this;
                    for (let i = 0; i < swiper.slides.length; i++) {
                        let slideProgress = swiper.slides[i].progress,
                            innerOffset = swiper.width * interleaveOffset,
                            innerTranslate = slideProgress * innerOffset;
                        swiper.slides[i].querySelector('img').style.transform =
                            "translate3d(" + innerTranslate + "px, 0, 0)";
                    }
                }
            },
        },
    });

    buildSlider(offset, sliderSwiper, firstRun);
});

const updateSlider = (slides, firstRun) => {
    for (let i = 0; i < slides.length; i++) {
        createSlide(slides[i]['imgUrl'], sliderWrapper);
        createText(slides[i]['title'], sliderTitles, slides[i]['id'], sliderTitleClass, true);
        createText(slides[i]['desc'], sliderTexts, slides[i]['id'], sliderTextClass);
        createLike(sliderLikeWr, slides[i]['id'], slides[i]['likeCnt'], sliderLikeValue);
    }
}

const createSlide = (imgSrc, sliderWr) => {
    let slide = document.createElement('div');
    slide.classList.add('slider__slide');
    slide.classList.add('swiper-slide');
    let img = document.createElement('img');
    if (imgSrc) {
        img.src = imgSrc;
    } else {
        img.src = './img/error.jpg';
        img.style.objectPosition = 'center';
    }
    slide.append(img);
    sliderWr.append(slide);
}

const createText = (elemText, elemWr, count, elemClass, tooltip) => {
    let elem = document.createElement('div');
    elem.classList.add(elemClass);
    elem.dataset.id = count;
    let elemChild = document.createElement('span');
    elem.append(elemChild);
    elemChild.textContent = elemText;
    if (elem.dataset.id === '0') {
        elem.classList.add('active');
    } else {
        elem.classList.add('next');
    }
    if (tooltip) {
        elem.setAttribute('title', elemText);
    }
    elemWr.append(elem);
}

const createLike = (elemWr, count, likeCount, likeValue) => {
    let likeBtn = document.createElement('button');
    likeBtn.classList.add('like__btn');
    likeBtn.innerHTML = '<svg width="39" height="37" viewBox="0 0 39 37" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
        '                <path d="M0 18.2426H7.21056V35.548H0V18.2426ZM35.4541 13.556H25.2367L25.3594 9.5182L26.4408 4.3266L24.8761 0H21.3936L20.6723 6.36706L17.067 11.8977L15.7477 18.9855H12.0197V35.548L20.795 36.0529H31.0702L34.8555 33.349L38.1001 19.721L35.4541 13.556Z" fill="#727272"/>\n' +
        '            </svg>'
    likeBtn.dataset.id = count;
    if (sessionStorage.getItem(likeBtn.dataset.id)) {
        likeBtn.dataset.likeCount = sessionStorage.getItem(likeBtn.dataset.id);
        likeBtn.classList.add('active');
    } else {
        likeBtn.dataset.likeCount = likeCount;
    }
    if (likeBtn.dataset.id === '0') {
        likeBtn.classList.add('show');
        likeValue.textContent = likeBtn.dataset.likeCount;
    }
    likeBtn.addEventListener('click', () => {
        if (!likeBtn.classList.contains('active')) {
            fetch('https://private-anon-37bb657c01-grchhtml.apiary-mock.com/slides/' + likeBtn.dataset.id +'/like', {
                method: 'POST'
                }
            ).then(function (response) {
                if (response.ok) {
                    response.json().then(function (json) {
                        let data = json;
                        popupInit(data, sliderPopup);
                        likeBtn.dataset.likeCount++;
                        likeBtn.classList.add('active');
                        sessionStorage.setItem(likeBtn.dataset.id, likeBtn.dataset.likeCount);
                        likeValue.textContent = likeBtn.dataset.likeCount;
                    });
                } else {
                    let data = {
                        title: 'Произошла ошибка отправки вашего лайка',
                        desc: 'Попробуйте зайти на наш сайт попозже, мы уже чиним'
                    }
                    popupInit(data, sliderPopup);
                }
            });
        }
    })
    elemWr.append(likeBtn);
}

const popupInit = (data, popup) => {
   const popupTitle = popup.querySelector('.slider__popup_title');
   const popupText = popup.querySelector('.slider__popup_text');
   const popupCross = popup.querySelector('.slider__popup_cross');

   popupTitle.textContent = data.title;
   popupText.textContent = data.desc;
   showPopup(popup);

   popupCross.addEventListener('click', () => {
       closePopup(popup);
   })
   popup.addEventListener('click', (e) => {
     if (!e.target.closest('.slider__popup_body')) {
         closePopup(popup);
     }
   });
}

const showPopup = (popup) => {
    popup.classList.add('show');
    document.body.classList.add('scroll-lock');
}

const closePopup = (popup) => {
    popup.classList.remove('show');
    document.body.classList.remove('scroll-lock');
}