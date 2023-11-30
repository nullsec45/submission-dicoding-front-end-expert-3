const assert = require('assert');

Feature('Batal Menyukai Restaurant');

Before(async ({ I }) => {
    I.amOnPage('/');

    I.seeElement('.card_title');

    I.seeElement('.btn_detail');
    I.click(locate('.btn_detail').first());

    I.seeElement('#likeButton');
    I.click('#likeButton');
});

Scenario('menampilkan ada restaurant  yang disukai', async ({ I }) => {
    I.amOnPage('/');
    const firstRestaurant = locate('.card_title').first();
    const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);

    I.amOnPage('/#/favorite');
    I.seeElement('.container_card_restaurant');

    const firstRestaurantLiked = locate('.card_title').first();
    const likedRestaurantTitle = await I.grabTextFrom(firstRestaurantLiked);

    assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('menampilkan ada restaurant  yang disukai', async ({ I }) => {
    I.amOnPage('/');
    const firstRestaurant = locate('.card_title').first();
    const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);

    I.amOnPage('/#/favorite');
    I.seeElement('.container_card_restaurant');

    const firstRestaurantLiked = locate('.card_title').first();
    const likedRestaurantTitle = await I.grabTextFrom(firstRestaurantLiked);

    assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('Batal menyukai restaurant', async ({ I }) => {
    I.amOnPage('/#/favorite');

    I.seeElement('.btn_detail');
    I.click(locate('.btn_detail').first());

    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorite');
    I.see('Tidak ada restaurant yang ditemukan :(');
});
