import API_ENDPOINT from '../globals/api-endpoint';

class DataRestaurant {
    static async restaurantList() {
        const response = await fetch(API_ENDPOINT.DAFTAR_RESTAURANT);
        const responseJson = await response.json();
        return responseJson;
    }

    static async reviewRestaurant(reviewObj) {
        const response = await fetch(API_ENDPOINT.POST_REVIEW_RESTAURANT, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",

            body: JSON.stringify({ id: reviewObj.restaurantId, name: reviewObj.inputNameValue, review: reviewObj.inputReviewValue })
        });

        const responseJson = await response.json();
        return responseJson;
    }

    static async searchRestaurant(query) {
        const response = await fetch(API_ENDPOINT.SEARCH_RESTAURANT(query));
        const responseJson = await response.json();
        return responseJson;
    }

    static async detailRestaurant(id) {
        const response = await fetch(API_ENDPOINT.DETAIL_RESTAURANT(id));
        return response.json();
    }
}

export default DataRestaurant;