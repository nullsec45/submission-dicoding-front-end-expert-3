import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
    constructor({
        hamburgerButton,
        content,
        drawer,
        hero,
        mainContent,
        contentSkip,
    }) {
        this._hero = hero;
        this._mainContent = mainContent;
        this._content = content;
        this._initialAppShell({ hamburgerButton, drawer, contentSkip });
    }

    _initialAppShell(element) {
        DrawerInitiator.init({
            button: element.hamburgerButton,
            drawer: element.drawer,
            contentSkip: element.contentSkip,
        });

        // kita bisa menginisiasikan komponen lain bila ada
    }

    async renderPage() {
        const url = UrlParser.parseActiveUrlWithCombiner();
        if (url !== '/') {
            this._hero.style.display = 'none';
        } else {
            this._hero.style.display = 'flex';
        }
        const page = routes[url];
        this._content.innerHTML = '';
        this._content.insertAdjacentHTML('afterbegin', await page.render());
        await page.afterRender(this._mainContent);
        const skipLinkElem = document.querySelector('#contentSkip');

        skipLinkElem.addEventListener('click', (event) => {

            event.preventDefault();

            document.querySelector('#mainContent').focus();

        });
    }
}

export default App;
