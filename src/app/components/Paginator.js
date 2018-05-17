import Vue from 'vue';

Vue.component('paginator', {
    props: ['next', 'previous'],
    template: `
    <nav class="blog-pagination">
        <a v-if="next" class="btn btn-outline-primary" href="#" @click="$root.nextPage()">Older</a>
        <a v-else class="btn btn-outline-secondary" disabled href="#" @click.stop.prevent>Older</a>

        <a v-if="previous" class="btn btn-outline-primary" href="#" @click="$root.previousPage()">Newer</a>
        <a v-else class="btn btn-outline-secondary" disabled href="#" @click.stop.prevent>Newer</a>
    </nav>
    `
})