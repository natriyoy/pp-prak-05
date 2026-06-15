// Жёстко заданный логин/пароль. Регистрация не предусмотрена.
const ADMIN_LOGIN = 'ad'
const ADMIN_PASSWORD = '123456'

export function login(username, password) {
    if (username === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
        localStorage.setItem('bur52_admin_session', 'true')
        return true
    }
    return false
}

export function logout() {
    localStorage.removeItem('bur52_admin_session')
}

export function isAuthenticated() {
    return localStorage.getItem('bur52_admin_session') === 'true'
}