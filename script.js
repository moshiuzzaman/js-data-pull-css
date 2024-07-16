document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        alert('Item added to cart!');
        // Here you would add the logic to actually add the item to the cart
    });
});
(function () {
    'use strict';
  
    class Slider {
      constructor(id, mediaQueries) {
        this.slider = document.querySelector(`#${id}`);
        this.sliderList = this.slider.querySelector('.slider-list');
        this.sliderItems = this.slider.querySelectorAll('.slider-item');
        this.sliderNext = this.slider.querySelector('.slider-arrow-next');
        this.sliderPrev = this.slider.querySelector('.slider-arrow-prev');
        this.mediaQueryList = [window.matchMedia(`screen and (max-width:${mediaQueries[0] - 1}px)`)];
        
        mediaQueries.forEach((mediaQuery) => {
          this.mediaQueryList.push(window.matchMedia(`screen and (min-width:${mediaQuery}px)`));
        });
  
        this.numberOfVisibleItems = null;
        this.currentItemIndex = null;
        this.sliderItemsLength = this.sliderItems.length;
        this.mediaQueryLength = this.mediaQueryList.length;
  
        this.mediaQueryList.forEach((mediaQuery) => {
          mediaQuery.addEventListener('change', () => {
            this.run();
          });
        });
  
        this.sliderNext.addEventListener('click', () => {
          if (this.currentItemIndex < this.sliderItemsLength - this.numberOfVisibleItems) {
            this.currentItemIndex++;
            this.shiftSlides();
          }
        });
  
        this.sliderPrev.addEventListener('click', () => {
          if (this.currentItemIndex > 0) {
            this.currentItemIndex--;
            this.shiftSlides();
          }
        });
  
        this.sliderItems.forEach((item) => {
          const elements = item.querySelectorAll('a');
          elements.forEach((element) => {
            element.tabIndex = '-1';
          });
        });
  
        this.sliderPrev.addEventListener('focusin', () => {
          this.slider.scrollIntoView();
        });
  
        this.sliderNext.addEventListener('focusin', () => {
          this.slider.scrollIntoView();
        });
      }
  
      run() {
        let index = this.mediaQueryLength - 1;
        while (index >= 0) {
          if (this.mediaQueryList[index].matches) {
            this.numberOfVisibleItems = index + 1;
  
            if (index === this.mediaQueryLength - 1) {
              this.numberOfVisibleItems = 6; // Set 6 items for the widest screen
            }
  
            this.currentItemIndex = 0;
            this.sliderList.style.transform = 'translateX(0%)';
  
            this.sliderList.style.width = `calc(${(100 / this.numberOfVisibleItems) * this.sliderItemsLength}% + ${(this.sliderItemsLength / this.numberOfVisibleItems) * 16}px)`;
  
            this.sliderItems.forEach((item) => {
              item.style.width = `${100 / this.numberOfVisibleItems}%`;
            });
  
            break;
          }
          index--;
        }
      }
  
      shiftSlides() {
        this.sliderList.style.transform = `translateX(-${(100 / this.sliderItemsLength) * this.currentItemIndex}%)`;
      }
    }
  
    new Slider('products-slider', [576, 768, 992, 1200]).run();
  })();
  
