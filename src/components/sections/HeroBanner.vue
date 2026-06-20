<template>
  <section class="hero">
    <div class="hero-overlay"></div>
    <div class="hero-drops">
      <span class="drop" v-for="n in 8" :key="n"></span>
    </div>

    <div class="container hero-content">
      <div class="hero-badge">
        Работаем в Нижегородской области · с 2008 года
      </div>

      <h1>Профессиональное бурение<br>скважин на воду <em>под ключ</em></h1>
      <p>Глубина до 150 метров. Немецкое оборудование. Гарантия 5 лет.<br>Бесплатный выезд инженера для оценки участка.</p>

      <div class="cta-buttons">
        <router-link to="/calculator" class="btn2 btn-primary2 hover-scale">

          <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 7C14 6.44771 14.4477 6 15 6H16V5C16 4.44772 16.4477 4 17 4C17.5523 4 18 4.44772 18 5V6H19C19.5523 6 20 6.44771 20 7C20 7.55229 19.5523 8 19 8H18V9C18 9.55228 17.5523 10 17 10C16.4477 10 16 9.55228 16 9V8H15C14.4477 8 14 7.55229 14 7Z" fill="#fff"/>
            <path d="M14 15C14 14.4477 14.4477 14 15 14H19C19.5523 14 20 14.4477 20 15C20 15.5523 19.5523 16 19 16H15C14.4477 16 14 15.5523 14 15Z" fill="#fff"/>
            <path d="M15 18C14.4477 18 14 18.4477 14 19C14 19.5523 14.4477 20 15 20H19C19.5523 20 20 19.5523 20 19C20 18.4477 19.5523 18 19 18H15Z" fill="#fff"/>
            <path d="M5 6C4.44772 6 4 6.44771 4 7C4 7.55229 4.44772 8 5 8H9C9.55228 8 10 7.55229 10 7C10 6.44771 9.55228 6 9 6H5Z" fill="#fff"/>
            <path d="M5.92512 14.5109C5.5346 14.1204 4.90143 14.1204 4.51091 14.5109C4.12039 14.9014 4.12039 15.5346 4.51091 15.9251L5.5858 17L4.50337 18.0824C4.11284 18.4729 4.11284 19.1061 4.50337 19.4966C4.89389 19.8872 5.52705 19.8872 5.91758 19.4966L7.00002 18.4142L8.08944 19.5036C8.47996 19.8941 9.11313 19.8941 9.50365 19.5036C9.89418 19.1131 9.89418 18.4799 9.50365 18.0894L8.41423 17L9.50194 15.9123C9.89246 15.5218 9.89246 14.8886 9.50194 14.4981C9.11141 14.1075 8.47825 14.1075 8.08772 14.4981L7.00002 15.5858L5.92512 14.5109Z" fill="#fff"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V11H13V3H20ZM21 13V20C21 20.5523 20.5523 21 20 21H13V13H21ZM4 3H11V11H3V4C3 3.44772 3.44772 3 4 3ZM3 20V13H11V21H4C3.44772 21 3 20.5523 3 20Z" fill="#fff"/>
          </svg> Рассчитать стоимость
        </router-link>
        <a href="tel:89200521982" class="btn2 btn-chat hover-scale">

          <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 5.5C3 14.0604 9.93959 21 18.5 21C18.8862 21 19.2691 20.9859 19.6483 20.9581C20.0834 20.9262 20.3009 20.9103 20.499 20.7963C20.663 20.7019 20.8185 20.5345 20.9007 20.364C21 20.1582 21 19.9181 21 19.438V16.6207C21 16.2169 21 16.015 20.9335 15.842C20.8749 15.6891 20.7795 15.553 20.6559 15.4456C20.516 15.324 20.3262 15.255 19.9468 15.117L16.74 13.9509C16.2985 13.7904 16.0777 13.7101 15.8683 13.7237C15.6836 13.7357 15.5059 13.7988 15.3549 13.9058C15.1837 14.0271 15.0629 14.2285 14.8212 14.6314L14 16C11.3501 14.7999 9.2019 12.6489 8 10L9.36863 9.17882C9.77145 8.93713 9.97286 8.81628 10.0942 8.64506C10.2012 8.49408 10.2643 8.31637 10.2763 8.1317C10.2899 7.92227 10.2096 7.70153 10.0491 7.26005L8.88299 4.05321C8.745 3.67376 8.67601 3.48403 8.55442 3.3441C8.44701 3.22049 8.31089 3.12515 8.15802 3.06645C7.98496 3 7.78308 3 7.37932 3H4.56201C4.08188 3 3.84181 3 3.63598 3.09925C3.4655 3.18146 3.29814 3.33701 3.2037 3.50103C3.08968 3.69907 3.07375 3.91662 3.04189 4.35173C3.01413 4.73086 3 5.11378 3 5.5Z" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg> Позвонить нам
        </a>
        <button class="btn2 btn-chat hover-scale" @click="openChat">
          ? Задать вопрос
        </button>
      </div>

      <div class="hero-mini-stats">
        <div class="mini-stat">
          <span class="mini-stat-num">500+</span>
          <span class="mini-stat-label">скважин</span>
        </div>
        <div class="mini-stat-divider"></div>
        <div class="mini-stat">
          <span class="mini-stat-num">15+</span>
          <span class="mini-stat-label">лет опыта</span>
        </div>
        <div class="mini-stat-divider"></div>
        <div class="mini-stat">
          <span class="mini-stat-num">5 лет</span>
          <span class="mini-stat-label">гарантия</span>
        </div>
        <div class="mini-stat-divider"></div>
        <div class="mini-stat">
          <span class="mini-stat-num">0%</span>
          <span class="mini-stat-label">предоплата</span>
        </div>
      </div>
      <div class="quotes-block">
        <transition name="quote-fade" mode="out-in">
          <p class="quote-text" :key="currentIndex">
            {{ quotes[currentIndex] }}
          </p>
        </transition>
        <div class="quote-dots">
    <span
        v-for="(q, i) in quotes"
        :key="i"
        class="dot"
        :class="{ active: i === currentIndex }"
        @click="currentIndex = i"
    ></span>
        </div>
      </div>
    </div>
    <!-- Ротация цитат -->

  </section>

