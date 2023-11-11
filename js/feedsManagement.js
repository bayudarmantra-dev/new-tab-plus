import { fetchFeeds } from './fetchFeeds.js';

class FeedsManagement {
    constructor() {
        this.form = document.getElementById('form-add-feed');

        this.addFeed();
    }

    addFeed() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();

            let formData = new FormData(this.form);
            const name = formData.get('feed_name');
            const url = formData.get('feed_url');

            const feed = new fetchFeeds(url);
            feed.fetchData();
        });
    }
}

new FeedsManagement();