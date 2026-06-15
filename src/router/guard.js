import { isAuthenticated } from '@/utils/auth'

export function adminGuard(to, from, next) {
    if (to.path === '/admin/dashboard' && !isAuthenticated()) {
        next('/admin')
    } else {
        next()
    }
}