require('es6-promise').polyfill();

import Vue from 'vue';

import './app/components/LayoutMain';
import './app/components/AlertBox';
import './app/components/LoadingBox';
import './app/components/Article.vue';

import repo from './repo/articles';

var vm = new Vue({
     el: '#blog-article',
     data: {
         article: null,
         loading: true,
         errored: false
     },
     mounted() {
         repo.getArticle(33)
             .then((article) => {
                 this.article = article;
             })
             .catch(error => {
                 console.log(error)
                 this.errored = true
             })
             .finally(() => this.loading = false)
     },
     updated() {
         SyntaxHighlighter.highlight();
     }
 })