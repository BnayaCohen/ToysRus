<template>
    <article v-if="loggedInUser" class="user-details">
        <h3>{{ loggedInUser.username }}</h3>
        <h4>{{ loggedInUser.fullname }}</h4>
        <h4>Score: {{ loggedInUser.score }}</h4>
        <h2>User Reviews</h2>
        <review-list v-if="userReviews" :reviews="userReviews" :userOrToy="userOrToy" @removed="removeReview" />
    </article>
</template>

<script>
import reviewList from '../components/review-list.vue'
export default {
    data() {
        return {
            loggedInUser: null,
            // userReviews: [],
            userOrToy: 'aboutToy'
        }
    },
    methods: {
        async removeReview(review) {
            await this.$store.dispatch({ type: 'removeReview', reviewId: review })
            // await this.$store.dispatch('loadReviews')
            // this.userReviews = this.$store.getters.reviews
        }
    },
    async created() {
        this.loggedInUser = this.$store.getters.user
        if (!this.loggedInUser) this.$router.push('/login')

        this.$store.commit({ type: 'setReviewFilter', filterBy: { byUserId: this.loggedInUser._id } })
        await this.$store.dispatch('loadReviews')
        // this.userReviews = this.$store.getters.reviews
    },
    computed: {
        userReviews() {
            return this.$store.getters.reviews
        }
    },
    components: {
        reviewList
    },
}
</script>