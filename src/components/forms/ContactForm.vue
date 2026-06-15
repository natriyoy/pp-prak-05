<template>
  <section class="contact-form-section">
    <div class="container">
      <div class="form-container">
        <div class="form-intro">
          <h2 class="form-title">{{ title }}</h2>
          <p v-if="subtitle" class="form-subtitle">{{ subtitle }}</p>
          <div class="form-benefits">
            <div class="benefit-item"><span>⚡</span> <span class="benefit-content2">Быстрый ответ и выезд в день обращения</span></div>
            <div class="benefit-item"><span>📝</span> <span class="benefit-content2">Составим прозрачную смету без скрытых платежей</span></div>
            <div class="benefit-item"><span>🛡️</span> <span class="benefit-content2">Официальный договор и гарантия 5 лет</span></div>
          </div>
          <div class="form-stats">
            <div class="stat-item">
              <div class="stat-number">500+</div>
              <div class="stat-text">Скважин пробурено</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">15</div>
              <div class="stat-text">Лет на рынке</div>
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
  source: { type: String, default: 'Главная страница' }
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

.benefit-content2 {
  color: #475569;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
}

.form-stats {
  display: flex;
  gap: 30px;
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid rgba(39, 100, 174, 0.1);
}

.stat-item {
  text-align: center;
  flex: 1;
}

.stat-number {
  font-size: 2.2rem;
  font-weight: 700;
  color: #2764AE;
  line-height: 1;
  margin-bottom: 5px;
}

.stat-text {
  font-size: 0.9rem;
  color: #475569;
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

@media (max-width: 1024px) {
  .form-container { gap: 30px; }
  .form-intro, .contact-form { padding: 40px 30px; }
  .form-title { font-size: 1.8rem; }
  .form-subtitle { font-size: 1rem; }
  .stat-number { font-size: 1.8rem; }
  .form-wrapper { min-height: 450px; }
}

@media (max-width: 768px) {
  .form-container { flex-direction: column; gap: 0; }
  .form-intro { border-radius: 20px 20px 0 0; padding: 40px 30px; }
  .contact-form { border-radius: 0 0 20px 20px; padding: 30px; }
  .form-title { font-size: 1.6rem; text-align: center; }
  .form-subtitle { text-align: center; }
  .form-benefits { gap: 12px; margin-bottom: 30px; }
  .form-stats { justify-content: space-around; gap: 20px; }
  .form-wrapper { min-height: 400px; }
}
</style>