class Restaurant {
    constructor(dataUrl) {
        this.dataUrl = dataUrl;
        this.RESTO = [];
        this.init();
    }

    async init() {
        await this.fetchData();
        this.bindSearchEvent();
    }

    async fetchData() {
        try {
            const response = await fetch(this.dataUrl);
            this.RESTO = await response.json();
        } catch (error) {
            console.error(`Error fetching data:`, error);
        }
    }

    renderRestaurant(restos, container = document.getElementById('restaurantSearchList')) {
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';

        container.innerHTML = restos.map(restaurant => `
            <div class="icon-item" style="margin-top: 15px; width: 25rem; text-align: center;">
                <a href="${restaurant.restaurant_url}" class="icon-link" style="text-decoration: none; color: black;">
                    <p class="icon-name" style="margin-top: 10px; font-weight: bold;">${restaurant.restaurant_name}</p>
                </a>
            </div>
        `).join('');
    }

    bindSearchEvent() {
        const restaurantSearchBar = document.getElementById('restaurantSearchBar');
        const restaurantSearchList = document.getElementById('restaurantSearchList');

        restaurantSearchBar.addEventListener('input', () => {
            const query = restaurantSearchBar.value;
            if (query) {
                this.filterRestaurant(query);
                restaurantSearchList.style.display = 'flex';
            } else {
                restaurantSearchList.style.display = 'none';
            }
        });
    }

    filterRestaurant(query) {
        const filteredRestaurants = this.RESTO.filter(restaurant => {
            return restaurant.restaurant_name.toLowerCase().includes(query.toLowerCase());
        });

        this.renderRestaurant(filteredRestaurants);
    }
}

const resList = new Restaurant('jasj.json');
