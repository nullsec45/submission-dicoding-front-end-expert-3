const DrawerInitiator = {
    init({ button, drawer }) {
        button.addEventListener('click', (event) => {
            this._toggleDrawer(event, drawer);
        });

        window.addEventListener('resize', (event) => {
            const width = window.innerWidth;

            this._toggleDrawerWidth(event, drawer, width);
        });
    },

    _toggleDrawer(event, drawer) {
        event.stopPropagation();

        if (drawer.style.display === 'grid') {
            drawer.style.display = 'none';
        } else {
            drawer.style.display = 'grid';
        }
    },

    _toggleDrawerWidth(event, drawer, width) {
        event.stopPropagation();

        if (width > 768) {
            drawer.style.display = 'none';
        }
    },
};

export default DrawerInitiator;
