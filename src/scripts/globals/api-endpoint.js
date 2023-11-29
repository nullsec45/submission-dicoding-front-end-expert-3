import CONFIG from './config';

const API_ENDPOINT = {
    IMAGE_RESTAURANT: (type, id) => `${CONFIG.BASE_IMAGE_URL}/${type}/${id}`,
    DAFTAR_RESTAURANT: `${CONFIG.BASE_URL}/list`,
    DETAIL_RESTAURANT: (id) => `${CONFIG.BASE_URL}/detail/${id}`,
    SEARCH_RESTAURANT: (query) => `${CONFIG.BASE_URL}/search?q=${query}`,
    POST_REVIEW_RESTAURANT: `${CONFIG.BASE_URL}/review`,
};

export default API_ENDPOINT;
