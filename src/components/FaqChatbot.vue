<template>
  <!-- Кнопка-подсказка в углу -->
  <button class="chat-fab" @click="isOpen = !isOpen">
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="28" fill="#2764AE" opacity="0.1"/>
      <path d="M18 20 C18 18 20 16 22 16 L38 16 C40 16 42 18 42 20 L42 34 C42 36 40 38 38 38 L30 38 L24 44 L24 38 L22 38 C20 38 18 36 18 34 L18 20 Z" stroke="#2764AE" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="25" cy="27" r="1.5" fill="#2764AE"/>
      <circle cx="30" cy="27" r="1.5" fill="#2764AE"/>
      <circle cx="35" cy="27" r="1.5" fill="#2764AE"/>
    </svg>
  </button>

  <!-- Модальное окно чата -->
  <div v-if="isOpen" class="chat-window">
    <div class="chat-header">
      <span>Помощник Бур-52</span>
      <button class="chat-close" @click="isOpen = false">×</button>
    </div>

    <div class="chat-body" ref="chatBody">
      <div v-for="(msg, i) in messages" :key="i" :class="['chat-msg', msg.from]">
        {{ msg.text }}
      </div>

      <!-- Быстрые кнопки с вопросами -->
      <div v-if="showQuickButtons" class="quick-buttons">
        <button v-for="(q, i) in quickQuestions" :key="i" class="quick-btn" @click="askQuick(q)">
          {{ q.label }}
        </button>
      </div>

      <!-- Кнопка "оставить заявку" -->
      <div v-if="showLeadButton && !showLeadForm" class="chat-msg bot">
        <button class="chat-lead-btn" @click="openLeadForm">Оставить заявку</button>
      </div>

      <!-- Форма заявки внутри чата -->
      <!-- Форма заявки внутри чата -->
      <div v-if="showLeadForm" class="lead-form">
        <input v-model="leadName" type="text" placeholder="Ваше имя" class="lead-input">
        <input
            :value="leadPhone"
            @input="leadPhone = $event.target.value"
            type="tel"
            placeholder="+7 (___) ___-__-__"
            class="lead-input"
            maxlength="18"
        >
        <textarea v-model="leadMessage" placeholder="Краткое описание вопроса (необязательно)" class="lead-textarea"></textarea>

        <label class="lead-calc-checkbox" :class="{ disabled: !hasCalculation }">
          <input
              type="checkbox"
              v-model="attachCalc"
              :disabled="!hasCalculation"
              @change="onCalcCheckboxChange"
          >
          <span>Приложить расчёт из калькулятора</span>

          <!-- Tooltip-подсказка при наведении на неактивный чекбокс -->
          <span v-if="!hasCalculation" class="lead-tooltip">
    Сначала рассчитайте стоимость на странице калькулятора
    <span class="lead-tooltip-arrow"></span>
  </span>
        </label>
        <p v-if="attachCalc && !hasCalculation" class="lead-calc-warning">
          Расчёт не найден. Сначала воспользуйтесь калькулятором.
        </p>

        <p v-if="leadError" class="lead-error">{{ leadError }}</p>
        <button class="chat-lead-btn" @click="submitLead">Отправить</button>
      </div>

      <div v-if="leadSubmitted" class="chat-msg bot">
        Спасибо! Заявка принята, мы свяжемся с вами в ближайшее время.
      </div>
    </div>

    <form class="chat-input" @submit.prevent="sendMessage">
      <input v-model="userInput" type="text" placeholder="Задайте вопрос...">
      <button type="submit">➤</button>
    </form>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import { addLead } from '@/utils/leads'
import { useCalculatorAttach } from '@/composables/useCalculatorAttach'

const isOpen = ref(false)
const userInput = ref('')
const showLeadButton = ref(false)
const showQuickButtons = ref(true)
const chatBody = ref(null)

const showLeadForm = ref(false)
const leadSubmitted = ref(false)
const leadName = ref('')
import { usePhoneMask } from '@/composables/usePhoneMask'

const { phone: leadPhone, isPhoneValid: isLeadPhoneValid } = usePhoneMask()
const leadMessage = ref('')
const leadError = ref('')

