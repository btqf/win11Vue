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
    {
        path: '/terminal',
        name: 'terminal',
        component: () => import('@/components/Terminal')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// router.beforeEach(function (to, from, next) {
//     if (to.name === 'Login') {
//         const store = useUserStore()
//     }
// })


export default router