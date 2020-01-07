<template>
    <v-container>
        <SortAndFilter v-if="dataLoaded" @updateSort="updateSort" @updateAuthor="updateAuthor" />

        <PostsList
            :page="page"
            :order="sort"
            :filter="author"
            v-if="dataLoaded"
            @updateListLength="updateListLength"
        />

        <v-row v-if="totalLength">
            <v-pagination :total-visible="7" v-model="page" :length="totalLength"></v-pagination>
        </v-row>
    </v-container>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

import PostsList from '@/components/PostsList'
import SortAndFilter from '@/components/SortAndFilter'

export default {
    name: 'Posts',
    data: () => ({
        page: 1,
        sort: null,
        author: null,
        totalLength: 0,
        dataLoaded: false,
    }),
    components: {
        PostsList,
        SortAndFilter,
    },
    methods: {
        ...mapMutations(['setAuthors', 'setPosts']),
        init() {
            this.getData()
        },
        async getData() {
            const url = `https://jsonplaceholder.typicode.com/posts`

            await fetch(url)
                .then(response => response.json())
                .then(json => {
                    if (json.join('') !== this.getPosts.join('')) {
                        this.setPosts(json)
                    }
                })

            await this.getAuthors()
        },
        getAuthors() {
            const url = `https://jsonplaceholder.typicode.com/users`

            fetch(url)
                .then(response => response.json())
                .then(json => {
                    this.setAuthors(json)

                    this.dataLoaded = true
                })
        },
        updateAuthor(value) {
            this.author = value
        },
        updateSort(value) {
            this.sort = value
        },
        updateListLength(item) {
            this.page = 1
            this.totalLength = Math.ceil(item.length / item.itemsPerPage)
        },
    },
    computed: {
        ...mapGetters(['getPosts']),
    },
    mounted() {
        this.init()

        setInterval(this.getData, 10000)
    },
}
</script>
