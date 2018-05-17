import Vue from 'vue';
import slugify from '../util/slugify.js';

Vue.component('blog-post', {
    props: ['post'],
    template: `
    <div class="blog-post">
        <h2 class="blog-post-title"><a v-bind:href="'/article/' + slugify(post.title) + '-' + post.id">{{ post.title }}</a></h2>
        <p class="blog-post-meta">
            {{ new Date(parseInt(post.createdAt) * 1000).toLocaleDateString() }}
            by <a v-bind:href="'/author/' + slugify(post.author.name) + '-' + post.author.id">{{ post.author.name }}</a></p>
        <p class="blog-post-summary" v-html="post.summary"></p>
    </div>
    `,
    methods: {
        slugify
    }
})