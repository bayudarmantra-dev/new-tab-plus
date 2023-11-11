import { formatDistanceToNow } from 'date-fns';

export class fetchFeeds {
    constructor(url = false) {
        this.apiURL = `https://rss.dev-darmantra.workers.dev/?feed=${url}`;
        this.wrapper = document.getElementById('feeds');
    }

    fetchData() {
        fetch(this.apiURL)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if( data.status == 200 ) {
                    this.renderFeed( data.feed );
                }else {
                    this.wrapper.innerHTML = data.message;
                }
            })
            .catch(error => this.wrapper.innerHTML = error);
    }

    renderFeed( data ) {        
        let items = {};
        let template = '';

        if( data.rss ) {
            items = data.rss.channel.item;
        }

        if( data.feed ) {
            items = data.feed.entry;
        }

        items.forEach( item => {
            template += this.renderFeedItem( item );
        });

        this.wrapper.innerHTML = template;
    }

    renderFeedItem( item ) {
        let template = `
        <div class="card">
            <div class="feed-card">
                <a href="${this.getLink(item)}" target="_blank" title="${item.title}">
                    <div class="feed-card__thumbnail">
                        ${this.getThumbnail(item)}
                    </div>
                    <div class="feed-card__content">
                        <div class="feed-card__content__heading">
                            <span>Reddit</span>
                            <span>${this.getDate(item)}</span>
                        </div>
                        <span class="feed-card__content__title">${item.title}</span>
                    </div>
                </a>
            </div>
        </div>
        `;

        return template;
    }

    getLink( item ) {
        let link = '';

        if( typeof item.link === 'object' && item.link !== null ) {
            link = item.link.href;
        }else {
            link = item.link;
        }

        return link;
    }

    getThumbnail( item ) {
        let thumbnailSrc = false;
        let thumbnail = '';

        if( item.enclosure && item.enclosure['@_url'] ) {
            thumbnailSrc = item.enclosure['@_url'];
        }

        if( item.img ) {
            thumbnailSrc = item.img;
        }

        if( item['media:thumbnail'] ) {
            thumbnailSrc = item['media:thumbnail']['@_url'];
        }

        thumbnail = thumbnailSrc ? `<img src="${thumbnailSrc}" alt="${item.title}" loading="lazy">` : '<i class="icon-rss"></i>';

        return thumbnail;
    }

    getDate( item ) {
        let dateItem = false;
        let dateString = '';

        if( item.pubDate ) {
            dateItem = item.pubDate;
        }

        if( item.published ) {
            dateItem = item.published;
        }

        if( dateItem ) {
            const date = new Date(dateItem);
            const timeAgo = formatDistanceToNow(date, {
                addSuffix: true
            });

            dateString = timeAgo.replace('about', '');
        }
        
        return dateString;
    }
}