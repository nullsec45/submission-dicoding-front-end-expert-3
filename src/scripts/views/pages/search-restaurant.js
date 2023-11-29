import DataRestaurant from '../../data/data-restaurant';

import {
  createRestaurantCardTemplate,
  alertErrorTemplate,
  loadingAPITemplate,
} from '../templates/template-creator';

function searchRestaurant(name) {
  return DataRestaurant.searchRestaurant(name);
}

const Search = {
  async render() {
    return `
        <div class="search">
            <div class="komponen_search">
              <div class="search_title">
                  <h2>Cari Restaurant</h2>
              </div>
              <div class="input_search">
                <input type="text" placeholder="Masukkan Nama Restaurant" id="inputSearch">
                <button id="buttonSearch">Cari</button>
              </div>
            </div>
        </div>
        <div class="restaurant_list" id="restaurantContent"></div>
    `;
  },

  async afterRender(mainContent) {
    mainContent.style.height = '50vmax';
    const buttonSearch = document.querySelector('#buttonSearch');
    const inputSearch = document.querySelector('#inputSearch');

    buttonSearch.addEventListener('click', () => {
      const inputValue = inputSearch.value;

      const daftarRestaurantContainer = document.querySelector('#restaurantContent');

      if (inputValue.trim('') === '') {
        alertErrorTemplate('Search Error', 'Restaurant Name Not Empty!');
        return;
      }

      daftarRestaurantContainer.innerHTML = loadingAPITemplate();

      setTimeout(() => {
        searchRestaurant(inputValue).then((res) => {
          if (res.error) {
            mainContent.style.height = '50vmax';
            alertErrorTemplate('Search Error', res.message);
          } else if (res.founded === '0') {
            mainContent.style.height = '50vmax';
            alertErrorTemplate('Search Error', `Restaurant ${inputValue} Not Found!`);
            daftarRestaurantContainer.innerHTML = '';
          } else {
            inputSearch.value = '';
            mainContent.style.height = 'auto';
            daftarRestaurantContainer.innerHTML = '';

            res.restaurants.forEach((resto) => {
              const containerCardRestaurant = document.createElement('div');
              containerCardRestaurant.classList.add('container_card_restaurant');

              containerCardRestaurant.insertAdjacentHTML('afterbegin', createRestaurantCardTemplate(resto));

              daftarRestaurantContainer.appendChild(containerCardRestaurant);
            });
          }
        }).catch((error) => {
          mainContent.style.height = '50vmax';
          daftarRestaurantContainer.innerHTML = '';
          alertErrorTemplate('Search Error', error);
        });
      }, 1000);
    });
  },
};

export default Search;
