<template>
  <section class="contact-form-section">
    <div class="container">
      <div class="form-container">
        <div class="form-intro">
          <h2 class="form-title">{{ title }}</h2>
          <p class="form-subtitle">{{ subtitle }}</p>
          <div class="form-benefits">
            <div class="benefit-item">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="28" fill="#2764AE" opacity="0.1"/>
                <path d="M32 15 L22 32 L29 32 L27 45 L38 28 L31 28 L32 15 Z" fill="#2764AE" stroke="#2764AE" stroke-width="1.5" stroke-linejoin="round"/>
              </svg>
              <span>Быстрый ответ и выезд в день обращения</span>
            </div>

            <div class="benefit-item">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="28" fill="#2764AE" opacity="0.1"/>
                <rect x="18" y="16" width="24" height="30" rx="3" stroke="#2764AE" stroke-width="2"/>
                <path d="M24 26 L36 26" stroke="#2764AE" stroke-width="2" stroke-linecap="round"/>
                <path d="M24 32 L36 32" stroke="#2764AE" stroke-width="2" stroke-linecap="round"/>
                <path d="M24 38 L30 38" stroke="#2764AE" stroke-width="2" stroke-linecap="round"/>
                <circle cx="38" cy="38" r="8" fill="#2764AE"/>
                <path d="M35 38 L37 40 L41 36" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Составим прозрачную смету без скрытых платежей</span>
            </div>

            <div class="benefit-item">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="28" fill="#2764AE" opacity="0.1"/>
                <path d="M30 15 L42 20 L42 32 C42 40 36 45 30 48 C24 45 18 40 18 32 L18 20 L30 15 Z" stroke="#2764AE" stroke-width="2" stroke-linejoin="round"/>
                <path d="M25 30 L28 33 L35 26" stroke="#2764AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Официальный договор и гарантия 5 лет</span>
            </div>
          </div>
        </div>
        <div class="contact-form">
          <div class="form-wrapper">
            <form v-if="!submitted" @submit.prevent="handleSubmit" class="real-form">
              <Input v-model="name" label="Ваше имя" placeholder="Иван Иванов" />
              <Input
                  :model-value="phone"
                  @update:model-value="phone = $event"
                  type="tel"
                  label="Телефон"
                  placeholder="+7 (___) ___-__-__"
                  maxlength="18"
              />
              <div class="textarea-wrapper">
                <label class="input-label">Сообщение</label>
                <textarea v-model="message" class="textarea-field" placeholder="Например: интересует бурение на участке в Городецком районе"></textarea>
              </div>

              <!-- Блок с чекбоксом и кнопкой перехода -->
              <div class="calc-attach-row">
                <label class="calc-checkbox" :class="{ disabled: !hasCalculation }">
                  <input
                      type="checkbox"
                      v-model="attachCalc"
                      :disabled="!hasCalculation"
                      @change="onCalcCheckboxChange"
                  >
                  <span>Приложить расчёт из калькулятора</span>

                  <!-- Tooltip-подсказка при наведении на неактивный чекбокс -->
                  <span v-if="!hasCalculation" class="tooltip">
                    Сначала рассчитайте стоимость на странице калькулятора
                    <span class="tooltip-arrow"></span>
                  </span>
                </label>

                <!-- Кнопка "Перейти" — появляется только когда расчёта нет -->
                <router-link
                    v-if="!hasCalculation"
                    to="/calculator"
                    class="calc-link"
                >
                  Перейти
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </router-link>
              </div>

              <p v-if="error" class="form-error">{{ error }}</p>
              <Button type="submit" variant="white" block>Отправить заявку</Button>
            </form>
            <div v-else class="success-block">
              <div class="success-icon">✓</div>
              <h3>Заявка отправлена</h3>
              <p>Мы свяжемся с вами в течение 30 минут</p>
            </div>
          </div>
          <p class="form-note">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'
import { addLead } from '@/utils/leads'
import { useCalculatorAttach } from '@/composables/useCalculatorAttach'
import { ref } from 'vue'

const props = defineProps({
  title: { type: String, default: 'Обсудим ваш проект уже сегодня' },
  subtitle: { type: String, default: 'Оставьте заявку, и наш инженер свяжется с вами в течение 30 минут для бесплатной консультации.' },
  source: { type: String, default: 'Форма обратной связи' }
})

const name = ref('')
import { usePhoneMask } from '@/composables/usePhoneMask'

const { phone, isPhoneValid } = usePhoneMask()
const message = ref('')
const error = ref('')
const submitted = ref(false)

const { attachCalc, hasCalculation, getCurrentCalculation, onCalcCheckboxChange } = useCalculatorAttach()

