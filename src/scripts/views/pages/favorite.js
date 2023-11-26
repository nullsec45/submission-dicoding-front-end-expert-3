import FavoriteRestaurant from '../../data/favorite-restaurant';
import {
  createRestaurantCardTemplate,
  createAPIErrorTemplate,
  alertErrorTemplate,
  loadingAPITemplate
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
    mainContent.style.height = "50vmax";
    const getAllRestaurantsDB = await FavoriteRestaurant.getAllRestaurants();
    const daftarRestaurantContainer = document.querySelector('#restaurantContent');


    daftarRestaurantContainer.innerHTML = loadingAPITemplate();

    setTimeout(() => {
      if (getAllRestaurantsDB.error) {
        alertErrorTemplate("API Error", getAllRestaurantsDB.message)
        daftarRestaurantContainer.insertAdjacentHTML(`afterbegin`, createAPIErrorTemplate("Tidak ada restaurant yang ditemukan :("));
        return
      } else {
        mainContent.style.height = "auto";
        daftarRestaurantContainer.innerHTML = "";
        const daftarRestaurant = getAllRestaurantsDB;

        daftarRestaurant.forEach((restaurant) => {
          const container_card_restaurant = document.createElement("div");
          container_card_restaurant.classList.add("container_card_restaurant");

          container_card_restaurant.insertAdjacentHTML(`afterbegin`, createRestaurantCardTemplate(restaurant));

          daftarRestaurantContainer.appendChild(container_card_restaurant);

        });

        document.addEventListener("click", function (event) {
          if (event.target.matches("#detailRestaurant")) {
            const id = event.target.dataset.id;

            document.location.href = `#/detail/${id}`;
          }
        });
      }
    }, 1000);
  },
};

export default Like;