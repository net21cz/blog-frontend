import Vue from 'vue';
import axios from 'axios';

import './components/AlertBox.vue';
import './components/LoadingBox.vue';

Vue.prototype.$http = axios;

const endpointUrl = 'http://blog.net21.cz/api/';

const blogPostComponent = {
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
    slugify: function(text) {
      return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');
    }
  }
}

var vm = new Vue({
  el: '#blog',
  data: {
    posts: [],
    loading: true,
    errored: false
  },
  mounted() {
    this.$http.get(endpointUrl + 'articles')
      .then((response) => {
        if (!response.data.articles) {
          throw new Error('No data.');
        }
        this.posts = response.data.articles
          .map(article => [article.href, article.data])
          .map(article => ({ href: article[0], ...article[1],  }));

        console.log("ARTICLES", this.posts)
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
  },
  components: {
    'blog-post': blogPostComponent
  }
})