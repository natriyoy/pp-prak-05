import { db } from '@/firebase'
import { collection, getDocs, addDoc, query, where, doc, updateDoc,deleteDoc } from 'firebase/firestore'

const usersCollection = collection(db, 'users')
const SESSION_KEY = 'bur52_admin_session'

// Создаёт первого администратора, если коллекция users пуста.
// Вызови один раз вручную (например, из консоли) или см. инструкцию ниже.
export async function ensureDefaultAdmin() {
    const snapshot = await getDocs(usersCollection)
    if (snapshot.empty) {
        await addDoc(usersCollection, {
            login: 'admin',
            password: 'bur52admin2025',
            role: 'admin',
            createdAt: Date.now()
        })
    }
}
export async function deleteUser(userId) {
    await deleteDoc(doc(db, 'users', userId))
}
export async function login(loginValue, password) {
    const q = query(usersCollection, where('login', '==', loginValue), where('password', '==', password))
    const snapshot = await getDocs(q)

    if (snapshot.empty) return false

    const userDoc = snapshot.docs[0]
    const userData = { id: userDoc.id, ...userDoc.data() }

    sessionStorage.setItem(SESSION_KEY, JSON.stringify({
        id: userData.id,
        login: userData.login,
        role: userData.role
    }))

    return true
}

export function logout() {
    sessionStorage.removeItem(SESSION_KEY)
}

export function isAuthenticated() {
    return !!sessionStorage.getItem(SESSION_KEY)
}

export function getCurrentUser() {
    const raw = sessionStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
}

export function isAdmin() {
    const user = getCurrentUser()
    return user?.role === 'admin'
}

// Смена пароля текущего пользователя (доступно всем авторизованным)
export async function changePassword(oldPassword, newPassword) {
    const user = getCurrentUser()
    if (!user) return { success: false, message: 'Не авторизован' }

    const q = query(usersCollection, where('login', '==', user.login), where('password', '==', oldPassword))
    const snapshot = await getDocs(q)

    if (snapshot.empty) {
        return { success: false, message: 'Старый пароль неверен' }
    }

    const userDoc = snapshot.docs[0]
    await updateDoc(doc(db, 'users', userDoc.id), { password: newPassword })

    return { success: true, message: 'Пароль изменён' }
}

// Регистрация нового пользователя (только для admin — проверка на UI-уровне)
export async function registerUser(loginValue, password, role = 'manager') {
    const q = query(usersCollection, where('login', '==', loginValue))
    const existing = await getDocs(q)

    if (!existing.empty) {
        return { success: false, message: 'Такой логин уже существует' }
    }

    await addDoc(usersCollection, {
        login: loginValue,
        password,
        role,
        createdAt: Date.now()
    })

    return { success: true, message: 'Пользователь создан' }
}

export async function getAllUsers() {
    const snapshot = await getDocs(usersCollection)
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
}