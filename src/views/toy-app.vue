<template>
  <section class="toy-app-container">
    <el-button type="warning" @click="goToEdit">Add toy</el-button>
    <toy-filter @setFilter="setFilter" />
    <toy-list @removeToy="removeToy" v-if="toys" :toys="toys" />
  </section>
</template>

<script>
import toyFilter from '../components/toy-filter.vue'
import toyList from '../components/toy-list.vue'

export default {
  name: 'toy-app',
  data() {
    return {
    }
  },
  computed: {
    toys() {
      return this.$store.getters.toys
    },
  },
  methods: {
    setFilter(filterBy) {
        this.$store.commit({ type: 'setFilter', filterBy })
        this.$store.dispatch('loadToys')
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
