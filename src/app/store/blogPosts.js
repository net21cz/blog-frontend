import Vue from 'vue'
import Vuex from 'vuex'

import repo from './repo/articles';

Vue.use(Vuex);

const state = {
    page: 0,
    posts: []
}

const getters = {
    posts: state => state.posts
}

const actions = {
    getPosts ({ commit }) {
        repo.getArticles()(products => {
            commit('setProducts', products)
        })
    }
}

const mutations = {
    setProducts (state, products) {
        state.all = products
    },

    decrementProductInventory (state, { id }) {
        const product = state.all.find(product => product.id === id)
        product.inventory--
    }
}

export default new Vuex.Store({
  modules: {
      state,
      getters,
      actions,
      mutations
  }
})