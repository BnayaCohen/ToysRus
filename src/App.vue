<template>
  <app-header />
  <RouterView />
</template>
  
<script>
import { RouterLink, RouterView } from 'vue-router'
import appHeader from '@/components/app-header.vue'

export default {
  name: 'app',
  created() {
    this.$store.dispatch('loadToys')
  },
  components: {
    appHeader
  }
}
</script>