const { attachCalc, hasCalculation, getCurrentCalculation, onCalcCheckboxChange } = useCalculatorAttach()

const messages = ref([
  { from: 'bot', text: 'Здравствуйте! Я помогу ответить на частые вопросы о бурении скважин. Выберите вопрос ниже или напишите свой.' }
])

const quickQuestions = [
  { label: 'Сколько стоит?', text: 'сколько стоит бурение' },
  { label: 'Сроки бурения', text: 'сколько времени занимает' },
  { label: 'Гарантия', text: 'какая гарантия' },
  { label: 'Районы работы', text: 'в каких районах вы работаете' },
  { label: 'Глубина скважин', text: 'какая глубина бурения' },
  { label: 'Предоплата', text: 'нужна ли предоплата' }
]
function handleOpenChat() {
  isOpen.value = true
}

onMounted(() => {
  window.addEventListener('open-faq-chat', handleOpenChat)
})

onUnmounted(() => {
  window.removeEventListener('open-faq-chat', handleOpenChat)
})
const faq = [
  {
    keywords: ['цена', 'стоимость', 'сколько стоит', 'почем', 'тариф'],
    answer: 'Бурение стоит от 2 500 ₽ за метр. Точную стоимость можно узнать в разделе "Калькулятор".'
  },
  {
    keywords: ['срок', 'сколько времени', 'долго', 'быстро', 'занимает'],
    answer: 'Бурение скважины обычно занимает 1-2 дня в зависимости от глубины и грунта.'
  },
  {
    keywords: ['гарантия', 'гарантийный'],
    answer: 'Мы даём официальную гарантию 5 лет на все виды работ и оборудование.'
  },
  {
    keywords: ['район', 'где работаете', 'область', 'выезд', 'город', 'работаете'],
    answer: 'Работаем по всей Нижегородской области, с фокусом на Городецкий, Ковернинский, Чкаловский, Воскресенский, Борский и Семёновский районы.'
  },
  {
    keywords: ['глубина', 'метр', 'метров'],
    answer: 'Бурим скважины глубиной до 150 метров в зависимости от условий участка.'
  },
  {
    keywords: ['насос', 'оборудование', 'монтаж'],
    answer: 'Мы устанавливаем и настраиваем насосное оборудование с гарантией 2 года.'
  },
  {
    keywords: ['оплата', 'предоплата', 'аванс'],
    answer: 'Работаем без предоплаты — оплата только после сдачи готовой работы.'
  },
  {
    keywords: ['контакт', 'телефон', 'связаться', 'позвонить'],
    answer: 'Телефон: 8 (920) 052-19-82. Также можно оставить заявку, и мы свяжемся с вами сами.'
  }
]

function askQuick(q) {
  messages.value.push({ from: 'user', text: q.label })
  showQuickButtons.value = false
  respondTo(q.text)
}

function sendMessage() {
  const text = userInput.value.trim()
  if (!text) return

  messages.value.push({ from: 'user', text })
  userInput.value = ''
  showQuickButtons.value = false

  respondTo(text)
}

function respondTo(text) {
  showLeadButton.value = false
  const lower = text.toLowerCase()
  const found = faq.find(item => item.keywords.some(k => lower.includes(k)))

  setTimeout(() => {
    if (found) {
      messages.value.push({ from: 'bot', text: found.answer })
    } else {
      messages.value.push({
        from: 'bot',
        text: 'Не нашёл точного ответа на этот вопрос. Оставьте заявку — наш специалист свяжется с вами и всё расскажет.'
      })
      showLeadButton.value = true
    }
    scrollDown()
  }, 400)

  scrollDown()
}

function openLeadForm() {
  showLeadForm.value = true
  showLeadButton.value = false
  scrollDown()
}

