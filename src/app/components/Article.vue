import Vue from 'vue';
import slugify from '../util/slugify.js';

Vue.component('article-entry', {
    props: ['article'],
    template: `
    <article v-if="article">
        <h1 class="blog-post-title">{{ article.title }}</h1>
        <p class="blog-post-meta">
            {{ new Date(parseInt(article.createdAt) * 1000).toLocaleDateString() }}
            by <a v-bind:href="'/author/' + slugify(article.author.name) + '-' + article.author.id">{{ article.author.name }}</a></p>
        <p v-html="article.summary"></p>
        <p v-html="article.body"></p>
    </article>
    `,
    methods: {
        slugify
    }
})