</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const quotes = [
  'Не смыли бы — если бы не мы.',
  'Без скважины человек — это 70% паники.',
  'Все ищут смысл жизни. Мы просто нашли воду.',
  'Эволюция вышла из воды. Вернуться придётся через нас.',
  'Никто не помнит первый глоток воды. Запомнят последнюю скважину — нашу.',
  'Жизнь начинается с воды. Вода начинается с нас.',
  'Интернет иногда отключают. Воду — никогда. Мы знаем, что важнее.',
  'Пароли меняются, сервисы блокируют, приложения пропадают. Скважина работает 5 лет гарантированно.',
    'Коммунальщики обещают. Мы гарантируем.',
    'Мудрость — это не ждать, когда дадут. А сделать самому.'
]

const currentIndex = ref(0)
let timer = null

onMounted(() => {
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % quotes.length
  }, 6000)
})

onUnmounted(() => {
  clearInterval(timer)
})
function openChat() {
  window.dispatchEvent(new CustomEvent('open-faq-chat'))
}
</script>

<style>
.quotes-block {
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  text-align: center;
}

.quote-text {
  font-size: 1.15rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  height: 3.9rem; /* фиксированная высота под 2 строки текста (1.15rem * 1.6 * 2) */
  margin-bottom: 16px;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.quote-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: background 0.3s;
}

.dot.active {
  background: white;
}

