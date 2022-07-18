<template>
    <li class="review-preview">
        <h3>{{ name }}</h3>
        <p>{{ review.txt }}</p>
        <el-button type="danger" @click="$emit('removingReview',review._id)">Remove</el-button>
    </li>
</template>

<script>
export default {
    name: 'review-preview',
    props: {
        review: {
            type: Object,
        },
        name:{
            type: String,
        }
    },
    methods: {
    }
}
</script>
