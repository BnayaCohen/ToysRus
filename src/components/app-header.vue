<template>
  <div class="full">
    <header class="main-header flex align-center justify-between">
      <div class="logo uppercase">
        <h1>TOYS R US</h1>
      </div>
      <nav class="flex gap-1">
        <router-link class="link" to="/">Home</router-link>
        <router-link class="link" to="/toy">Toy</router-link>
        <router-link class="link" to="/user">User</router-link>
        <router-link class="link" to="/dashboard">Dashboard</router-link>
        <router-link class="link" to="/about">About</router-link>
      </nav>
    </header>
    <button v-if="user" class="btn" @click="logout">Logout</button>
  </div>
</template>
<script>
export default {
  name: 'app-header',
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    async logout() {
     await this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  },
  created() {
    this.$store.dispatch('loadUser')
  }
}
</script>