async function submitLead() {
  if (!leadName.value.trim() || !leadPhone.value.trim()) {
    leadError.value = 'Заполните имя и телефон'
    return
  }

  if (!isLeadPhoneValid.value) {
    leadError.value = 'Введите корректный номер телефона'
    return
  }
  if (!leadName.value.trim() || !leadPhone.value.trim()) {
    leadError.value = 'Заполните имя и телефон'
    return
  }

  const currentCalc = getCurrentCalculation()

  if (attachCalc.value && !currentCalc) {
    leadError.value = 'Нельзя приложить пустой расчёт — сначала воспользуйтесь калькулятором'
    return
  }

  leadError.value = ''

  const leadData = {
    name: leadName.value,
    phone: leadPhone.value,
    message: leadMessage.value,
    source: 'Чат-бот'
  }

  if (attachCalc.value && currentCalc) {
    leadData.calculation = currentCalc
  }

  await addLead(leadData)

  showLeadForm.value = false
  leadSubmitted.value = true
  leadName.value = ''
  leadPhone.value = ''
  leadMessage.value = ''
  attachCalc.value = false
  scrollDown()
}

function scrollDown() {
  nextTick(() => {
    if (chatBody.value) {
      chatBody.value.scrollTop = chatBody.value.scrollHeight
    }
  })
}
</script>

<style scoped>
.lead-calc-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #475569;
  cursor: pointer;
  position: relative;
}

.lead-calc-checkbox input {
  width: 14px;
  height: 14px;
  cursor: pointer;
  flex-shrink: 0;
}

.lead-calc-checkbox.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.lead-calc-checkbox.disabled input {
  cursor: not-allowed;
}

.lead-tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 0;
  background: #1E293B;
  color: white;
  padding: 7px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 400;
  white-space: normal;
  max-width: 220px;
  text-align: left;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;
  pointer-events: none;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.lead-tooltip-arrow {
  position: absolute;
  top: 100%;
  left: 16px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #1E293B;
}

.lead-calc-checkbox.disabled:hover .lead-tooltip {
  opacity: 1;
  visibility: visible;
}
.lead-calc-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #475569;
  cursor: pointer;
}

.lead-calc-checkbox input {
  width: 14px;
  height: 14px;
  cursor: pointer;
}

.lead-calc-checkbox.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.lead-calc-checkbox.disabled input {
  cursor: not-allowed;
}

.lead-calc-warning {
  font-size: 11px;
  color: #DC2626;
  margin: 0;
}
.chat-fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;

 background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;

  z-index: 999;
}

.chat-window {
  position: fixed;
  bottom: 92px;
  right: 24px;
  width: 380px;
  max-height: 600px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.18);
  display: flex;
  flex-direction: column;
  z-index: 999;
  overflow: hidden;
}

.chat-header {
  background: var(--lazur, #2764AE);
  color: white;
  padding: 16px 18px;
  font-weight: 700;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-close {
  background: none;
  border: none;
  color: white;
  font-size: 22px;
  cursor: pointer;
  line-height: 1;
}

.chat-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 320px;
  max-height: 460px;
}

.chat-msg {
  max-width: 88%;
  padding: 11px 14px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.5;
}

.chat-msg.bot {
  background: #F1F5F9;
  color: #1E293B;
  align-self: flex-start;
}

.chat-msg.user {
  background: var(--lazur, #2764AE);
  color: white;
  align-self: flex-end;
}

.quick-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 4px;
}

.quick-btn {
  text-align: left;
  background: white;
  border: 1px solid #E2E8F0;
  color: #1E293B;
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}

.quick-btn:hover {
  border-color: var(--lazur, #2764AE);
  background: rgba(39,100,174,0.05);
}

.chat-lead-btn {
  background: var(--lazur, #2764AE);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.lead-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 14px;
}

.lead-input, .lead-textarea {
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 9px 12px;
  font-size: 13px;
  font-family: inherit;
  outline: none;
}

.lead-input:focus, .lead-textarea:focus {
  border-color: var(--lazur, #2764AE);
}

.lead-textarea {
  resize: vertical;
  min-height: 60px;
}

.lead-error {
  color: #DC2626;
  font-size: 12px;
  margin: 0;
}

.chat-input {
  display: flex;
  border-top: 1px solid #E2E8F0;
}

.chat-input input {
  flex: 1;
  border: none;
  padding: 13px 14px;
  font-size: 14px;
  font-family: inherit;
  outline: none;
}

.chat-input button {
  background: var(--lazur, #2764AE);
  color: white;
  border: none;
  width: 50px;
  font-size: 17px;
  cursor: pointer;
}
</style>