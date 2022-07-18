import { toyService } from '@/services/toy-service'
import { reviewService } from '@/services/review-service'

export default {
    state: {
        toys: null,
        filterBy: {
            name: '',
            inStock: 'all',
            labels: [],
            sortBy: null,
        },
    },
    getters: {
        toys(state) {
            return state.toys
        },
        toysLabels() {
            return toyService.getLabels()
        },
        toysPricesByLabel(state) {
            // if (!state.toys) return {}
            console.log(state.toys);
            let labelMap = {}
            state.toys.forEach(toy => {
                toy.labels.forEach(label => {
                    if (labelMap[label]) {
                        labelMap[label].count++
                        labelMap[label].sumPrice += toy.price
                    }
                    else labelMap[label] = { count: 1, sumPrice: toy.price }
                })
            })
            let toysLabelNames = []
            let toysLabelPrices = []
            for (const label in labelMap) {
                toysLabelNames.push(label)
                toysLabelPrices.push(labelMap[label].sumPrice / labelMap[label].count)
            }
            return { labels: toysLabelNames, prices: toysLabelPrices }
        },
        toysInStockByLabel(state) {
            // if (!state.toys) return {}

            let labelMap = {}
            state.toys.forEach(toy => {
                toy.labels.forEach(label => {
                    if (labelMap[label]) {
                        labelMap[label]++
                    }
                    else labelMap[label] = 1
                })
            })
            let toysLabelNames = []
            let toysLabelInStock = []
            for (const label in labelMap) {
                toysLabelNames.push(label)
                toysLabelInStock.push(labelMap[label])
            }
            return { labels: toysLabelNames, inStock: toysLabelInStock }
        },
    },
    mutations: {
        setToys(state, { toys }) {
            state.toys = toys
        },
        removeToy(state, { id }) {
            const idx = state.toys.findIndex((toy) => toy._id === id)
            state.toys.splice(idx, 1)
        },
        saveToy(state, { toy }) {
            const idx = state.toys.findIndex((currToy) => currToy._id === toy._id)
            if (idx !== -1) state.toys.splice(idx, 1, toy)
            else state.toys.push(toy)
        },
        setFilter(state, { filterBy }) {
            state.filterBy = { ...filterBy }
        },
    },
    actions: {
        async loadToys({ commit, state }) {
            const toys = await toyService.query(state.filterBy)
            commit({ type: 'setToys', toys })
        },
        async removeToy({ commit }, { id }) {
            try {
                await toyService.remove(id)
                commit({ type: 'removeToy', id })
            } catch {
                console.log('cannot remove toy');
            }
        },
        async saveToy({ commit }, { toy }) {
            try {
                toy = await toyService.save(toy)
                commit({ type: 'saveToy', toy })
            } catch {
                console.log('cannot save toy');
            }
        },
        async getToyById({ commit }, { id }) {
            return await toyService.getById(id)
        },
    },
}
