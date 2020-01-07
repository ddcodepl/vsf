<template>
    <v-row class="justify-center mb-5">
        <v-list width="100%">
            <v-list-item :key="item.id" v-for="item in posts">
                <v-list-item-content>
                    <v-list-item-title>
                        <router-link :to="{name: 'post', params: { id:item.id}}">{{item.title}}</router-link>
                    </v-list-item-title>
                    <v-list-item-subtitle>By: {{getAuthorNameByID(item.userId)}}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-row>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'

export default {
    name: 'PostsList',
    props: {
        page: {
            type: Number,
            default: 1,
        },
        itemsPerPage: {
            type: Number,
            default: 10,
        },
        order: {
            type: String,
            default: null,
        },
        filter: {
            type: Number,
            default: null,
        },
    },
    data: () => ({
        list: [],
    }),
    methods: {
        async init() {
            this.list = this.getPosts
        },
        sort() {
            if (this.order === 'asc') {
                this.list = _.sortBy(this.list, 'title')
            } else if (this.order === 'desc') {
                this.list = _.sortBy(this.list, 'title').reverse()
            } else if (this.order === null && this.filter === null) {
                this.list = this.getPosts
            }
        },
    },
    computed: {
        ...mapGetters(['getAuthorNameByID', 'getPosts']),
        posts: function() {
            const index = this.page * this.itemsPerPage - this.itemsPerPage

            return this.list.length
                ? this.list.slice(index, index + this.itemsPerPage)
                : []
        },
    },
    watch: {
        list(newVal, prevVal) {
            if (newVal.length !== prevVal.length) {
                this.$emit('updateListLength', {
                    length: newVal.length,
                    itemsPerPage: this.itemsPerPage,
                })
            }
        },
        filter(newVal) {
            if (newVal) {
                this.list = this.getPosts.filter(post => post.userId === newVal)
            } else {
                this.list = this.getPosts
            }

            this.sort()
        },
        order() {
            this.sort()
        },
    },
    mounted() {
        this.init()
    },
}
</script>