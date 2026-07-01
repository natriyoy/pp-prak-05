<template>
  <section class="mini-calculator-section">
    <div class="container">
      <div class="section-header">
        <span class="section-subtitle">Онлайн расчет</span>
        <h2 class="section-title">Узнайте стоимость за 1 минуту</h2>
      </div>
      <div class="mini-calculator">
        <div class="form-group">
          <div class="form-label">
            <span class="label-text">Глубина скважины</span>
            <span class="label-value">{{ depth }} м</span>
          </div>
          <input type="range" min="10" max="150" step="5" v-model="depth" class="slider" />
          <div class="slider-ticks">
            <span>10м</span><span>50м</span><span>100м</span><span>150м</span>
          </div>
        </div>
        <div class="mini-result">
          <div class="mini-estimate">
            <span class="mini-estimate-label">Предварительная стоимость</span>
            <span class="mini-estimate-price">{{ totalCost.toLocaleString() }} ₽</span>
          </div>
          <div class="mini-estimate3">
            <router-link to="/calculator" class="btn btn-primary">Полный расчет</router-link>
            <router-link to="/contacts" class="btn btn-primary">Заказать выезд специалиста</router-link>
          </div>
          <div class="mini-notice">
            <p><strong>Точную стоимость</strong> рассчитает наш специалист после бесплатного выезда на ваш участок</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
const depth = ref(50)
const totalCost = computed(() => depth.value * 2500)
</script>

<style>
.mini-notice {
  padding: 12px 16px;
  background: none;
  border-radius: 8px;
  border-left: 3px solid var(--lazur);
  text-align: center;

}

.mini-notice p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--tex);
  line-height: 1.4;
}

.mini-notice strong {
  color: var(--lazur);
}
.mini-calculator-section {
  padding: 60px 0;
}

.mini-calculator {
  padding: 30px;
  max-width: 600px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
}

.form-group {
  margin-bottom: 30px;
}

.form-label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.label-text {
  font-size: 1.1rem;
  color: #1E293B;
  font-weight: 600;
}

.label-value {
  font-size: 1.2rem;
  color: #2764AE;
  font-weight: 700;
}

.slider {
  width: 100%;
  height: 6px;
  -webkit-appearance: none;
  background: rgba(60, 60, 59, 0.1);
  border-radius: 3px;
  outline: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  border: 3px solid #2764AE;
  cursor: pointer;
}

.slider-ticks {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  font-size: 0.85rem;
  color: #475569;
}

.mini-result {
  background: rgba(39, 100, 174, 0.03);
  border-radius: 12px;
  padding: 25px;
  text-align: center;
  border: 1px solid rgba(39, 100, 174, 0.1);
}

.mini-estimate-label {
  display: block;
  font-size: 0.95rem;
  color: #475569;
  margin-bottom: 5px;
}

.mini-estimate-price {
  font-size: 2rem;
  color: #2764AE;
  font-weight: 700;
  display: block;
  margin-bottom: 20px;
}

.btn {
  display: block;
  width: 100%;
  padding: 14px;
  text-align: center;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
}

.btn-primary {
  background-color: #2764AE;
  color: white;
  margin-bottom: 10px;
}
</style>