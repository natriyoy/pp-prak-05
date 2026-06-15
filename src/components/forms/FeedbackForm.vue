<template>
  <section class="contact-form-section">
    <div class="section-header">
      <span class="section-subtitle">Остались вопросы?</span>
      <h2 class="section-title">Напишите нам</h2>
    </div>

    <div class="container">
      <div class="form-container">
        <div class="form-intro">
          <h2 class="form-title">Обсудим ваш проект уже сегодня</h2>
          <p class="form-subtitle">Оставьте заявку, и наш инженер свяжется с вами в течение 30 минут.</p>
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
              <Input v-model="phone" type="tel" label="Телефон" placeholder="+7 (___) ___-__-__" />
              <div class="textarea-wrapper">
                <label class="input-label">Сообщение</label>
                <textarea v-model="message" class="textarea-field" placeholder="Например: интересует бурение на участке в Городецком районе"></textarea>
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
import { ref } from 'vue'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'
import { addLead } from '@/utils/leads'

const props = defineProps({
  title: { type: String, default: 'Обсудим ваш проект уже сегодня' },
  subtitle: { type: String, default: 'Оставьте заявку, и наш инженер свяжется с вами в течение 30 минут для бесплатной консультации.' },
  source: { type: String, default: 'Форма обратной связи на странице' }
})

const name = ref('')
const phone = ref('')
const message = ref('')
const error = ref('')
const submitted = ref(false)

function handleSubmit() {
  if (!name.value.trim() || !phone.value.trim()) {
    error.value = 'Заполните имя и телефон'
    return
  }
  error.value = ''

  addLead({
    name: name.value,
    phone: phone.value,
    message: message.value,
    source: props.source
  })

  submitted.value = true
  name.value = ''
  phone.value = ''
  message.value = ''
}

</script>

<style>
.contact-form-section {
  padding: 60px 0;
  margin-bottom: 30px;
}

.form-container {
  display: flex;
  gap: 50px;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 60, 120, 0.08);
}

.form-intro {
  flex: 1;
  padding: 50px;
}

.form-title {
  font-size: 2.2rem;
  color: #1E293B;
  margin-bottom: 15px;
}

.form-subtitle {
  font-size: 1.1rem;
  color: #475569;
  margin-bottom: 30px;
}

.form-benefits {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
}

.contact-form {
  flex: 1;
  padding: 50px;
  background: linear-gradient(135deg, #1E3A8A 0%, #2764AE 100%);
}

.form-wrapper {
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .form-container { flex-direction: column; }
  .form-intro, .contact-form { padding: 30px; }
}
</style>