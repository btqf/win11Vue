import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Login',
        component: () => import('@/views/Login')
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router