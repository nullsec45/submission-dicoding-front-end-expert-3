import DaftarRestaurant from '../views/pages/daftar-restaurant';
import Search from '../views/pages/search-restaurant';
import Detail from '../views/pages/detail';
import Favorite from '../views/pages/favorite';

const routes = {
    '/': DaftarRestaurant,
    '/search': Search,
    '/detail/:id': Detail,
    '/favorite': Favorite,
};

export default routes;