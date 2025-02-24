import { OwlOptions } from 'ngx-owl-carousel-o';

// Product Slider (5 Items)
export const productSlider: OwlOptions = {
  loop: true,
  nav: false,
  items: 5,
  margin: 0,
  dots: false,
  responsive: {
    0: {
      items: 2,
    },
    530: {
      items: 3,
    },
    749: {
      items: 4,
    },
    1000: {
      items: 5,
    },
  },
};

// Product Slider (5 Items)
export const productSliderMargin: OwlOptions = {
  loop: true,
  nav: false,
  items: 5,
  dots: false,
  responsive: {
    0: {
      items: 2,
    },
    535: {
      items: 3,
    },
    740: {
      items: 4,
    },
    990: {
      items: 5,
    },
  },
};

// Product Slider (5 Items)
export const productSlider2: OwlOptions = {
  loop: true,
  nav: false,
  items: 5,
  dots: false,
  responsive: {
    0: {
      items: 2,
    },
    535: {
      items: 3,
    },
    740: {
      items: 4,
    },
    990: {
      items: 5,
    },
  },
};

// Product Slider (6 Items)
export const productSlider6Item: OwlOptions = {
  loop: true,
  nav: false,
  items: 6,
  dots: false,
  responsive: {
    0: {
      items: 2,
    },
    520: {
      items: 3,
    },
    665: {
      items: 4,
    },
    900: {
      items: 5,
    },
    1065: {
      items: 6,
    },
  },
};

// Product Slider (6 Items)
export const productSlider6ItemMargin: OwlOptions = {
  loop: true,
  nav: false,
  items: 6,
  dots: false,
  responsive: {
    0: {
      margin: 16,
      items: 2,
    },
    560: {
      margin: 16,
      items: 3,
    },
    760: {
      margin: 16,
      items: 4,
    },
    980: {
      items: 5,
    },
    1180: {
      items: 6,
    },
  },
};

// Banner Slider
export const bannerSlider: OwlOptions = {
  loop: true,
  nav: false,
  dots: false,
  items: 4,
  margin: 20,
  responsive: {
    0: {
      items: 1,
      autoplay: true,
      autoplayTimeout: 5500,
    },
    525: {
      items: 2,
      autoplay: true,
      autoplayTimeout: 4500,
    },
    870: {
      items: 3,
      autoplay: true,
      autoplayTimeout: 5500,
    },
    1190: {
      items: 4,
      autoplay: true,
      autoplayTimeout: 5500,
    },
  },
};

// Product Slider(3 Items)
export const customOptionsItem3: OwlOptions = {
  loop: true,
  nav: false,
  dots: false,
  margin: 20,
  autoplay: true,
  // mouseDrag: false,
  items: 3,
  responsive: {
    0: {
      margin: 16,
      items: 1,
    },
    580: {
      margin: 16,
      items: 2,
    },
    1050: {
      items: 4,
    },
  },
};

// Product Slider(4 Items)
export const customOptionsItem4: OwlOptions = {
  loop: true,
  nav: false,
  dots: false,
  margin: 20,
  items: 4,
  responsive: {
    0: {
      items: 1,
    },
    480: {
      items: 2,
    },
    896: {
      items: 3,
    },
    1105: {
      items: 4,
    },
  },
};

// Category Slider
export const categorySlider: OwlOptions = {
  loop: true,
  nav: false,
  dots: false,
  items: 7,
  margin: 20,
  responsive: {
    0: {
      margin: 16,
      items: 2,
    },
    400: {
      margin: 16,
      items: 3,
    },
    490: {
      margin: 16,
      items: 4,
    },
    680: {
      items: 5,
    },
    880: {
      items: 6,
    },
    1024: {
      items: 7,
    },
  },
};

// Category Slider
export const categorySlider9: OwlOptions = {
  loop: false,
  nav: false,
  dots: false,
  margin: 10,
  items: 9,
  responsive: {
    0: {
      items: 2,
      // autoplay: true,
      // autoplayTimeout: 5500,
    },
    360: {
      items: 3,
      // autoplay: true,
      // autoplayTimeout: 5500,
    },
    480: {
      items: 4,
      // autoplay: true,
      // autoplayTimeout: 5500,
    },
    620: {
      items: 5,
      // autoplay: true,
      // autoplayTimeout: 5500,
    },
    760: {
      items: 6,
    },
    945: {
      items: 7,
    },
    1150: {
      items: 8,
    },
    1313: {
      items: 9,
    },
  },
};

export const singleSlider: OwlOptions = {
  loop: true,
  nav: true,
  dots: false,
  items: 1,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  },
};

// Product Main Thumb Slider
export const productMainThumbSlider: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: false,
  items: 1,
  nav: true,
  autoplay: false,
  autoHeight:true,
  autoplayTimeout:5000,
  autoplayHoverPause:true,
  navSpeed: 300,
  responsive: {
    0: {
      items: 1,
    },
  },
};

// Product Thumbnail Slider
export const productThumbSlider: OwlOptions = {
  loop: false,
  dots: false,
  margin: 10,
  navSpeed: 300,
  autoHeight: true,
  items: 4,
  responsive: {
    0: {
      items: 3,
    },
    485: {
      items: 4,
    },
  },
};

export const productSliderLayout: OwlOptions = {
  items: 4,
  loop: true,
  dots: false,
  margin: 15,
  navSpeed: 300,
  responsive: {
    0: {
      items: 2,
      autoplay: true,
      autoplayTimeout: 4500,
    },
    527: {
      items: 3,
      autoplay: true,
      autoplayTimeout: 4500,
    },
    750: {
      items: 4,
    },
  },
};
