import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import ServicesView from '@/views/ServicesView.vue'
import ServicesPriceView from '@/views/ServicesPriceView.vue'
import CalculatorView from '@/views/CalculatorView.vue'
import GalleryView from '@/views/GalleryView.vue'
import AboutView from '@/views/AboutView.vue'
import ContactsView from '@/views/ContactsView.vue'
import AdminLoginView from '@/views/AdminLoginView.vue'
import AdminDashboardView from '@/views/AdminDashboardView.vue'
import { adminGuard } from './guard'

const routes = [
    { path: '/',            component: HomeView },
    { path: '/services',    component: ServicesView },
    { path: '/prices',      component: ServicesPriceView },
    { path: '/calculator',  component: CalculatorView },
    { path: '/gallery',     component: GalleryView },
    { path: '/about',       component: AboutView },
    { path: '/contacts',    component: ContactsView },
    { path: '/admin',           component: AdminLoginView },
    { path: '/admin/dashboard', component: AdminDashboardView, beforeEnter: adminGuard },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    }
})

export default router