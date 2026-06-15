<template>
  <section class="admin-login">
    <div class="login-box">
      <h1>Вход в панель управления</h1>
      <p class="sub">Доступ только для администратора</p>
      <form @submit.prevent="handleSubmit">
        <input v-model="username" type="text" placeholder="Логин" class="inp" autocomplete="off">
        <input v-model="password" type="password" placeholder="Пароль" class="inp" autocomplete="off">
        <button type="submit" class="btn-submit">Войти</button>
        <p v-if="error" class="error">Неверный логин или пароль</p>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/utils/auth'

const username = ref('')
const password = ref('')
const error = ref(false)
const router = useRouter()

function handleSubmit() {
  if (login(username.value, password.value)) {
    error.value = false
    router.push('/admin/dashboard')
  } else {
    error.value = true
  }
}
</script>

<style scoped>
.admin-login {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}
.login-box {
  background: white;
  border: 1px solid var(--border, #E2E8F0);
  border-radius: 16px;
  padding: 40px;
  width: 100%;
  max-width: 380px;
}
.login-box h1 {
  font-size: 22px;
  font-weight: 800;
  color: var(--zag, #1E293B);
  margin-bottom: 6px;
}
.sub {
  font-size: 13px;
  color: var(--tex, #475569);
  margin-bottom: 24px;
}
.inp {
  width: 100%;
  height: 44px;
  border: 1px solid var(--border, #E2E8F0);
  border-radius: 8px;
  padding: 0 14px;
  font-size: 14px;
  margin-bottom: 12px;
  font-family: inherit;
}
.inp:focus {
  outline: none;
  border-color: var(--lazur, #2764AE);
}
.btn-submit {
  width: 100%;
  height: 46px;
  background: var(--lazur, #2764AE);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
}
.error {
  color: #DC2626;
  font-size: 13px;
  margin-top: 10px;
  text-align: center;
}
</style>