<template>
  <section class="welcome-screen">
    <!-- Декоративные капли на фоне -->
    <div class="bg-drops">
      <div class="bg-drop" v-for="n in 6" :key="n" :style="{ left: (n * 15) + '%', animationDelay: (n * 0.4) + 's' }"></div>
    </div>

    <!-- Заголовок -->
    <div class="welcome-header" :class="{ visible: phase >= 1 }">
      <span class="welcome-label">Добро пожаловать</span>
      <h1 class="welcome-title">{{ currentGreeting }}</h1>
    </div>

    <!-- Цитата -->
    <div class="quote-block" :class="{ visible: phase >= 2 }">
      <p class="quote-text">
        <span
            v-for="(word, i) in quoteWords"
            :key="i"
            class="quote-word"
            :style="{ animationDelay: (i * 0.08) + 's' }"
        >{{ word }}</span>
      </p>
    </div>

    <!-- Бренд -->
    <div class="brand-tag" :class="{ visible: phase >= 3 }">
      <div class="brand-line"></div>
      <span class="brand-sub">бурение скважин на воду</span>
      <div class="brand-line"></div>
    </div>

    <!-- Прогресс и пропуск -->
    <div class="bottom-block" :class="{ visible: phase >= 3 }">
      <div class="progress-bar">
        <div class="progress-fill"></div>
      </div>
      <div class="skip-hint" @click="goNow">Перейти на сайт →</div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Массив приветствий
const greetings = [
  'Ого, вы не выбросили визитку! Уже это заслуживает скважины.',
  'Визитка выжила в вашем кармане? Мы тоже выживем без воды — но зачем?',
  'Спасибо, что не сделали из визитки самолётик. Мы ценим.',
  'Вы ввели ссылку вручную? Или визитка сама прыгнула в телефон?',
  'Квест "найди сайт" пройден.'
]

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

// Случайное приветствие при каждом заходе
const currentGreeting = computed(() => {
  return greetings[Math.floor(Math.random() * greetings.length)]
})

const cardIndex = computed(() => {
  const n = parseInt(route.params.id, 10)
  if (Number.isInteger(n) && n >= 1 && n <= quotes.length) {
    return n - 1
  }
  return Math.floor(Math.random() * quotes.length)
})

const currentQuote = computed(() => quotes[cardIndex.value])
const quoteWords = computed(() => currentQuote.value.split(' '))

const phase = ref(0)

function goNow() {
  router.push('/')
}

onMounted(() => {
  setTimeout(() => { phase.value = 1 }, 100)
  setTimeout(() => { phase.value = 2 }, 900)

  const quoteDuration = quoteWords.value.length * 80 + 400
  setTimeout(() => { phase.value = 3 }, 900 + quoteDuration)
  setTimeout(() => {
      router.push('/')
    }, 900 + quoteDuration + 4000)
})
</script>

<style scoped>
.welcome-screen {
  min-height: 100vh;
  background: radial-gradient(ellipse at top, #1E3A8A 0%, #0F172A 70%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  position: relative;
  overflow: visible;
}

/* Декоративные капли на фоне */
.bg-drops {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.bg-drop {
  position: absolute;
  top: -20px;
  width: 8px;
  height: 12px;
  background: rgba(96, 165, 250, 0.15);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  animation: bg-fall linear infinite;
  animation-duration: 8s;
}

@keyframes bg-fall {
  0% { transform: translateY(-20px); opacity: 0; }
  10% { opacity: 0.6; }
  90% { opacity: 0.3; }
  100% { transform: translateY(110vh); opacity: 0; }
}

/* Заголовок */
.welcome-header {
  text-align: center;
  margin-bottom: 40px;
  opacity: 0;
  transform: translateY(-20px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
  width: 100%;
  max-width: 600px;
}

.welcome-header.visible {
  opacity: 1;
  transform: translateY(0);
}

.welcome-label {
  display: inline-block;
  font-size: 0.85rem;
  color: #60A5FA;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 600;
  margin-bottom: 12px;
  padding: 6px 18px;
  background: rgba(96, 165, 250, 0.1);
  border: 1px solid rgba(96, 165, 250, 0.2);
  border-radius: 50px;
  backdrop-filter: blur(10px);
}

.welcome-title {
  font-size: 2rem;
  font-weight: 800;
  color: white;
  line-height: 1.3;
  margin: 0;
  background: linear-gradient(135deg, #FFFFFF 0%, #60A5FA 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  word-wrap: break-word;
}

/* Цитата — ИСПРАВЛЕНО */
.quote-block {
  width: 100%;
  max-width: 600px;
  text-align: center;
  margin-bottom: 40px;
  padding: 20px 16px;
  z-index: 1;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
}

.quote-block.visible {
  opacity: 1;
  transform: translateY(0);
}

.quote-text {
  font-size: 1.4rem;
  font-style: italic;
  color: white;
  line-height: 1.6;
  font-weight: 400;
  margin: 0;
  overflow: visible;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.15em 0.25em;
}

.quote-word {
  display: inline-block;
  opacity: 0;
  filter: blur(4px);
  transform: translateY(8px);
  animation: word-appear 0.5s forwards;
  will-change: transform, opacity, filter;
  white-space: nowrap;
}

.quote-word:last-child {
  margin-right: 0;
}

@keyframes word-appear {
  to {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }
}

/* Бренд */
.brand-tag {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.6s ease;
  z-index: 1;
}

.brand-tag.visible {
  opacity: 1;
  transform: translateY(0);
}

.brand-line {
  width: 40px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #60A5FA, transparent);
}

.brand-sub {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  white-space: nowrap;
}

/* Нижний блок */
.bottom-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  opacity: 0;
  transition: opacity 0.6s ease;
  z-index: 1;
}

.bottom-block.visible {
  opacity: 1;
}

.progress-bar {
  width: 200px;
  height: 3px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #2764AE, #60A5FA);
  border-radius: 2px;
  animation: fill-progress 3.5s linear forwards;
}

@keyframes fill-progress {
  from { width: 0%; }
  to { width: 100%; }
}

.skip-hint {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  text-decoration: underline;
  transition: all 0.3s ease;
}

.skip-hint:hover {
  color: #60A5FA;
  text-decoration-color: #60A5FA;
}

/* Адаптив */
@media (max-width: 640px) {
  .welcome-screen {
    padding: 20px 16px;
  }

  .welcome-title {
    font-size: 1.6rem;
  }

  .quote-text {
    font-size: 1.1rem;
  }

  .quote-block {
    padding: 16px 12px;
    max-width: 100%;
  }

  .brand-tag {
    flex-direction: column;
    gap: 8px;
  }

  .brand-line {
    width: 30px;
  }

  .brand-sub {
    white-space: normal;
  }
}

@media (max-width: 400px) {
  .welcome-title {
    font-size: 1.3rem;
  }

  .quote-text {
    font-size: 0.95rem;
  }

  .quote-block {
    padding: 12px 8px;
  }
}
</style>