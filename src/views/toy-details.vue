<template>
    <section v-if="toy" class="toy-details flex flex-col items-center gap-2">
        <article>
            <p><span class="fw-bold">Name:</span> {{ toy.name }}</p>
            <p><span class="fw-bold">Price:</span> {{ $filters.currencyUSD(toy.price)  }}</p>
            <p><span class="fw-bold">Labels:</span> {{ toy.labels.join(', ') }}</p>
            <p><span class="fw-bold">Created at:</span> {{ new Date(toy.createdAt).toLocaleString() }}</p>
            <p><span class="fw-bold">In stock:</span> {{ toy.inStock ? 'Yes' : 'No' }}</p>
        </article>
        <button @click="goBack" class="btn btn-primary">go back</button>
    </section>
</template>

<script>
export default {
    name: 'toy-detail',
    data() {
        return {
            toy: null,
        }
    },
    created() {
        const { id } = this.$route.params
        this.$store.dispatch({ type: 'getToyById', id }).then((toy) => {
            this.toy = toy
        })
    },
    methods: {
        goBack() {
            this.$router.push('/toy')
        },
    },
    computed: {
    }
}
</script>


<style lang="scss" scoped>
</style>