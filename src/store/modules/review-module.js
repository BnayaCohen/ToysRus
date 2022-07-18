import { reviewService } from "../../services/review-service.js"

export default {
    state: {
        reviews: [],
        filterBy: {
            byUserId: '',
            aboutToyId: '',
        }
    },
    getters: {
        reviews({ reviews }) { return reviews }
    },
    mutations: {
        setReviews(state, { reviews }) {
            state.reviews = JSON.parse(JSON.stringify(reviews))
        },
        addReview(state, { review }) {
            state.reviews.unshift(JSON.parse(JSON.stringify(review)))
        },
        setReviewFilter(state, { filterBy }) {
            state.filterBy.byUserId = filterBy.byUserId
            state.filterBy.aboutToyId = filterBy.aboutToyId
        }
    },
    actions: {
        async loadReviews({ state, commit }) {
            const reviews = await reviewService.query(state.filterBy)
            commit({ type: 'setReviews', reviews })
        },
        async addReview({ commit }, { review }) {
            try {
                await reviewService.add(review)
                // commit({ type: 'addReview', review })
            } catch {
                console.log('cannot save review');
            }
        },
        async removeReview({ commit }, { reviewId }) {
            try {
                await reviewService.remove(reviewId)
            } catch {
                console.log('cannot remove review');
            }
        },
    }
}