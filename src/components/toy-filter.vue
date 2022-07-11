<template>
  <section class="toy-filter">
    <input v-model="filterBy.name" @input="filter" type="text" class="form-input" placeholder="Search by name..." />

    <select v-model="filterBy.inStock" @change="filter">
      <option v-for="(opt, i) in userOptions" :key="i" :value="valueOptions[i]">
        {{ userOptions[i] }}</option>
    </select>

    <label for="labels">by Toy Labels</label>
    <select v-model="filterBy.labels" id="labels" @change="filter" multiple>
      <option value="On wheels">On wheels</option>
      <option value="Box game">Box game</option>
      <option value="Art">Art</option>
      <option value="Baby">Baby</option>
      <option value="Doll">Doll</option>
      <option value="Puzzle">Puzzle</option>
      <option value="Outdoor">Outdoor</option>
    </select>
    <div>
      <button class="btn" @click="setSort('name')">Name</button>
      <button class="btn" @click="setSort('date')">Date</button>
      <button class="btn" @click="setSort('price')">Price</button>
    </div>
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
}
</script>
