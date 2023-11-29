import 'regenerator-runtime';
import '../styles/main.scss';
import swRegister from './utils/sw-register';
import App from './views/app';

const app = new App({
    hamburgerButton: document.querySelector('#hamburgerIcon'),
    content: document.querySelector('#mainContent'),
    drawer: document.querySelector('#navbarResponsive'),
    hero: document.querySelector('#hero'),
    mainContent: document.querySelector('#mainContent'),
    contentSkip: document.querySelector('#contentSkip'),
});

window.addEventListener('hashchange', () => {
    app.renderPage();
});

window.addEventListener('load', () => {
    app.renderPage();
    swRegister();
});
