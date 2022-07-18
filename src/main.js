import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueGoogleMaps from '@fawmi/vue-google-maps'

// Styles
import "./styles/styles.scss";

const app = createApp(App)

app.config.globalProperties.$filters = {
  currencyUSD(price) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
  },
}

app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCObbQR5iXuOnr21eWZtddI2e6uigpaDAs',
  },
})

app.mount('#app')