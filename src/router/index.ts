import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Cep from '@/views/Cep.vue'
import Translate from '@/views/Translate.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/cep',
            name: 'cep',
            component: Cep
        },
        {
            path: '/translate',
            name: 'translate',
            component: Translate
        },
    ]
})

export default router
