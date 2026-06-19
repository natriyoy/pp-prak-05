import { isAuthenticated } from '@/utils/auth'

export function adminGuard(to, from, next) {
    if (!isAuthenticated()) {
        next('/admin')
    } else {
        next()
    }
}