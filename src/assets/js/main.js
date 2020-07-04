$(document).ready(function () {
  let swiper = new Swiper(".homeslider > .swiper-container", {
    pagination: ".swiper-pagination",
    paginationClickable: true,
    preventClicks: false,
    preventClicksPropagation: false,
    effect: "fade",
    breakpoints: {
      320: {
        height: 200,
      },

      480: {
        height: 300,
      },

      768: {
        height: 400,
      },
      1024: {
        height: 500,
      },
    },
  });

  let recentswiper = new Swiper(".recentslider > .swiper-container", {
    nextButton: ".recent-next",
    prevButton: ".recent-prev",
    slidesPerView: 4,
    paginationClickable: true,
    preventClicks: false,
    preventClicksPropagation: false,
    spaceBetween: 10,
    breakpoints: {
      320: {
        slidesPerView: 5,
        spaceBetween: 5,
      },

      480: {
        slidesPerView: 3,
        spaceBetween: 5,
      },

      768: {
        slidesPerView: 5,
        spaceBetween: 5,
      },
      1024: {
        slidesPerView: 10,
        spaceBetween: 100,
      },
    },
  });

  let mostswiper = new Swiper(".mostslider > .swiper-container", {
    nextButton: ".most-next",
    prevButton: ".most-prev",
    slidesPerView: 8,
    paginationClickable: true,
    preventClicks: false,
    preventClicksPropagation: false,
    spaceBetween: 10,
    breakpoints: {
      320: {
        slidesPerView: 3,
        spaceBetween: 5,
      },

      480: {
        slidesPerView: 3,
        spaceBetween: 5,
      },

      768: {
        slidesPerView: 5,
        spaceBetween: 5,
      },
      1024: {
        slidesPerView: 6,
        spaceBetween: 10,
      },
    },
  });

  let topswiper = new Swiper(".topslider > .swiper-container", {
    nextButton: ".top-next",
    prevButton: ".top-prev",
    slidesPerView: 10,
    paginationClickable: true,
    preventClicks: false,
    preventClicksPropagation: false,
    spaceBetween: 10,
    breakpoints: {
      320: {
        slidesPerView: 3,
        spaceBetween: 5,
      },

      480: {
        slidesPerView: 3,
        spaceBetween: 5,
      },

      768: {
        slidesPerView: 5,
        spaceBetween: 5,
      },
      1024: {
        slidesPerView: 6,
        spaceBetween: 10,
      },
    },
  });
});
