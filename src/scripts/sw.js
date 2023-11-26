import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute, Route } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';


// Do precaching
precacheAndRoute(self.__WB_MANIFEST);

const restaurantApi = new Route(
    ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev'),
    new StaleWhileRevalidate({
        cacheName: 'restaurant-api',
    }),
);

const restaurantImageApi = new Route(
    ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/images/large/'),
    new StaleWhileRevalidate({
        cacheName: 'restaurant-image-api',
    }),
);

registerRoute(restaurantApi);
registerRoute(restaurantImageApi);

self.addEventListener('install', () => {
    console.log('Service Worker: Installed');
    self.skipWaiting();
});

// self.addEventListener('push', (event) => {
//     console.log('Service Worker: Pushed');

//     const notificationMovie = event.data.json();
//     const notificationData = {
//         title: notificationMovie.title,
//         options: {
//             body: notificationMovie.options.body,
//             icon: notificationMovie.options.icon,
//             image: notificationMovie.options.image,
//         },
//     };

//     const showNotification = self.registration.showNotification(
//         notificationData.title,
//         notificationData.options,
//     );

//     event.waitUntil(showNotification);
// });

// self.addEventListener('notificationclick', (event) => {
//     const clickedNotification = event.notification;
//     clickedNotification.close();

//     const chainPromise = async () => {
//         console.log('Notification has been clicked');
//         await self.clients.openWindow('https://www.dicoding.com/');
//     };

//     event.waitUntil(chainPromise());
// });