import DataRestaurant from '../../data/data-restaurant';
import {
  createRestaurantCardTemplate,
  createAPIErrorTemplate,
  alertErrorTemplate,
  loadingAPITemplate,
} from '../templates/template-creator';

const DaftarRestaurant = {
  async render() {
    return `
        <div class="daftar_restaurant_title">
            <h2>Restaurant List</h2>
        </div>
        <div class="restaurant_list" id="restaurantContent"></div>
       
    `;
  },

  async afterRender(mainContent) {
    mainContent.style.height = 'auto';
    const getAPIRestaurant = await DataRestaurant.restaurantList();
    const daftarRestaurantContainer = document.querySelector('#restaurantContent');

    daftarRestaurantContainer.innerHTML = loadingAPITemplate();

    setTimeout(() => {
      if (getAPIRestaurant.error) {
        alertErrorTemplate('API Error', getAPIRestaurant.message);
        daftarRestaurantContainer.insertAdjacentHTML('afterbegin', createAPIErrorTemplate('Tidak ada restaurant yang ditemukan :('));
      } else {
        daftarRestaurantContainer.innerHTML = '';
        const daftarRestaurant = getAPIRestaurant.restaurants;

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

export default DaftarRestaurant;
