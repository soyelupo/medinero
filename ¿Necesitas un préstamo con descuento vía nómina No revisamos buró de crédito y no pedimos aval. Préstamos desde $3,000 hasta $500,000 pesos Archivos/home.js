/* INIT AND SET HOME PRODUCTS SWIPER
======================================================================================================================= */
const homeProducts = document.querySelector('.home-products');
if (homeProducts) {
  const swiperHomeProducts = new Swiper('.home-products__swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
      // 1200: {
      //   slidesPerView: 4,
      //   spaceBetween: 0,
      // }
    }
  });
}

/* INIT AND SET HOME PRODUCTS ABOUT
======================================================================================================================= */
const homeAbout = document.querySelector('.home-about');
if (homeAbout) {
  const swiperHomeAbout = new Swiper('.home-about__swiper', {
    lazy: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 3000,
    },
  });
}

/* INIT AND SET HOME PRODUCTS CLIENTS
======================================================================================================================= */
const homeClients = document.querySelector('.home-clients');
if (homeClients) {
  const swiperHomeClients = new Swiper('.home-clients__swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    slidesPerGroup: 1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      992: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      1200: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      }
    },
    autoplay: {
      delay: 5000,
    },
  });
}