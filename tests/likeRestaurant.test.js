import FavoriteRestaurant from '../src/scripts/data/favorite-restaurant';
import * as TestFactories from './helpers/testFactories';

describe('Tambah ke favorite sebuah restaurant', () => {
    const addLikeButtonContainer = () => {
        document.body.innerHTML = '<div id="likeButtonContainer"></div>';
    };

    beforeEach(() => {
        addLikeButtonContainer();
    });

    it('harus menampilkan tombol suka ketika restaurant tersebut belum pernah disukai sebelumnya', async () => {
        await TestFactories.createLikeButtonPresenterWitRestaurant({ id: 1 });

        expect(document.querySelector('[aria-label="sukai restaurant ini"]')).toBeTruthy();
    });

    it("tidak boleh menampilkan tombol tidak suka ketika restaurant belum pernah disukai sebelumnya", async () => {
        await TestFactories.createLikeButtonPresenterWitRestaurant({ id: 1 });

        expect(document.querySelector('[aria-label="tidak sukai restaurant ini"]')).toBeFalsy();
    });

    it('harus bisa menyukai restaurantnya', async () => {
        await TestFactories.createLikeButtonPresenterWitRestaurant({ id: 1 });

        document.querySelector('#likeButton').dispatchEvent(new Event('click'));

        const restaurant = await FavoriteRestaurant.getRestaurant(1);
        expect(restaurant).toEqual({ id: 1 });

        await FavoriteRestaurant.deleteRestaurant(1);
    });

    it('tidak boleh menambahkan restaurant lagi ketika sudah disukai', async () => {
        await TestFactories.createLikeButtonPresenterWitRestaurant({ id: 1 });

        await FavoriteRestaurant.putRestaurant({ id: 1 });
        document.querySelector('#likeButton').dispatchEvent(new Event('click'));

        expect(await FavoriteRestaurant.getAllRestaurants()).toEqual([{ id: 1 }]);
        await FavoriteRestaurant.deleteRestaurant(1);
    });

    it('tidak boleh menambahkan restaurant jika tidak memiliki id', async () => {
        await TestFactories.createLikeButtonPresenterWitRestaurant({});

        document.querySelector('#likeButton').dispatchEvent(new Event('click'));

        expect(await FavoriteRestaurant.getAllRestaurants()).toEqual([]);
    });
});