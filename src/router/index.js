import { createRouter, createWebHistory } from 'vue-router'
import homePage from '../views/Home-page.vue'
import loginPage from '../views/login-page.vue'
import aboutPage from '../views/about-page.vue'
import toyApp from '../views/toy-app.vue'
import toyDetails from '../views/toy-details.vue'
import toyEdit from '../views/toy-edit.vue'
import userDetails from '../views/user-details.vue'
import dashboardPage from '../views/dashboard-page.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login-page',
      component: loginPage
    },
    {
      path: '/',
      name: 'home',
      component: homePage
    },
    {
      path: '/toy',
      name: 'toy-app',
      component: toyApp,
    },
    {
      path: '/dashboard',
      name: 'dashboard-page',
      component: dashboardPage,
    },
    {
      path: '/toy/edit/:id?',
      name: 'toy-edit',
      component: toyEdit,
    },
    {
      path: '/toy/:id',
      name: 'toy-details',
      component: toyDetails,
    },
    {
      path: '/user',
      name: 'user-details',
      component: userDetails,
    },
    {
      path: '/about',
      name: 'about',
      component: aboutPage,
    }
  ]
})

export default router
