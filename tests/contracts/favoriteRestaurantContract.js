const itActsAsFavoriteRestauranteModel = (favoriteRestaurant) => {
    it('harus mengembalikan restaurant yang telah ditambahkan', async () => {
        favoriteRestaurant.putRestaurant({ id: 1 });
        favoriteRestaurant.putRestaurant({ id: 2 });

        expect(await favoriteRestaurant.getRestaurant(1)).toEqual({ id: 1 });
        expect(await favoriteRestaurant.getRestaurant(2)).toEqual({ id: 2 });
        expect(await favoriteRestaurant.getRestaurant(3)).toEqual(undefined);
    });

    it('harus menolak penambahan restaurant jika tidak memiliki properti yang benar', async () => {
        favoriteRestaurant.putRestaurant({ aProperty: 'property' });

        expect(await favoriteRestaurant.getAllRestaurants()).toEqual([]);
    });

    it('dapat mengembalikan semua restaurant yang telah ditambahkan', async () => {
        favoriteRestaurant.putRestaurant({ id: 1 });
        favoriteRestaurant.putRestaurant({ id: 2 });

        expect(await favoriteRestaurant.getAllRestaurants()).toEqual([{ id: 1 }, { id: 2 }]);
    });

    it('harus menghapus restaurant favorit', async () => {
        favoriteRestaurant.putRestaurant({ id: 1 });
        favoriteRestaurant.putRestaurant({ id: 2 });
        favoriteRestaurant.putRestaurant({ id: 3 });

        await favoriteRestaurant.deleteRestaurant(1);

        expect(await favoriteRestaurant.getAllRestaurants()).toEqual([{ id: 2 }, { id: 3 }]);
    });

    it('harus menangani permintaan untuk menghapus restaurant meskipun restaurant tersebut belum ditambahkan', async () => {
        favoriteRestaurant.putRestaurant({ id: 1 });
        favoriteRestaurant.putRestaurant({ id: 2 });
        favoriteRestaurant.putRestaurant({ id: 3 });

        await favoriteRestaurant.deleteRestaurant(4);

        expect(
            await favoriteRestaurant.getAllRestaurants(),
        ).toEqual(
            [{ id: 1 },
            { id: 2 },
            { id: 3 }],
        );
    });

    it('harus bisa mencari restaurant', async () => {
        favoriteRestaurant.putRestaurant({ id: 1, title: 'restaurant a' });
        favoriteRestaurant.putRestaurant({ id: 2, title: 'restaurant b' });
        favoriteRestaurant.putRestaurant({ id: 3, title: 'restaurant abc' });
        favoriteRestaurant.putRestaurant({ id: 4, title: 'ini mah restaurant abcd' });

        expect(await favoriteRestaurant.searchRestaurants('restaurant a')).toEqual([
            { id: 1, title: 'restaurant a' },
            { id: 3, title: 'restaurant abc' },
            { id: 4, title: 'ini mah restaurant abcd' },
        ]);
    });
};

// eslint-disable-next-line import/prefer-default-export
export { itActsAsFavoriteRestauranteModel };
