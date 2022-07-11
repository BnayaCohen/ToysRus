<template>
    <li class="toy-preview">
        <h3>{{ toy.name }}</h3>
        <p><span class="fw-bold">Price:</span> {{ $filters.currencyUSD(toy.price) }}</p>
        <p><span class="fw-bold">In stock:</span> {{ toy.inStock ? 'Yes' : 'No' }}</p>

        <div class="btn-group">
            <button @click="goToEdit" class="btn btn-primary">edit</button>
            <button @click="goToDetail" class="btn btn-info">details</button>
            <button @click="removeToy" class="btn btn-danger">remove</button>
        </div>
    </li>
</template>

<script>
export default {
    name: 'toy-preview',
    props: {
        toy: {
            type: Object,
            required: true,
        }
    },
    methods: {
        goToDetail() {
            this.$router.push(`/toy/${this.toy._id}`)
        },
        goToEdit() {
            this.$router.push(`/toy/edit/${this.toy._id}`)
        },
        removeToy() {
            this.$emit('removeToy', this.toy._id)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>