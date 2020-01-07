import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        authors: [],
        posts: []
    },
    mutations: {
        setAuthors: (state, payLoad) => {
            state.authors = payLoad   
        },
        setPosts: (state, payLoad) => [
            state.posts = payLoad
        ]
    },
    getters: {
        getAuthorsList: state => state.authors,
        getAuthorNameByID: state => payLoad => {
            const author = state.authors.filter(item => item.id === payLoad)

            return author.length ? author[0].name : 'Unknown'
        },
        getPosts: state => state.posts
    }
})
