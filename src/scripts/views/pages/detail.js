import UrlParser from '../../routes/url-parser';
import DataRestaurant from '../../data/data-restaurant';
import LikeButtonPresenter from '../../utils/like-button-presenter';

import {
    createRestaurantDetailTemplate,
    loadingAPITemplate,
    createAddReviewTemplate,
    createReviewTemplate,
    alertErrorTemplate,
    createAPIErrorTemplate,
} from '../templates/template-creator';

const Detail = {
    _showAllReview(daftarReview, containerReviews, containerReviewList, reviews) {
        reviews.forEach((review) => {
            const containerReview = document.createElement('div');
            containerReview.setAttribute('class', 'container_review');
            containerReview.setAttribute('id', 'containerReview');
            containerReview.setAttribute('tabindex', '0');

            containerReview.insertAdjacentHTML('afterbegin', createReviewTemplate(review));
            containerReviewList.appendChild(containerReview);
        });

        containerReviews.appendChild(containerReviewList);

        daftarReview.appendChild(containerReviews);
    },

    async render() {
        return `
        <div class="daftar_restaurant_title">
            <h2>Detail Restaurant</h2>
        </div>
        <div class="restaurant_list" id="restaurantContent"></div>
        <div id="likeButtonContainer"></div>
        `;
    },

    async afterRender(mainContent) {
        mainContent.style.height = '50vmax';
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        const restaurant = await DataRestaurant.detailRestaurant(url.id);
        const restaurantContainer = document.querySelector('#restaurantContent');

        restaurantContainer.innerHTML = loadingAPITemplate();

        setTimeout(() => {
            if (restaurant.error) {
                alertErrorTemplate('API Error', restaurant.message);
                restaurantContainer.insertAdjacentHTML('afterbegin', createAPIErrorTemplate('Tidak ada restaurant yang ditemukan :('));
                return;
            }
            mainContent.style.height = 'auto';
            restaurantContainer.innerHTML = '';

            const containerCardRestaurant = document.createElement('div');
            containerCardRestaurant.classList.add('container_card_restaurant_detail');
            containerCardRestaurant.insertAdjacentHTML('afterbegin', createRestaurantDetailTemplate(restaurant.restaurant));
            restaurantContainer.appendChild(containerCardRestaurant);

            const categoryRestaurant = document.querySelector('#categoryRestaurant');
            restaurant.restaurant.categories.forEach((category) => {
                categoryRestaurant.innerHTML = `<i class="fa-solid fa-utensils category"></i> ${category.name}`;
            });

            const daftarMenu = document.querySelector('#daftarMenu');
            const { menus } = restaurant.restaurant;

            for (const m in menus) {
                const containerMenu = document.createElement('div');
                containerMenu.setAttribute('class', 'container_menu');

                const h4 = document.createElement('h4');
                h4.setAttribute('tabindex', '0');

                const ol = document.createElement('ol');
                ol.setAttribute('class', `list_menu list_${m}`);
                ol.setAttribute('tabindex', '0');

                menus[m].forEach((menu) => {
                    const li = document.createElement('li');
                    li.setAttribute('tabindex', '0');

                    li.innerText = menu.name;
                    ol.appendChild(li);
                });

                h4.insertAdjacentHTML('afterbegin', m);
                containerMenu.appendChild(h4);
                containerMenu.appendChild(ol);

                daftarMenu.appendChild(containerMenu);
            }

            const daftarReview = document.querySelector('#daftarReview');

            const containerReviews = document.createElement('div');
            containerReviews.setAttribute('class', 'container_reviews');

            containerReviews.insertAdjacentHTML('afterbegin', createAddReviewTemplate(restaurant.restaurant.id));

            const containerReviewList = document.createElement('div');
            containerReviewList.setAttribute('class', 'container_review_list');
            const reviewsData = restaurant.restaurant.customerReviews;

            const showAllReview = (reviewsData) => this._showAllReview(
                daftarReview,
                containerReviews,
                containerReviewList,
                reviewsData,
            );

            showAllReview(reviewsData);

            document.addEventListener('click', (event) => {
                if (event.target.matches('#buttonReview')) {
                    const restaurantId = event.target.dataset.id;
                    const inputName = document.querySelector('#inputName');
                    const inputReview = document.querySelector('#inputReview');
                    const inputNameValue = inputName.value;
                    const inputReviewValue = inputReview.value;

                    if (inputNameValue.trim('') === '') {
                        alertErrorTemplate('Error Review', 'Name Not Empty!');
                        return;
                    }

                    if (inputReviewValue.trim('') === '') {
                        alertErrorTemplate('Error Review', 'Review Not Empty!');
                        return;
                    }

                    containerReviewList.innerHTML = loadingAPITemplate();

                    const resultReview = DataRestaurant.reviewRestaurant(
                        {
                            restaurantId,
                            inputNameValue,
                            inputReviewValue,
                        },
                    );

                    resultReview.then((res) => {
                        setTimeout(() => {
                            if (res.error) {
                                alertErrorTemplate('Error Review', res.message);
                                containerReviewList.innerHTML = '';
                                showAllReview(reviewsData);
                            } else {
                                containerReviewList.innerHTML = '';
                                inputName.value = '';
                                inputReview.value = '';
                                showAllReview(res.customerReviews);
                            }
                        }, 1000);
                    }).catch((error) => {
                        containerReviewList.innerHTML = '';
                        showAllReview(reviewsData);
                        alertErrorTemplate('Error Review', error);
                    });
                }
            });

            LikeButtonPresenter.init({
                likeButtonContainer: document.querySelector('#likeButtonContainer'),
                restaurant: {
                    id: restaurant.restaurant.id,
                    name: restaurant.restaurant.name,
                    description: restaurant.restaurant.description,
                    city: restaurant.restaurant.city,
                    address: restaurant.restaurant.address,
                    pictureId: restaurant.restaurant.pictureId,
                    categories: restaurant.restaurant.categories,
                    rating: restaurant.restaurant.rating,
                    customerReviews: restaurant.restaurant.customerReviews,
                },
            });
        }, 1000);
    },
};

export default Detail;
