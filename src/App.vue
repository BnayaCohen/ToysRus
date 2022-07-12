  <template>
  <header>
    <div class="wrapper">

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/toy">Toy</RouterLink>
        <!-- <RouterLink to="/about">About</RouterLink> -->
      </nav>
    </div>
  </header>

  <RouterView />
</template>
  
<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  name: 'app',
  created() {
    this.$store.dispatch('loadToys')
  }
}
</script>

