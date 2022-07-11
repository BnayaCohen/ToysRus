import { toyService } from '../../services/toy-service'

export default {
    state: {
        toys: null,
        filterBy: {
            name: '',
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

            // if (filterBy.isDone !== null) {
            //   filteredToys = filteredToys.filter(
            //     (toy) => toy.isDone === filterBy.isDone
            //   )
            // }

            // if (filterBy.toSort) {
            //   filteredToys.sort((t1, t2) => t1.name.localeCompare(t2.name))
            // }

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
                    { name: 'Yosi', review: 'The bex toy' },
                    { name: 'Ben', review: 'OMG my son loves it' },
                    { name: 'Shmuel', review: 'this toy is shit' }
                ]
                return toy
            })
        },
    },
}
