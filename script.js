document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
      alert('Item added to cart!');
  });
});

(function () {

  class Slider {
      constructor(id, mediaQueries) {
          this.slider = document.querySelector(`#${id}`);
          this.sliderList = this.slider.querySelector('.slider-list');
          this.sliderNext = this.slider.querySelector('.slider-arrow-next');
          this.sliderPrev = this.slider.querySelector('.slider-arrow-prev');
          this.mediaQueryList = [window.matchMedia(`screen and (max-width:${mediaQueries[0] - 1}px)`)];
          
          mediaQueries.forEach((mediaQuery) => {
              this.mediaQueryList.push(window.matchMedia(`screen and (min-width:${mediaQuery}px)`));
          });

          this.numberOfVisibleItems = null;
          this.currentItemIndex = null;
          this.sliderItemsLength = 0;
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

      loadItems(items) {
          this.sliderList.innerHTML = '';
          items.forEach(item => {
              const li = document.createElement('li');
              li.classList.add('slider-item');
              li.innerHTML = `
                  <img src="${item.image}" alt="${item.title}">
                  <p class="product-title">${item.title}</p>
                  <p class="product-price">${item.price}</p>
                  <button class="add-to-cart" data-title="${item.title}">Add to cart</button>
              `;
              this.sliderList.appendChild(li);
          });
          this.sliderItems = this.sliderList.querySelectorAll('.slider-item');
          this.sliderItemsLength = this.sliderItems.length;
          this.run();
          this.attachAddToCartListeners();
      }

      attachAddToCartListeners() {
          document.querySelectorAll('.add-to-cart').forEach(button => {
              button.addEventListener('click', (e) => {
                  const productName = e.target.dataset.title;
                  alert(`Item ${productName} added to cart!`);
              });
          });
      }
  }

  const slider = new Slider('products-slider', [576, 768, 992, 1200]);

  fetch('./products.json')
      .then(response => response.json())
      .then(data => {
          slider.loadItems(data);
      })
      .catch(error => console.error('Error loading products:', error));
})();
