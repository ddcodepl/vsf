<template>
    <v-row class="justify-center align-center mb-5">
        <v-select
            clearable
            v-model="filter"
            item-value="id"
            item-text="name"
            :items="getAuthorsList"
            placeholder="Filter by author"
        ></v-select>

        <v-spacer></v-spacer>
        <v-btn @click="order = 'asc'" class="mr-3">A to Z</v-btn>
        <v-btn @click="order = 'desc'" class="ml-3 mr-3">Z to A</v-btn>
        <v-btn @click="reset" class="ml-3">Reset</v-btn>
    </v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'SortAndFilter',
    data: () => ({
        order: null,
        filter: null,
    }),
    methods: {
        init() {
            this.filter =
                localStorage.getItem('filter') &&
                parseInt(localStorage.getItem('filter'))

            this.order =
                localStorage.getItem('order') && localStorage.getItem('order')
        },
        reset() {
            this.order = this.filter = null
        },
    },
    computed: {
        ...mapGetters(['getAuthorsList']),
    },
    watch: {
        order(newVal) {
            newVal
                ? localStorage.setItem('order', newVal)
                : localStorage.removeItem('order')

            this.$emit('updateSort', newVal)
        },
        filter(newVal) {
            newVal
                ? localStorage.setItem('filter', newVal)
                : localStorage.removeItem('filter')

            this.$emit('updateAuthor', newVal)
        },
    },
    mounted() {
        this.init()
    },
}
</script>