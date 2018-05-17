require('es6-promise').polyfill();

import Vue from 'vue';
import axios from 'axios';

import './components/LayoutMain';
import './components/AlertBox';
import './components/LoadingBox';
import './components/BlogPost';
import './components/Paginator';

Vue.prototype.$http = axios;

const endpointUrl = 'http://blog.net21.cz/api/';

var vm = new Vue({
     el: '#blog',
     data: {
         posts: [],
         links: {
             next: undefined,
             previous: undefined
         },
         paginator: {
             page: 0
         },
         loading: true,
         errored: false
     },
     computed: {
         hasPages() {
             return this.links.next || this.links.previous;
         },
         next() {
             return this.links.next ? this.paginator.page + 1 : undefined;
         },
         previous() {
             return this.links.previous ? this.paginator.page - 1 : undefined;
         }
     },
     methods: {
         sayHi() {
             alert('hi!');
         }
     },
     mounted() {
         this.$http.get(endpointUrl + 'articles')
             .then((response) => {
                 if (!response.data.articles) {
                     throw new Error('No data.');
                 }
                 this.posts = response.data.articles
                         .map(article => [article.href, article.data])
                         .map(article => ({href: article[0], ...article[1],}));

                 response.data.links.forEach(link => {
                     switch (link.rel) {
                         case 'next':
                             this.links.next = link.href;
                             break;
                         case 'previous':
                             this.links.previous = link.href;
                             break;
                     }
                 });
             })
             .catch(error => {
                 console.log(error)
                 this.errored = true
             })
             .finally(() => this.loading = false)
     }
 })