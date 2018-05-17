import Vue from 'vue';

Vue.component('paginator', {
    props: ['next', 'previous'],
    template: `
    <nav class="blog-pagination">
        <a v-if="next" class="btn btn-outline-primary" v-bind:href="'/page-' + next" @click.stop.prevent="$parent.$emit('next-page')">Older</a>
        <a v-else class="btn btn-outline-primary" disabled href="#" @click.stop.prevent>Older</a>

        <a v-if="previous" class="btn btn-outline-secondary" v-bind:href="'/page-' + previous" @click="$parent.$emit('previous-page')">Newer</a>
        <a v-else class="btn btn-outline-secondary" disabled href="#" @click.stop.prevent>Newer</a>
    </nav>
    `
})