import axios from 'axios';

const serverUrl = 'http://blog.net21.cz';

export default {
    getArticles(href = '/api/articles') {
        return axios.get(serverUrl + href)
            .then((response) => {
                const articles = {
                    posts: [],
                    links: {
                        next: undefined,
                        previous: undefined
                    }
                }

                if (!response.data.articles) {
                    throw new Error('No data.');
                }
                articles.posts = response.data.articles
                        .map(article => [article.href, article.data])
                        .map(article => ({href: article[0], ...article[1],}));

                response.data.links.forEach(link => {
                    switch (link.rel) {
                        case 'next':
                            articles.links.next = link.href;
                            break;
                        case 'previous':
                            articles.links.previous = link.href;
                            break;
                    }
                });

                return articles;
            })
    },

    getArticle(id) {
        return axios.get(serverUrl + '/api/articles/' + id)
            .then((response) => {
                if (!response.data.data) {
                    throw new Error('No data.');
                }
                return response.data.data;
            })
    }
}