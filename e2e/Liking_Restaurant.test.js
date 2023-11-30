const assert = require('assert');

Feature('Menyukai Restaurant');

Before(({ I }) => {
    I.amOnPage("/#/favorite")
});


Scenario('menampilkan tidak ada restaurant  yang disukai', ({ I }) => {
    I.see('Tidak ada restaurant yang ditemukan :(');
});

Scenario('menyukai satu restaurant', async ({ I }) => {
    I.see('Tidak ada restaurant yang ditemukan :(');

    I.amOnPage('/');

    I.seeElement('.card_title');
    const firstRestaurant = locate('.card_title').first();
    const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);

    I.seeElement('.btn_detail');
    I.click(locate('.btn_detail').first());

    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorite');
    I.seeElement('.container_card_restaurant');

    const firstRestaurantLiked = locate(".card_title").first();
    const likedRestaurantTitle = await I.grabTextFrom(firstRestaurantLiked);

    assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});
