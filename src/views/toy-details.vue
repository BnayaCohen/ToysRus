<template>
    <section v-if="toy" class="toy-details items-center">
        <chatCmp :toyId="toy._id" />

        <article>
            <p><span class="fw-bold">Name:</span> {{ toy.name }}</p>
            <p><span class="fw-bold">Price:</span> {{ $filters.currencyUSD(toy.price) }}</p>
            <p><span class="fw-bold">Labels:</span> {{ toy.labels.join(', ') }}</p>
            <p><span class="fw-bold">Created at:</span> {{ new Date(toy.createdAt).toLocaleString() }}</p>
            <p><span class="fw-bold">In stock:</span> {{ toy.inStock ? 'Yes' : 'No' }}</p>
        </article>
        <h2>Reviews</h2>
        <el-input v-model="newReview" type="text" placeholder="Write review..." />
        <el-button @click="addReview">Add Review</el-button>
        <h2 v-if="toyReviews.length === 0">No reviews yet</h2>
        <review-list v-if="toyReviews" :reviews="toyReviews" :userOrToy="userOrToy" @removed="removeReview" />
        <button @click="goBack" class="btn">go back</button>
    </section>
</template>

<script>
import reviewList from '../components/review-list.vue'
import chatCmp from '../components/chat-cmp.vue'

export default {
    name: 'toy-detail',
    data() {
        return {
            toy: null,
            toyReviews: [],
            newReview: '',
            userOrToy: 'byUser'
        }
    },
    async created() {
        const { id } = this.$route.params
        this.toy = await this.$store.dispatch({ type: 'getToyById', id })
        this.$store.commit({ type: 'setReviewFilter', filterBy: { aboutToyId: this.toy._id } })
        await this.$store.dispatch('loadReviews')
        this.toyReviews = this.$store.getters.reviews
    },
    methods: {
        goBack() {
            this.$router.push('/toy')
        },
        async addReview() {
            const review = {
                aboutToyId: this.toy._id,
                txt: this.newReview
            }
            await this.$store.dispatch({ type: 'addReview', review })
            await this.$store.dispatch('loadReviews')
            this.toyReviews = this.$store.getters.reviews
        },
        async removeReview(review) {
            await this.$store.dispatch({ type: 'removeReview', reviewId: review })
            await this.$store.dispatch('loadReviews')
            this.toyReviews = this.$store.getters.reviews
        }
    },
    components: {
        reviewList,
        chatCmp
    }
}
</script>