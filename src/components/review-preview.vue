<template>
    <li class="review-preview">
        <h3>{{ review.name }}</h3>
        <p><span class="fw-bold">Review:</span> {{ review.txt }}</p>
    </li>
</template>

<script>
export default {
    name: 'review-preview',
    props: {
        review: {
            type: Object,
        }
    },
}
</script>

<style lang="scss" scoped>
</style>