import Vue from 'vue';
import axios from 'axios';

import './components/AlertBox.vue';
import './components/LoadingBox.vue';

Vue.prototype.$http = axios;

const endpointUrl = 'http://blog.net21.cz/api/';

var vm = new Vue({
  el: '#blog-article',
  data: {
    article: null,
    loading: true,
    errored: false
  },
  mounted() {
    this.$http.get(endpointUrl + 'articles/' + 33)
      .then((response) => {
        if (!response.data.data) {
          throw new Error('No data.');
        }
        this.article = response.data.data;
          
        console.log("ARTICLE", this.article)
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
  },
  updated() {
    SyntaxHighlighter.highlight();
  },
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
})