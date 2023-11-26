import API_ENDPOINT from '../../globals/api-endpoint';
import Helper from '../../utils/helper';
import Swal from "sweetalert2";


const createRestaurantDetailTemplate = (resto) => `
          <h2 class="resto_title" tabindex="0">${resto.name}</h2>
          <img class="resto_poster" src="${API_ENDPOINT.IMAGE_RESTAURANT("large", resto.pictureId)}" alt="${resto.name}" tabindex="0"/>
          <div class="resto_info" tabindex="0">
            <h3 tabindex="0">Information</h3>
            <h4 tabindex="0">Category</h4>
            <p tabindex="0" id="categoryRestaurant"></p>
            <h4 tabindex="0">Address</h4>
            <p tabindex="0">
                 <i class="fas fa-map-marker-alt maps"></i> ${resto.address}, ${resto.city}.
            </p>
            <h4>Rating</h4>
            <p tabindex="0">
                  <i class="fas fa-star stars"></i> ${resto.rating}
            </p>
          </div >
          <div class="resto_overview" tabindex="0">
            <h3 tabindex="0">Description</h3>
            <p tabindex="0">${resto.description}</p>
          </div>
          <div class="resto_menu" tabindex="0" id="daftarMenu">
              <h3 tabindex="0">Menu List</h3>
          </div>
          <div class="resto_review" tabindex="0" id="daftarReview">
              <h3 tabindex="0">Review</h3>
          </div>
`;

const createRestaurantCardTemplate = (resto) => `
         <div class="card_restaurant" tabindex = "0" >
                <div class="card_image" tabindex="0">
                        <img src="${API_ENDPOINT.IMAGE_RESTAURANT("large", resto.pictureId)}" tabindex="0">
                </div>
                <div class="card_content" tabindex="0">
                        <h2 class="card_title" tabindex="0">${resto.name}</h2>
                        <span>
                            <h3 class="card_sub_title" tabindex="0">
                                <span tabindex="0">
                                    <i class="fas fa-map-marker-alt maps"></i> ${resto.city}
                                </span>
                                <span tabindex="0">
                                    <i class="fas fa-star stars"></i> ${resto.rating}
                                </span>
                            </h3>
                        </span>
                        <p class="card_text" tabindex="0">${Helper.maxBody(resto.description, 200)}</p>
                        <button class="btn_detail" data-id="${resto.id}" id="detailRestaurant" tabindex="0">Selengkapnya</button>
                </div>
        </div>
  `;

const alertErrorTemplate = (title, text) => {
  Swal.fire({
    icon: "error",
    title,
    text
  });
}

const createAPIErrorTemplate = (message) => `
    <div class="api_error" >
        <h2>${message}</h2>
    </div>
`;

const loadingAPITemplate = () => `
  <div class="loading_api" >
    <i class="fa-solid fa-spinner fa-spin"></i>
   </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this movie" id="likeButton" class="like" >
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this movie" id="likeButton" class="like" >
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

const createAddReviewTemplate = (id) => `
      <div class="add_review"> 
          <div class="review_layout">
              <input class="input_name" id="inputName" placeholder="Your Name">
              <textarea class="input_review" id="inputReview" rows="7" cols="10" placeholder="Your Review"></textarea>
          </div>
          <div clas="review_layout">
           
            <button class="button_review" id="buttonReview" data-id="${id}">Add Review</button>
          </div>
      </div>
`;

const createReviewTemplate = (review) => `
  <h4 tabindex="0">${review.name}</h4>
  <div class="review" tabindex="0">
    <h5 tabindex="0"><i class="fa-solid fa-clock-rotate-left date"></i> ${review.date}</h5>
    <p>${review.review}</p>
  </div>
`;

export {
  createRestaurantDetailTemplate,
  createRestaurantCardTemplate,
  createAPIErrorTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  alertErrorTemplate,
  loadingAPITemplate,
  createAddReviewTemplate,
  createReviewTemplate
};