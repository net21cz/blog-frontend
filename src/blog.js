require('es6-promise').polyfill();

import Vue from 'vue';

import repo from './repo/articlesRepo';

import './app/components/LayoutMain';
import './app/components/AlertBox';
import './app/components/LoadingBox';
import './app/components/BlogPost';
import './app/components/Paginator';

new Vue({
     el: '#blog',
     data: {
         posts: [],
         links: {},
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
         nextPage() {
             this.loadArticles(this.links.next)
         },
         previousPage() {
             this.loadArticles(this.links.previous)
         },
         loadArticles(href) {
             repo.getArticles(href)
                 .then((articles) => {
                     this.links = articles.links;
                     this.posts = articles.posts;
                 })
                 .catch(error => {
                     console.log(error)
                     this.errored = true
                 })
                 .finally(() => this.loading = false)
         }
     },
     mounted() {
         this.loadArticles();
     }
 })