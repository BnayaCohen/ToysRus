<template>
    <ul class="review-list clean-list">
        <review-preview v-for="(review, i) in reviews" :review="review" :name="reviewUserOrToy(review)" :key="i"
            @removingReview="$emit('removed', $event)" />
    </ul>
</template>

<script>
import reviewPreview from './review-preview.vue'

export default {
    props: {
        reviews: Array,
        userOrToy: String
    },
    methods: {
        reviewUserOrToy(review) {
            switch (this.userOrToy) {
                case 'byUser': return review.byUser.username
                case 'aboutToy': return review.aboutToy.name
            }
        }
    },
    components: {
        reviewPreview,
    },
}
</script>