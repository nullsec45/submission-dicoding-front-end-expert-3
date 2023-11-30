Feature('Menambah Review Pada Sebuah Restaurant');

Before(({ I }) => {
    I.amOnPage('/');
    I.seeElement('.btn_detail');
    I.click(locate('.btn_detail').first());
});

Scenario('menampilkan seluruh review', ({ I }) => {
    I.seeElement('.container_review');
});

Scenario('Menambahkan Review', async ({ I }) => {
    const username = 'I Love You Denisa';
    const review = 'Testing awkwak';
    I.fillField('username', username);
    I.fillField('review', review);
    I.click(locate('#buttonReview'));
    I.seeElement('.loading_api');
    I.see('I Love You Denisa');
    I.see('Testing awkwak');
});
