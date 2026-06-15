<template>
  <header>
    <div class="nav container">
      <router-link to="/" class="logo">
        <svg width="140px" viewBox="0 0 191.26 55.38" xmlns="http://www.w3.org/2000/svg">
          <g>
            <!-- Тёмная часть логотипа — цвет меняется в зависимости от страницы -->
            <path :fill="isHomePage ? '#fff' : '#3C3C3B'" d="M81.18,13.38v3.86h-12.72v6.76h6.24c2.42,0,4.48.86,6.2,2.58.86.83,1.5,1.77,1.93,2.82.43,1.05.64,2.17.64,3.38,0,2.42-.86,4.48-2.58,6.2-1.72,1.72-3.79,2.58-6.2,2.58h-10.11V13.38h16.59ZM68.46,37.66h6.24c1.34,0,2.5-.47,3.46-1.41.94-.97,1.41-2.12,1.41-3.46s-.47-2.5-1.41-3.46c-.97-.94-2.12-1.41-3.46-1.41h-6.24v9.74Z"/>
            <path :fill="isHomePage ? '#fff' : '#3C3C3B'" d="M90.72,13.38l6.76,14.37,7.01-14.37h4.35l-12.12,24.6c-.29.62-.66,1.18-1.11,1.67-.44.5-.96.93-1.55,1.31-1.15.72-2.46,1.09-3.91,1.09h-.89v-3.91h.89c.72,0,1.34-.16,1.85-.48.56-.35.99-.82,1.29-1.41l1.93-4.07-8.78-18.8h4.27Z"/>
            <path :fill="isHomePage ? '#fff' : '#3C3C3B'" d="M122.73,13.38c2.52,0,4.67.88,6.44,2.66,1.77,1.77,2.66,3.92,2.66,6.44,0,1.26-.22,2.43-.64,3.5-.43,1.07-1.1,2.05-2.01,2.94-1.77,1.8-3.92,2.7-6.44,2.7h-5.92v9.95h-3.87V13.38h9.78ZM116.82,27.71h5.92c1.42,0,2.66-.52,3.7-1.57,1.02-1.02,1.53-2.24,1.53-3.67s-.51-2.62-1.53-3.66c-1.05-1.02-2.28-1.53-3.7-1.53h-5.92v10.43Z"/>
            <path :fill="isHomePage ? '#fff' : '#3C3C3B'" d="M135.22,27.63h12.89v3.87h-12.89v-3.87Z"/>
            <path :fill="isHomePage ? '#fff' : '#3C3C3B'" d="M168.88,13.38v3.91h-10.43v6.24h2.94c2.47.03,4.6.95,6.4,2.78,1.77,1.85,2.66,4.04,2.66,6.56s-.9,4.68-2.7,6.48c-1.8,1.8-3.96,2.7-6.48,2.7-1.91,0-3.61-.48-5.11-1.45-1.53-.97-2.67-2.21-3.42-3.75l3.46-1.41c1.15,1.8,2.82,2.7,4.99,2.7,1.53,0,2.81-.51,3.83-1.53.51-.51.89-1.07,1.15-1.69.26-.62.38-1.3.38-2.05,0-1.48-.5-2.75-1.49-3.83-.99-1.07-2.22-1.61-3.67-1.61h-6.81v-14.05h14.3Z"/>
            <path :fill="isHomePage ? '#fff' : '#3C3C3B'" d="M188.52,15.43c1.75,1.72,2.62,3.78,2.62,6.2,0,2.2-.94,4.3-2.82,6.28l-9.3,9.74h12.24v3.91h-17.76v-3.91l11.88-12.24c1.24-1.32,1.85-2.58,1.85-3.79,0-1.42-.47-2.58-1.41-3.46-.94-.94-2.1-1.41-3.46-1.41-1.21,0-2.24.34-3.1,1.01s-1.42,1.58-1.69,2.74l-3.79-.89c.48-1.99,1.51-3.6,3.06-4.83,1.58-1.26,3.4-1.89,5.43-1.89,2.42,0,4.5.85,6.24,2.54Z"/>

            <!-- Синяя декоративная часть — всегда синяя -->
            <path fill="#2764ae" d="M18.97,48.69c-3.02,3.44-8.21,3.82-11.71.91.48,1.21,1.2,2.33,2.25,3.25,3.5,3.07,8.82,2.72,11.89-.78,2.46-2.81,3.85-10.8,4.27-17.66-.91.18-1.84.38-2.77.59-.64,5.73-1.93,11.42-3.93,13.7Z"/>
            <path fill="#2764ae" d="M5.55,38.18c4.3-4.91,16.62-7.48,21.96-8.39.11-2.27.11-3.77.11-3.77,0,0-18.94,2.45-24.49,8.78-4.41,5.04-4.09,12.59.58,17.26-2.16-4.44-1.61-9.93,1.85-13.88Z"/>
            <path fill="#2764ae" d="M48.65,36.41c3.44,3.02,3.82,8.21.91,11.71,1.21-.48,2.33-1.2,3.25-2.25,3.07-3.5,2.71-8.83-.78-11.89-2.8-2.46-10.79-3.86-17.65-4.27.18.91.38,1.84.59,2.77,5.73.64,11.41,1.94,13.69,3.93Z"/>
            <path fill="#2764ae" d="M38.15,49.83c-4.91-4.31-7.48-16.63-8.39-21.97-2.26-.11-3.77-.11-3.77-.11,0,0,2.44,18.95,8.78,24.51,5.04,4.42,12.58,4.1,17.25-.58-4.44,2.17-9.93,1.61-13.87-1.85Z"/>
            <path fill="#2764ae" d="M36.49,6.69c3.02-3.44,8.21-3.82,11.71-.91-.48-1.21-1.2-2.33-2.25-3.25-3.5-3.07-8.82-2.72-11.89.78-2.46,2.81-3.85,10.8-4.27,17.66.91-.18,1.84-.38,2.77-.59.64-5.73,1.93-11.42,3.93-13.7Z"/>
            <path fill="#2764ae" d="M49.91,17.2c-4.3,4.91-16.62,7.48-21.96,8.39-.11,2.27-.11,3.77-.11,3.77,0,0,18.94-2.45,24.49-8.78,4.41-5.04,4.09-12.59-.58-17.26,2.16,4.44,1.61,9.93-1.85,13.88Z"/>
            <path fill="#2764ae" d="M6.8,18.98c-3.44-3.02-3.82-8.21-.91-11.71-1.21.48-2.33,1.2-3.25,2.25C-.42,13.01-.07,18.34,3.43,21.4c2.8,2.46,10.79,3.86,17.65,4.27-.18-.91-.38-1.84-.59-2.77-5.73-.64-11.41-1.94-13.69-3.93Z"/>
            <path fill="#2764ae" d="M17.31,5.56c4.91,4.31,7.48,16.63,8.39,21.97,2.26.11,3.77.11,3.77.11,0,0-2.44-18.95-8.78-24.51C15.65-1.29,8.1-.97,3.44,3.7c4.44-2.17,9.93-1.61,13.87,1.85Z"/>
            <rect fill="#2764ae" x="27.49" y="27.31" width=".6" height=".67"/>
          </g>
        </svg>
      </router-link>

      <ul class="nav-menu desktop-menu">
        <li><router-link to="/" class="nav-menu-cl" :class="{ 'home-link': isHomePage }">Главная</router-link></li>
        <li><router-link to="/about" class="nav-menu-cl" :class="{ 'home-link': isHomePage }">О компании</router-link></li>
        <li><router-link to="/services" class="nav-menu-cl" :class="{ 'home-link': isHomePage }">Услуги</router-link></li>
        <li><router-link to="/gallery" class="nav-menu-cl" :class="{ 'home-link': isHomePage }">Наши работы</router-link></li>
        <li><router-link to="/contacts" class="nav-menu-cl" :class="{ 'home-link': isHomePage }">Контакты</router-link></li>

      </ul>

      <div class="svet">
        <router-link to="/calculator" class="nav-menu-cl btn-calc" :class="{ 'home-link': isHomePage }">Калькулятор</router-link>
        <router-link to="#" @click.prevent="openChat" class="nav-menu-cl btn-calc me" :class="{ 'home-link': isHomePage }">Чат-бот</router-link>
        <div class="burger-icon" @click="isMobileMenuOpen = !isMobileMenuOpen">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>

    <div class="burger-modal" :class="{ active: isMobileMenuOpen }">
      <div class="burger-modal-content">
        <span class="burger-close" @click="isMobileMenuOpen = false">&times;</span>
        <ul class="burger-menu">
          <li><router-link to="/" class="burger-menu-cl" @click="isMobileMenuOpen = false">Главная</router-link></li>
          <li><router-link to="/about" class="burger-menu-cl" @click="isMobileMenuOpen = false">О компании</router-link></li>
          <li><router-link to="/services" class="burger-menu-cl" @click="isMobileMenuOpen = false">Услуги</router-link></li>

          <li><router-link to="/gallery" class="burger-menu-cl" @click="isMobileMenuOpen = false">Наши работы</router-link></li>
          <li><router-link to="/contacts" class="burger-menu-cl" @click="isMobileMenuOpen = false">Контакты</router-link></li>

        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const isMobileMenuOpen = ref(false)
