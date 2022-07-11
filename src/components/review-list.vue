<template>
    <ul class="review-list clean-list grid gap-1">
        <review-preview v-for="(review, i) in reviews" :review="review" :key="i" />
    </ul>
</template>

<script>
import reviewPreview from './review-preview.vue'

export default {
    props: {
        reviews: Array
    },
    methods: {
    },
    components: {
        reviewPreview,
    },
}
</script>

<style lang="scss" scoped>
</style>