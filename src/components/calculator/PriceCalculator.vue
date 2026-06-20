<template>
  <div class="calculator">
    <div class="calculator-form">
      <div class="form-group">
        <div class="form-label">
          <span class="label-text">Глубина скважины <span class="label-text-small">(в метрах)</span></span>
          <span class="label-value">{{ depth }} м</span>
        </div>
        <div class="range-slider">
          <input
              type="range"
              min="10"
              max="200"
              step="10"
              v-model.number="depth"
              class="slider"
              ref="sliderRef"
          />
          <div class="slider-ticks">
            <span
                v-for="tick in tickMarks"
                :key="tick.value"
                class="tick-mark"
                :style="{ left: tick.position + 'px' }"
            >{{ tick.label }}</span>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="form-label">
          <span class="label-text">Диаметр обсадной трубы</span>
        </div>
        <div class="radio-group">
          <label class="radio-label" :class="{ active: diameter === 125 }">
            <input type="radio" :value="125" v-model="diameter" hidden />
            <span class="radio-text">125 мм</span>
            <span class="radio-price">+ 0 ₽</span>
          </label>
          <label class="radio-label" :class="{ active: diameter === 150 }">
            <input type="radio" :value="150" v-model="diameter" hidden />
            <span class="radio-text">150 мм</span>
            <span class="radio-price">+ 5 000 ₽</span>
          </label>
        </div>
      </div>

      <div class="form-group">
        <div class="form-label">
          <span class="label-text">Дополнительные услуги (необязательно)</span>
        </div>
        <div class="checkbox-group">
          <label class="checkbox-label" :class="{ active: extras.pump }">
            <input type="checkbox" v-model="extras.pump" hidden />
            <span class="checkbox-text">Монтаж насосного оборудования</span>
            <span class="checkbox-price">+ 15 000 ₽</span>
          </label>
          <label class="checkbox-label" :class="{ active: extras.cleaning }">
            <input type="checkbox" v-model="extras.cleaning" hidden />
            <span class="checkbox-text">Чистка скважины</span>
            <span class="checkbox-price">+ 8 000 ₽</span>
          </label>
          <label class="checkbox-label" :class="{ active: extras.equipment }">
            <input type="checkbox" v-model="extras.equipment" hidden />
            <span class="checkbox-text">Обустройство скважины</span>
            <span class="checkbox-price">+ 25 000 ₽</span>
          </label>
        </div>
      </div>

      <div class="calculator-result">
        <div class="result-header">
          <span class="result-title">Предварительная стоимость</span>
          <span class="result-price">{{ totalCost.toLocaleString() }} ₽</span>
        </div>
        <div class="result-details">
          <div class="result-row">
            <span>Бурение ({{ depth }} м × 2 500 ₽/м)</span>
            <span>{{ drillingCost.toLocaleString() }} ₽</span>
          </div>
          <div class="result-row">
            <span>Диаметр трубы</span>
            <span>{{ pipeCost.toLocaleString() }} ₽</span>
          </div>
          <div class="result-row">
            <span>Дополнительные услуги</span>
            <span>{{ extrasCost.toLocaleString() }} ₽</span>
          </div>
        </div>
        <div class="result-notice">
          <p><strong>Важно:</strong> Это предварительный расчет. Точная стоимость будет определена после выезда специалиста на участок.</p>
        </div>
        <router-link to="/contacts" class="btn btn-block">Получить точный расчет</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'

const depth = ref(50)
const diameter = ref(125)
const extras = ref({ pump: false, cleaning: false, equipment: false })
const sliderRef = ref(null)

const drillingCost = computed(() => depth.value * 2500)
const pipeCost = computed(() => diameter.value === 150 ? 5000 : 0)
const extrasCost = computed(() => {
  let cost = 0
  if (extras.value.pump) cost += 15000
  if (extras.value.cleaning) cost += 8000
  if (extras.value.equipment) cost += 25000
  return cost
})
const totalCost = computed(() => drillingCost.value + pipeCost.value + extrasCost.value)

// ===== Точное позиционирование подписей под слайдером =====
// Нативный <input type="range"> двигает бегунок не от 0% до 100% ширины
// контейнера, а в "полезном" диапазоне (ширина минус диаметр thumb).
// Подписи считаются по той же формуле, что использует браузер
// для позиционирования самого бегунка — тогда они совпадают пиксель в пиксель.

const tickValues = [10, 50, 100, 150, 200]
const tickMarks = ref(tickValues.map(v => ({ value: v, label: v + 'м', position: 0 })))

const THUMB_WIDTH = 28
const THUMB_WIDTH_MOBILE = 24
const MOBILE_BREAKPOINT = 576

function getThumbWidth() {
  return window.innerWidth <= MOBILE_BREAKPOINT ? THUMB_WIDTH_MOBILE : THUMB_WIDTH
}

function recalcTickPositions() {
  if (!sliderRef.value) return

  const trackWidth = sliderRef.value.offsetWidth
  const thumbWidth = getThumbWidth()
  const usableWidth = trackWidth - thumbWidth
  const min = 10
  const max = 200

  tickMarks.value = tickValues.map(v => {
    const ratio = (v - min) / (max - min)
    const position = thumbWidth / 2 + ratio * usableWidth
    return { value: v, label: v + 'м', position }
  })
}

let resizeObserver = null

onMounted(() => {
  nextTick(recalcTickPositions)

  resizeObserver = new ResizeObserver(() => recalcTickPositions())
  if (sliderRef.value) {
    resizeObserver.observe(sliderRef.value)
  }

  window.addEventListener('resize', recalcTickPositions)
})

onUnmounted(() => {
  if (resizeObserver) resizeObserver.disconnect()
  window.removeEventListener('resize', recalcTickPositions)
})

