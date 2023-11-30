import FavoriteRestaurant from '../src/scripts/data/favorite-restaurant';
import * as TestFactories from './helpers/testFactories';

describe('Batal Sukai Restaurant', () => {
    const addLikeButtonContainer = () => {
        document.body.innerHTML = '<div id="likeButtonContainer"></div>';
    };

    beforeEach(async () => {
        addLikeButtonContainer();
        await FavoriteRestaurant.putRestaurant({ id: 1 });
    });

    afterEach(async () => {
        await FavoriteRestaurant.deleteRestaurant(1);
    });

    it('harus menampilkan widget yang berbeda ketika film disukai', async () => {
        await TestFactories.createLikeButtonPresenterWitRestaurant({ id: 1 });

        expect(document.querySelector('[aria-label="tidak sukai restaurant ini"]')).toBeTruthy();
    });

    it('tidak boleh menampilkan widget seperti ketika film telah disukai', async () => {
        await TestFactories.createLikeButtonPresenterWitRestaurant({ id: 1 });

        expect(document.querySelector('[aria-label="sukai restaurant ini"]')).toBeFalsy();
    });

    it('harus dapat menghapus film yang disukai dari daftar', async () => {
        await TestFactories.createLikeButtonPresenterWitRestaurant({ id: 1 });

        document.querySelector('[aria-label="tidak sukai restaurant ini"]').dispatchEvent(new Event('click'));
        expect(await FavoriteRestaurant.getAllRestaurants()).toEqual([]);
    });

    it('tidak boleh menimbulkan kesalahan ketika pengguna mengklik widget yang tidak disukai jika film yang tidak disukai tidak ada dalam daftar', async () => {
        await TestFactories.createLikeButtonPresenterWitRestaurant({ id: 1 });

        await FavoriteRestaurant.deleteRestaurant(1);

        document.querySelector('[aria-label="tidak sukai restaurant ini"]').dispatchEvent(new Event('click'));
        expect(await FavoriteRestaurant.getAllRestaurants()).toEqual([]);
    });
});
