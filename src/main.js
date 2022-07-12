import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/styles.css'

const app = createApp(App)

app.config.globalProperties.$filters = {
  currencyUSD(price) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
  },
}

app.use(router)
app.use(store)

app.mount('#app')