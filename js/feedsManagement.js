import { fetchFeeds } from './fetchFeeds.js';

class FeedsManagement {
    constructor() {
        this.sourceStoageName = 'sources';
        this.form = document.getElementById('form-add-feed');

        this.addFeed();
    }

    addFeed() {
        this.form.addEventListener('submit', e => {
            e.preventDefault();

            let formData = new FormData(this.form);
            const name = formData.get('feed_name');
            const url = formData.get('feed_url');

            //this.storeSource(name, url);

            // const feed = new fetchFeeds(url);
            // feed.fetchData();
        });
    }

    storeSource( name, url ) {
        chrome.storage.sync.get([this.sourceStoageName], (result) => {
            let sources = [];

            if( result[this.sourceStoageName] ) {
                sources = result[this.sourceStoageName];
            }

            if( sources.length > 0 ) {
                for( let i = 0; i < sources.length; i++ ) {
                    if( sources[i].url === url ) {
                        alert('Source already exists');
                        return;
                    }
                }
            }

            sources.push({
                name: name,
                url: url
            });

            chrome.storage.sync.set({ sources: sources }, () => {
                console.log('Source saved');
            });
        });
    }
}

new FeedsManagement();