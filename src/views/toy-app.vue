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
         return this.$store.getters.filteredToys
    },
  },
  methods: {
    setFilter(filterBy) {
        this.$store.commit({ type: 'setFilter', filterBy })
    },
    goToEdit() {
      this.$router.push(`/toy/edit`)
    },
    removeToy(toyId) {
      this.$store.dispatch({ type: 'removeToy', id: toyId })
    },
  },
  components: {
    toyList,
    toyFilter,
  },
}
</script>
