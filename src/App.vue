<template>
  <div id="app">
    <SplashScreen v-if="showSplash" @hide="showSplash = false" />
    <AppHeader />
    <main>
      <RouterView />
    </main>
    <AppFooter />
    <FaqChatbot />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AppHeader from './components/global/AppHeader.vue'
import AppFooter from './components/global/AppFooter.vue'
import FaqChatbot from './components/FaqChatbot.vue'
import SplashScreen from './components/global/SplashScreen.vue'

const showSplash = ref(false)

onMounted(() => {
  // Проверяем, был ли уже показан splash
  const splashShown = sessionStorage.getItem('splashShown')
  if (!splashShown) {
    showSplash.value = true
    sessionStorage.setItem('splashShown', 'true')
  }
})
</script>

<style>


/* Подсветка иконок при hover на карточке */
.hover-lift:hover .svc-icon,
.hover-lift:hover .stage-ico {
  background: var(--lazur);
  transition: background 0.25s ease;
}

.hover-lift:hover .svc-icon svg,
.hover-lift:hover .stage-ico svg {
  stroke: white;
  transition: stroke 0.25s ease;
}

/* Плавный переход между страницами роутера */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
:root {
  --lazur: #2764AE;
  --zag: #1E293B;
  --tex: #475569;
  --gagat: #0F172A;
  --gagat2: rgba(60, 60, 59, 0.1);
  --grad: linear-gradient(135deg, #1E3A8A 0%, #2764AE 100%);
  --bg-light: #F8FAFC;
  --white: #FFFFFF;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Manrope', sans-serif;
  color: var(--tex);
  background-color: var(--bg-light);
  line-height: 1.6;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
</style>