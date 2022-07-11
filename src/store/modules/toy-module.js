import { toyService } from '../../services/toy-service'

export default {
    state: {
        toys: null,
        filterBy: {
            name: '',
            inStock: null,
            labels: [],
            sortBy: null,
        },
    },
    getters: {
        toys(state) {
            return state.toys
        },
        filteredToys({ filterBy, toys }) {
            if (!toys) return

            const regex = new RegExp(filterBy.name, 'i')
            let filteredToys = toys.filter((toy) => regex.test(toy.name))

            if (filterBy.inStock !== null) {
                filteredToys = filteredToys.filter(
                    (toy) => toy.inStock === filterBy.inStock
                )
            }

            if (filterBy.labels.length) {
                filteredToys = filteredToys.filter(toy =>
                    filterBy.labels.some(label => toy.labels.includes(label))
                )
            }

            if (filterBy.sortBy)
                switch (filterBy.sortBy) {
                    case 'name': filteredToys.sort((t1, t2) => t1.name.localeCompare(t2.name))
                        break
                    case 'date': filteredToys.sort((t1, t2) => t1.createdAt - t2.createdAt)
                        break
                    case 'price': filteredToys.sort((t1, t2) => t1.price - t2.price)
                        break
                }

            // const startIdx = filterBy.pageIdx * pageSize
            // filteredToys = filteredToys.slice(startIdx, startIdx + pageSize)

            return filteredToys
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
        loadToys({ commit }) {
            toyService.query().then((toys) => {
                commit({ type: 'setToys', toys })
            })
        },
        removeToy({ commit }, { id }) {
            console.log(id);
            toyService.remove(id).then(() => {
                commit({ type: 'removeToy', id })
            })
        },
        saveToy({ commit }, { toy }) {
            toyService.save(toy).then((toy) => {
                commit({ type: 'saveToy', toy })
            })
        },
        getToyById({ commit }, { id }) {
            return toyService.getById(id).then(toy => {
                toy.reviews = [
                    { name: 'Yosi', txt: 'The bex toy' },
                    { name: 'Ben', txt: 'OMG my son loves it' },
                    { name: 'Shmuel', txt: 'this toy is shit' }
                ]
                return toy
            })
        },
    },
}
