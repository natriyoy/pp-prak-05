<template>
  <section class="settings-page">
    <div class="settings-header">
      <h1>Настройки</h1>
      <router-link to="/admin/dashboard" class="btn-back">← К заявкам</router-link>
    </div>

    <!-- Смена пароля — доступна всем -->
    <div class="settings-card">
      <h2>Сменить пароль</h2>
      <input v-model="oldPassword" type="password" placeholder="Текущий пароль" class="inp">
      <input v-model="newPassword" type="password" placeholder="Новый пароль" class="inp">
      <input v-model="newPasswordRepeat" type="password" placeholder="Повторите новый пароль" class="inp">
      <p v-if="pwMessage" :class="['msg', pwSuccess ? 'msg-success' : 'msg-error']">{{ pwMessage }}</p>
      <button class="btn-primary" @click="handleChangePassword">Сохранить пароль</button>
    </div>

    <!-- Регистрация менеджера — только для admin -->
    <div v-if="isAdminUser" class="settings-card">
      <h2>Зарегистрировать менеджера</h2>
      <input v-model="newLogin" type="text" placeholder="Логин менеджера" class="inp">
      <input v-model="newUserPassword" type="password" placeholder="Пароль" class="inp">
      <p v-if="regMessage" :class="['msg', regSuccess ? 'msg-success' : 'msg-error']">{{ regMessage }}</p>
      <button class="btn-primary" @click="handleRegister">Создать аккаунт менеджера</button>
    </div>

    <!-- Список пользователей — только для admin -->
    <div v-if="isAdminUser" class="settings-card">
      <h2>Пользователи системы</h2>
      <div v-if="users.length === 0" class="msg">Загрузка...</div>
      <div v-else class="users-list">
        <div v-for="u in users" :key="u.id" class="user-row">
          <span class="user-login">{{ u.login }}</span>
          <span class="user-role" :class="u.role">{{ u.role === 'admin' ? 'Администратор' : 'Менеджер' }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { changePassword, registerUser, getAllUsers, getCurrentUser, isAdmin } from '@/utils/auth'

const isAdminUser = isAdmin()

const oldPassword = ref('')
const newPassword = ref('')
const newPasswordRepeat = ref('')
const pwMessage = ref('')
const pwSuccess = ref(false)

const newLogin = ref('')
const newUserPassword = ref('')
const regMessage = ref('')
const regSuccess = ref(false)

const users = ref([])

onMounted(async () => {
  if (isAdminUser) {
    users.value = await getAllUsers()
  }
})

async function handleChangePassword() {
  pwMessage.value = ''

  if (!oldPassword.value || !newPassword.value) {
    pwMessage.value = 'Заполните все поля'
    pwSuccess.value = false
    return
  }

  if (newPassword.value !== newPasswordRepeat.value) {
    pwMessage.value = 'Новые пароли не совпадают'
    pwSuccess.value = false
    return
  }

  const result = await changePassword(oldPassword.value, newPassword.value)
  pwMessage.value = result.message
  pwSuccess.value = result.success

  if (result.success) {
    oldPassword.value = ''
    newPassword.value = ''
    newPasswordRepeat.value = ''
  }
}

async function handleRegister() {
  regMessage.value = ''

  if (!newLogin.value || !newUserPassword.value) {
    regMessage.value = 'Заполните логин и пароль'
    regSuccess.value = false
    return
  }

  const result = await registerUser(newLogin.value, newUserPassword.value, 'manager')
  regMessage.value = result.message
  regSuccess.value = result.success

  if (result.success) {
    newLogin.value = ''
    newUserPassword.value = ''
    users.value = await getAllUsers()
  }
}
</script>

<style scoped>
.settings-page { max-width: 560px; margin: 0 auto; padding: 40px 20px; }
.settings-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.settings-header h1 { font-size: 24px; font-weight: 800; color: var(--zag, #1E293B); }
.btn-back { font-size: 13px; color: var(--lazur, #2764AE); text-decoration: none; font-weight: 600; }

.settings-card { background: white; border: 1px solid var(--border, #E2E8F0); border-radius: 14px; padding: 24px; margin-bottom: 20px; }
.settings-card h2 { font-size: 16px; font-weight: 700; color: var(--zag, #1E293B); margin-bottom: 16px; }

.inp { width: 100%; height: 42px; border: 1px solid var(--border, #E2E8F0); border-radius: 8px; padding: 0 14px; font-size: 14px; margin-bottom: 10px; font-family: inherit; }
.inp:focus { outline: none; border-color: var(--lazur, #2764AE); }

.btn-primary { width: 100%; height: 44px; background: var(--lazur, #2764AE); color: white; border: none; border-radius: 8px; font-weight: 700; font-size: 14px; cursor: pointer; }

.msg { font-size: 13px; margin-bottom: 10px; }
.msg-success { color: #16A34A; }
.msg-error { color: #DC2626; }

.users-list { display: flex; flex-direction: column; gap: 8px; }
.user-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: var(--bg, #F8FAFC); border-radius: 8px; }
.user-login { font-weight: 600; font-size: 13px; color: var(--zag, #1E293B); }
.user-role { font-size: 11px; padding: 3px 10px; border-radius: 12px; font-weight: 600; }
.user-role.admin { background: #FEE2E2; color: #991B1B; }
.user-role.manager { background: #DBEAFE; color: #1E40AF; }
</style>