const route = useRoute()
const isHomePage = computed(() => route.path === '/')

const openChat = () => {
  window.dispatchEvent(new CustomEvent('open-faq-chat'))
}
</script>

<style>
header {
  z-index: 1000;
  padding-top: 20px;
  padding-bottom: 20px;
  top: 0;
}

.nav {
  display: flex;
  padding: 20px 120px;
  justify-content: space-between;
  align-items: center;

}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #1E293B;
  font-size: 1.5rem;
  font-weight: 800;
}

.logo-icon {
  font-size: 1.3em;
}

.desktop-menu {
  list-style: none;
  gap: 20px;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
}

.nav-menu-cl {
  padding: 10px 20px;
  text-decoration: none;
  color: #1E293B;
  font-weight: bold;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.nav-menu-cl:hover {
  background: rgba(60, 60, 59, 0.1);
  color: #2764AE;
}

.btn-calc {
  background: #2764AE;
  color: white !important;
}

.btn-calc:hover {
  background: #1E3A8A;
  color: white !important;
}



.svet {
  display: flex;
  gap: 20px;
  align-items: center;
}

.burger-icon {
  display: none;
  flex-direction: column;
  width: 30px;
  height: 21px;
  cursor: pointer;
  position: relative;
  z-index: 1001;
}

.burger-icon span {
  height: 3px;
  width: 100%;
  background: #ffffff;
  border-radius: 3px;
  transition: all 0.3s ease;
}

.burger-icon span:nth-child(2) {
  margin: 6px 0;
}

.burger-modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 1000;
}

