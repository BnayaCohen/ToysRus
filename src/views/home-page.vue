<template>
  <main class="flex justify-center">
    <h1>Welcome Home</h1>
  </main>
</template>

<script>
export default {
  name:'home-page',
  created() {
     if (!this.$store.getters.user)
      this.$router.push('/login')
  }
}
</script>