// ===== Сохранение расчёта для форм заявки и чат-бота =====

let userInteracted = false

function saveCalculationSnapshot() {
  const extrasLabels = []
  if (extras.value.pump) extrasLabels.push('Монтаж насоса')
  if (extras.value.cleaning) extrasLabels.push('Чистка скважины')
  if (extras.value.equipment) extrasLabels.push('Обустройство скважины')

  sessionStorage.setItem('bur52_last_calculation', JSON.stringify({
    depth: Number(depth.value),
    diameter: Number(diameter.value),
    extras: extrasLabels,
    total: totalCost.value,
    interacted: userInteracted
  }))

  window.dispatchEvent(new CustomEvent('calculator-updated'))
}

saveCalculationSnapshot()

watch([depth, diameter, extras], () => {
  userInteracted = true
  saveCalculationSnapshot()
}, { deep: true })
</script>

<style>
.calculator {
  padding: 40px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
}

.calculator-form {
  width: 100%;
}

.form-group {
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(60, 60, 59, 0.1);
}

.form-group:last-child {
  border-bottom: none;
  margin-bottom: 30px;
  padding-bottom: 0;
}

.form-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.label-text {
  font-size: 1.2rem;
  color: #1E293B;
  font-weight: 600;
}

.label-text-small {
  font-size: 0.9rem;
  color: #475569;
  margin-left: 10px;
}

.label-value {
  font-size: 1.3rem;
  color: #2764AE;
  font-weight: 700;
}

.range-slider {
  position: relative;
  margin: 30px 0 10px;
}

.slider {
  width: 100%;
  height: 6px;
  -webkit-appearance: none;
  background: rgba(60, 60, 59, 0.1);
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  margin: 0;
  display: block;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: white;
  border: 3px solid #2764AE;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(39, 100, 174, 0.3);
  transition: all 0.3s ease;
}

.slider::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(39, 100, 174, 0.4);
  border-color: #0F172A;
}

.slider::-moz-range-thumb {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: white;
  border: 3px solid #2764AE;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(39, 100, 174, 0.3);
  transition: all 0.3s ease;
}

.slider::-moz-range-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(39, 100, 174, 0.4);
  border-color: #0F172A;
}

.slider-ticks {
  position: relative;
  margin-top: 18px;
  font-size: 0.9rem;
  color: #475569;
  height: 20px;
}

.tick-mark {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  white-space: nowrap;
}

.radio-group {
  display: flex;
  gap: 12px;
}

.radio-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border: 2px solid rgba(60, 60, 59, 0.1);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
}

.radio-label.active {
  border-color: #2764AE;
  background-color: rgba(39, 100, 174, 0.05);
}

.radio-text {
  font-weight: 500;
  color: #475569;
}

.radio-price {
  color: #2764AE;
  font-weight: 600;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.checkbox-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border: 2px solid rgba(60, 60, 59, 0.1);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.checkbox-label.active {
  border-color: #2764AE;
  background-color: rgba(39, 100, 174, 0.05);
}

.checkbox-text {
  font-weight: 500;
  color: #475569;
}

.checkbox-price {
  color: #2764AE;
  font-weight: 600;
}

.calculator-result {
  border-radius: 15px;
  padding: 30px;
  margin-top: 30px;
  border: 2px solid rgba(39, 100, 174, 0.1);
  background: #f8fafc;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 2px solid rgba(39, 100, 174, 0.1);
}

.result-title {
  font-size: 1.4rem;
  color: #1E293B;
  font-weight: 600;
}

.result-price {
  font-size: 2rem;
  color: #2764AE;
  font-weight: 700;
}

.result-details {
  margin-bottom: 25px;
}

.result-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  color: #475569;
  font-size: 0.95rem;
  opacity: 0.8;
}

.result-row:not(:last-child) {
  border-bottom: 1px solid rgba(60, 60, 59, 0.1);
}

.result-notice {
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 25px;
  border-left: 4px solid #2764AE;
  background: rgba(39, 100, 174, 0.05);
}

.result-notice p {
  margin: 0;
  font-size: 0.9rem;
  color: #475569;
  line-height: 1.5;
  opacity: 0.8;
}

.result-notice strong {
  color: #2764AE;
}

.btn {
  display: inline-block;
  padding: 16px 32px;
  background-color: #2764AE;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid #2764AE;
  cursor: pointer;
  text-align: center;
}

.btn:hover {
  background-color: transparent;
  color: #2764AE;
}

.btn-block {
  display: block;
  width: 100%;
}

@media (max-width: 922px) {
  .radio-group {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .btn:hover {
    background-color: #2764AE;
    color: white;
  }

  .btn {
    padding: 10px 5px;
    font-size: 0.6rem;
  }

  .calculator {
    padding: 30px 25px;
  }

  .form-label {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .label-value {
    font-size: 1.2rem;
  }

  .result-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .result-price {
    font-size: 1.8rem;
  }
}

@media (max-width: 576px) {
  .calculator {
    padding: 25px 20px;
  }

  .slider::-webkit-slider-thumb {
    width: 24px;
    height: 24px;
  }

  .slider::-moz-range-thumb {
    width: 24px;
    height: 24px;
  }

  .radio-label, .checkbox-label {
    padding: 14px 16px;
  }

  .calculator-result {
    padding: 25px 20px;
  }

  .result-price {
    font-size: 1.6rem;
  }
}

@media (max-width: 400px) {
  .slider-ticks {
    font-size: 0.8rem;
  }

  .radio-text, .checkbox-text {
    font-size: 0.9rem;
  }

  .radio-price, .checkbox-price {
    font-size: 0.9rem;
  }
}
</style>