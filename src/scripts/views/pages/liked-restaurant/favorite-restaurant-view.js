import { createRestaurantCardTemplate } from '../../templates/template-creator';

class FavoriteMovieView {
    getTemplate() {
        return `
            <div class="content">
                <input id="query" type="text">
                <h2 class="content__heading">Your Liked Restaurant</h2>
        
                <div id="restaurant-search-container" class="restaurants">
                </div>
            </div>
    `;
    }

    runWhenUserIsSearching(callback) {
        document.getElementById('query').addEventListener('change', (event) => {
            callback(event.target.value);
        });
    }

    showRestaurants(restaurants) {
        let html;

        if (restaurants.length > 0) {
            html = restaurants.forEach(
                (restaurant) => createRestaurantCardTemplate(restaurant),
            );
        } else {
            html = this._getEmptRestaurantTemplate();
        }

        document.getElementById('restaurant-search-container').innerHTML = html;

        document.getElementById('restaurant-search-container').dispatchEvent(new Event('restaurants:updated'));
    }

    _getEmptRestaurantTemplate() {
        return `
      <div class="api_error">
        <h2>Tidak ada restaurant untuk ditampilkan</h2>
      </div>
    `;
    }
}

export default FavoriteMovieView;
