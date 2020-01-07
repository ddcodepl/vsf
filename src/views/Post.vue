<template>
    <v-container>
        <v-row>
            <v-flex md8 pa-2>
                <v-card>
                    <v-card-title v-show="item.title">{{item.title}}</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text v-show="item.body">{{item.body}}</v-card-text>
                </v-card>
            </v-flex>

            <v-flex md4 pa-2>
                <v-card>
                    <v-card-title v-show="author.name">Author: {{author.name}}</v-card-title>
                </v-card>
            </v-flex>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'Post',
    data: () => ({
        item: {
            body: null,
            title: null,
        },
        author: {
            name: null,
        },
    }),
    methods: {
        async getData() {
            const { id } = this.$route.params
            const url = `https://jsonplaceholder.typicode.com/posts/${id}`

            await fetch(url)
                .then(response => {
                    if (response.status !== 200) {
                        alert(response.statusText)
                        this.$router.push({ name: 'posts' })
                    }
                    return response.json()
                })
                .then(json => (this.item = json))

            await this.getAuthor()
        },
        getAuthor() {
            const { userId } = this.item
            const url = `https://jsonplaceholder.typicode.com/users/${userId}`

            fetch(url)
                .then(response => response.json())
                .then(json => (this.author = json))
        },
    },
    mounted() {
        this.getData()
    },
}
</script>