async function handleSubmit() {
  if (!name.value.trim() || !phone.value.trim()) {
    error.value = 'Заполните имя и телефон'
    return
  }

  if (!isPhoneValid.value) {
    error.value = 'Введите корректный номер телефона'
    return
  }
  if (!name.value.trim() || !phone.value.trim()) {
    error.value = 'Заполните имя и телефон'
    return
  }

  const currentCalc = getCurrentCalculation()

  if (attachCalc.value && !currentCalc) {
    error.value = 'Нельзя приложить пустой расчёт — сначала воспользуйтесь калькулятором'
    return
  }

  error.value = ''

  const leadData = {
    name: name.value,
    phone: phone.value,
    message: message.value,
    source: props.source
  }

  if (attachCalc.value && currentCalc) {
    leadData.calculation = currentCalc
  }

  await addLead(leadData)

  submitted.value = true
  name.value = ''
  phone.value = ''
  message.value = ''
  attachCalc.value = false
}
</script>

<style>
.contact-form-section {
  padding: 10px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.form-container {
  display: flex;
  gap: 50px;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 60, 120, 0.08);
  border: 1px solid #e2e8f0;
}

.form-intro {
  flex: 1;
  padding: 50px;
  margin: auto;
  flex-direction: column;
  min-width: 300px;
}

.form-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #1E293B;
  margin-bottom: 15px;
}

.form-subtitle {
  font-size: 1.1rem;
  color: #475569;
  margin-bottom: 30px;
  line-height: 1.6;
}

.form-benefits {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 40px;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
}

.contact-form {
  flex: 1;
  padding: 25px;
  display: flex;
  flex-direction: column;
  min-width: 300px;
  background: linear-gradient(135deg, #1E3A8A 0%, #2764AE 100%);
}

.form-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  overflow: hidden;
  border-radius: 10px;
  padding: 30px;
}

.real-form {
  width: 100%;
}

.real-form .input-label {
  color: white;
}

.real-form .input-field {
  background: rgba(255, 255, 255, 0.95);
}

.textarea-wrapper {
  margin-bottom: 20px;
}

.textarea-field {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  min-height: 100px;
  resize: vertical;
  background: rgba(255, 255, 255, 0.95);
}

.textarea-field:focus {
  outline: none;
  border-color: #2764AE;
  box-shadow: 0 0 0 3px rgba(39, 100, 174, 0.1);
}

/* ===== Блок с чекбоксом и кнопкой перехода ===== */
.calc-attach-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.calc-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;
  position: relative;
}

.calc-checkbox input {
  width: 16px;
  height: 16px;
  cursor: pointer;
  flex-shrink: 0;
}

.calc-checkbox.disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.calc-checkbox.disabled input {
  cursor: not-allowed;
}

/* ===== Tooltip ===== */
.tooltip {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 70%;
  transform: translateX(-50%);
  background: #1E293B;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 400;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;
  pointer-events: none;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.tooltip-arrow {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #1E293B;
}

/* Показываем tooltip только при наведении на неактивный чекбокс */
.calc-checkbox.disabled:hover .tooltip {
  opacity: 1;
  visibility: visible;
}

/* ===== Кнопка "Перейти" ===== */
.calc-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.2s ease;
  white-space: nowrap;
}

.calc-link:hover {
  background: white;
  color: #2764AE;
  border-color: white;
}

.calc-link:hover svg {
  transform: translateX(2px);
}

.calc-link svg {
  transition: transform 0.2s ease;
}

/* ===== Ошибки и успех ===== */
.form-error {
  color: #FCA5A5;
  background: rgba(255,255,255,0.1);
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 0.9rem;
  margin-bottom: 15px;
  text-align: center;
}

.success-block {
  text-align: center;
  color: white;
  padding: 40px 20px;
}

.success-icon {
  width: 60px;
  height: 60px;
  background: rgba(255,255,255,0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin: 0 auto 16px;
}

.success-block h3 {
  font-size: 1.4rem;
  margin-bottom: 8px;
}

.success-block p {
  color: rgba(255,255,255,0.7);
  font-size: 0.95rem;
}

.form-note {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin-top: 20px;
  line-height: 1.5;
  padding: 0 10px;
}

/* ===== Адаптивность ===== */
@media (max-width: 1024px) {
  .form-container { gap: 30px; }
  .form-intro, .contact-form { padding: 40px 30px; }
  .form-title { font-size: 1.8rem; }
  .form-subtitle { font-size: 1rem; }
  .form-wrapper { min-height: 450px; }
}

@media (max-width: 768px) {
  .form-container { flex-direction: column; gap: 0; }
  .form-intro { border-radius: 20px 20px 0 0; padding: 40px 30px; }
  .contact-form { border-radius: 0 0 20px 20px; padding: 30px; }
  .form-title { font-size: 1.6rem; text-align: center; }
  .form-subtitle { text-align: center; }
  .form-benefits { gap: 12px; margin-bottom: 30px; }
  .form-wrapper { min-height: 400px; }

  /* На мобильных tooltip показываем по центру экрана */
  .tooltip {
    left: 0;
    transform: translateX(0);
    white-space: normal;
    max-width: 220px;
    text-align: center;
  }

  .tooltip-arrow {
    left: 20px;
  }

  .calc-attach-row {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>