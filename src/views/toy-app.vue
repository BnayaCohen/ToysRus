<template>
  <section class="toy-app-container">
    <button @click="goToEdit" class="btn">Add toy</button>
    <toy-filter @setFilter="setFilter" />
    <toy-list @removeToy="removeToy" v-if="toys" :toys="toysToShow" />
  </section>
</template>

<script>
import toyFilter from '../components/toy-filter.vue'
import toyList from '../components/toy-list.vue'

export default {
  name: 'toy-app',
  data() {
    return {
      filterBy: null,
    }
  },
  computed: {
    toys() {
      return this.$store.getters.toys
    },
    toysToShow() {
        //  return this.$store.getters.filteredTodos
      if (!this.filterBy) return this.toys
      const regex = new RegExp(this.filterBy.vendor, 'i')
      return this.toys.filter((toy) => regex.test(toy.vendor))
    },
  },
  created() {
    // this.$store.dispatch('loadToys')
  },
  methods: {
    setFilter(filterBy) {
        // this.$store.commit({ type: 'setFilter', filterBy })
      this.filterBy = filterBy
    },
    goToEdit() {
      this.$router.push(`/toy/edit`)
    },
    removeToy(toyId) {
        console.log('aaa');
      this.$store.dispatch({ type: 'removeToy', id: toyId })
    },
  },
  components: {
    toyList,
    toyFilter,
  },
}
</script>
