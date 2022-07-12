<template>
  <section class="toy-filter">
    <input v-model="filterBy.name" @input="filter" type="text" class="form-input" placeholder="Search by name..." />

    <el-select v-model="filterBy.inStock" @change="filter">
      <el-option v-for="(opt, i) in userOptions" :key="i"
      :label="userOptions[i]" :value="valueOptions[i]"/>
    </el-select>

    <el-select v-model="filterBy.labels" multiple collapse-tags placeholder="Filter by Labels" style="width: 240px"
      @change="filter">
      <el-option v-for="(label, i) in getLabels" :key="i" :label="label" :value="label" />
    </el-select>

    <el-button-group class="ml-4">
      <el-button type="primary" @click="setSort('name')">Name</el-button>
      <el-button type="primary" @click="setSort('date')">Date</el-button>
      <el-button type="primary" @click="setSort('price')">Price</el-button>
    </el-button-group>
  </section>
</template>

<script>
export default {
  name: 'toy-filter',
  data() {
    return {
      filterBy: {
        name: '',
        inStock: null,
        labels: [],
        sortBy: null,
      },
      userOptions: ['All', 'In stock', 'Out of stock'],
      valueOptions: [null, true, false],
    }
  },
  methods: {
    filter() {
      this.$emit('setFilter', this.filterBy)
    },
    setSort(sortBy) {
      this.filterBy.sortBy = sortBy
      this.$emit('setFilter', this.filterBy)
    }
  },
  computed: {
    getLabels() {
      return this.$store.getters.toysLabels
    }
  },
  unmounted() {
    this.filterBy = { name: '', inStock: null, labels: [], sortBy: null, }
    this.$emit('setFilter', this.filterBy)
  }
}
</script>
