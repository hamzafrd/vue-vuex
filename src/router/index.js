import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePageProducts.vue';
import CheckOut from '@/views/CheckOut.vue'

const routes = [
    {
        path: "/",
        component: HomePage
    },
    {
        path: '/checkout',
        component: CheckOut
    },
]
//create router
const router = createRouter({
    history: createWebHistory(),
    routes  // config routes
})

export default router
