import FavoriteRestaurant from '../../data/favorite-restaurant';
import {
  createRestaurantCardTemplate,
  createAPIErrorTemplate,
  alertErrorTemplate,
  loadingAPITemplate,
} from '../templates/template-creator';

const Like = {
  async render() {
    return `
    <div class="daftar_restaurant_title">
        <h2>Favorite Restaurant</h2>
    </div>
    <div class="restaurant_list" id="restaurantContent"></div>
    `;
  },

  async afterRender(mainContent) {
    mainContent.style.height = '50vmax';
    const getAllRestaurantsDB = await FavoriteRestaurant.getAllRestaurants();
    const daftarRestaurantContainer = document.querySelector('#restaurantContent');

    daftarRestaurantContainer.innerHTML = loadingAPITemplate();

    setTimeout(() => {
      if (getAllRestaurantsDB.error) {
        alertErrorTemplate('API Error', getAllRestaurantsDB.message);
        daftarRestaurantContainer.insertAdjacentHTML('afterbegin', createAPIErrorTemplate('Tidak ada restaurant yang ditemukan :('));
      } else {
        mainContent.style.height = 'auto';
        daftarRestaurantContainer.innerHTML = '';
        const daftarRestaurant = getAllRestaurantsDB;

        daftarRestaurant.forEach((restaurant) => {
          const containerCardRestaurant = document.createElement('div');
          containerCardRestaurant.classList.add('container_card_restaurant');

          containerCardRestaurant.insertAdjacentHTML('afterbegin', createRestaurantCardTemplate(restaurant));

          daftarRestaurantContainer.appendChild(containerCardRestaurant);
        });

        document.addEventListener('click', (event) => {
          if (event.target.matches('#detailRestaurant')) {
            const { id } = event.target.dataset;

            document.location.href = `#/detail/${id}`;
          }
        });
      }
    }, 1000);
  },
};

export default Like;