/* Анимация смены цитаты */
.quote-fade-enter-active,
.quote-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.quote-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.quote-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
.hero {

  margin-top: -106px;
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 100px 20px;
  background: linear-gradient(135deg, #1E3A8A 0%, #2764AE 100%);
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.45));
  z-index: 1;
}

/* Анимированные капли воды — падают сверху вниз */
.hero-drops {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

.drop {
  position: absolute;
  top: -30px;
  width: 10px;
  height: 14px;
  /* Форма капли остриём вниз (без rotate) */
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  animation: fall linear infinite;
}

/* Разные размеры, скорости и задержки для каждой капли */
.drop:nth-child(1) { left: 6%;  width: 12px; height: 16px; animation-duration: 9s;  animation-delay: 0s; }
.drop:nth-child(2) { left: 18%; width: 8px;  height: 11px; animation-duration: 7s;  animation-delay: 1.5s; }
.drop:nth-child(3) { left: 32%; width: 16px; height: 22px; animation-duration: 11s; animation-delay: 0.5s; }
.drop:nth-child(4) { left: 47%; width: 10px; height: 14px; animation-duration: 8s;  animation-delay: 3s; }
.drop:nth-child(5) { left: 61%; width: 14px; height: 19px; animation-duration: 10s; animation-delay: 2s; }
.drop:nth-child(6) { left: 74%; width: 11px; height: 15px; animation-duration: 9s;  animation-delay: 4s; }
.drop:nth-child(7) { left: 86%; width: 9px;  height: 12px; animation-duration: 7.5s; animation-delay: 1s; }
.drop:nth-child(8) { left: 95%; width: 13px; height: 18px; animation-duration: 12s; animation-delay: 3.5s; }

@keyframes fall {
  0%   { transform: translateY(0); opacity: 0; }
  10%  { opacity: 0.7; }
  90%  { opacity: 0.4; }
  100% { transform: translateY(110vh); opacity: 0; }
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1200px;
}

/* Бейдж сверху */
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.85rem;
  font-weight: 600;
  padding: 6px 16px;
  border-radius: 20px;
  margin-bottom: 24px;
}



.hero h1 {
  font-size: 2.6rem;
  margin-bottom: 20px;
  line-height: 1.3;
  font-weight: 800;
}

.hero h1 em {
  font-style: normal;
  color: #93C5FD;
}

.hero p {
  font-size: 1.15rem;
  margin-bottom: 15px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
}

.cta-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 30px;
}

.btn2 {
  padding: 15px 30px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 200px;
  cursor: pointer;
  border: none;
  font-family: inherit;
  transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}

.btn-primary2 {
  background-color: #2764AE;
  color: white;
  border: 2px solid #2764AE;
}

.btn-primary2:hover {
  background-color: #1E3A8A;
}

.btn-secondary2 {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary2:hover {
  background-color: white;
  color: #2764AE;
}

.btn-chat {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.35);
}

.btn-chat:hover {
  border-color: white;
  background: rgba(255, 255, 255, 0.1);
}

/* Мини-статистика снизу баннера */
.hero-mini-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-top: 44px;
  flex-wrap: wrap;
}

.mini-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mini-stat-num {
  font-size: 1.6rem;
  font-weight: 800;
  color: white;
}

.mini-stat-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 2px;
}

.mini-stat-divider {
  width: 1px;
  height: 32px;
  background: rgba(255, 255, 255, 0.15);
}

/* hover-scale (если не подключён глобально) */
.hover-scale {
  transition: transform 0.15s ease;
}

.hover-scale:hover {
  transform: scale(1.04);
}

.hover-scale:active {
  transform: scale(0.98);
}

@media (max-width: 768px) {
  .hero h1 { font-size: 1.8rem; }
  .hero p { font-size: 1rem; }
  .cta-buttons { flex-direction: column; align-items: center; }
  .btn2 { width: 100%; }
  .hero-mini-stats { gap: 16px; }
  .mini-stat-divider { display: none; }
}
</style>