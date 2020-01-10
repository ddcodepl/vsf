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
        async init() {
            await this.getData()
            this.dataLoaded = true

            setInterval(this.getData(), 10000)
        },
        async getData() {
            const urlPosts = `https://jsonplaceholder.typicode.com/posts`
            const urlAuthors = `https://jsonplaceholder.typicode.com/users`

            const [posts, authors] = await Promise.all([
                fetch(urlPosts).then(response => response.json()),
                fetch(urlAuthors).then(response => response.json()),
            ])

            this.setPosts(posts)
            this.setAuthors(authors)
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
    },
}
</script>