.burger-modal.active {
  display: flex;
  align-items: center;
  justify-content: center;
}

.burger-modal-content {
  background: white;
  border-radius: 25px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  position: relative;
}

.burger-close {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 2rem;
  color: #475569;
  cursor: pointer;
}

.burger-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.burger-menu-cl {
  display: block;
  text-decoration: none;
  color: #1E293B;
  padding: 15px 20px;
  font-weight: 500;
  border-radius: 15px;
  transition: all 0.3s ease;
  text-align: center;
  font-size: 1.1em;
}

.burger-menu-cl:hover {
  background: rgba(60, 60, 59, 0.1);
}

@media (max-width: 1080px) {
  .desktop-menu {
    display: none;
  }
    .me {
      display: none;
    }
  .burger-icon {
    display: flex;
  }

  .nav {
    padding: 20px 20px;
  }
}

@media (max-width: 768px) {
  .burger-menu-cl:hover {
    background: none;
  }
}

/* ===== ДОБАВЛЕНО ТОЛЬКО ДЛЯ СМЕНЫ ЦВЕТА ТЕКСТА ССЫЛОК НА ГЛАВНОЙ ===== */
.home-link {
  color: #ffffff !important;
}
.home-link:hover {
  background: rgba(255, 255, 255, 0.15) !important;
  color: #ffffff !important;
}
</style>