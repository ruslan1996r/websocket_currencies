import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'instruments',
        component: () => import("../pages/Instruments.vue")
    },
    {
        path: '/history/:symbol',
        name: "history",
        component: () => import("../pages/History.vue")
    },
    {
        path: '/orders',
        name: 'orders',
        component: () => import("../pages/Orders.vue")
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router