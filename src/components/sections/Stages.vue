<template>
  <section class="stages-section">
    <div class="container">
      <div class="section-header">
        <span class="section-subtitle">Как мы работаем</span>
        <h2 class="section-title">Всего 4 простых этапа</h2>
      </div>
      <div class="stages-timeline">

        <div class="stage-item">
          <div class="stage-item__number">01</div>
          <div class="stage-item__content">
            <h3 class="stage-item__title">Заявка и консультация</h3>
            <p class="stage-item__description">Вы оставляете заявку, мы бесплатно консультируем и согласовываем время выезда инженера.</p>
          </div>
          <div class="stage-item__icon"><svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="28" fill="#2764AE" opacity="0.1"/>
            <circle cx="30" cy="25" r="8" stroke="#2764AE" stroke-width="2"/>
            <path d="M20 45 C20 38 25 35 30 35 C35 35 40 38 40 45" stroke="#2764AE" stroke-width="2" stroke-linecap="round"/>
            <circle cx="42" cy="18" r="6" fill="#2764AE"/>
            <path d="M40 18 L42 20 L45 16" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg></div>
        </div>

        <div class="stage-item">
          <div class="stage-item__number">02</div>
          <div class="stage-item__content">
            <h3 class="stage-item__title">Выезд и оценка участка</h3>
            <p class="stage-item__description">Специалист приезжает, изучает грунт, определяет оптимальное место и составляет точную смету.</p>
          </div>
          <div class="stage-item__icon"><svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="28" fill="#2764AE" opacity="0.1"/>
            <rect x="18" y="25" width="24" height="16" rx="2" stroke="#2764AE" stroke-width="2"/>
            <path d="M18 30 L42 30" stroke="#2764AE" stroke-width="2"/>
            <circle cx="35" cy="35" r="2" fill="#2764AE"/>
            <path d="M22 25 L22 20 C22 18 24 17 26 17 L34 17 C36 17 38 18 38 20 L38 25" stroke="#2764AE" stroke-width="2" stroke-linecap="round"/>
          </svg></div>
        </div>

        <div class="stage-item">
          <div class="stage-item__number">03</div>
          <div class="stage-item__content">
            <h3 class="stage-item__title">Бурение и монтаж</h3>
            <p class="stage-item__description">Работаем быстро и чисто. Используем малогабаритные или тяжелые установки в зависимости от условий.</p>
          </div>
          <div class="stage-item__icon"><svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="28" fill="#2764AE" opacity="0.1"/>
            <path d="M30 15 L30 45" stroke="#2764AE" stroke-width="3" stroke-linecap="round"/>
            <path d="M25 20 L35 20" stroke="#2764AE" stroke-width="2" stroke-linecap="round"/>
            <path d="M22 25 L38 25" stroke="#2764AE" stroke-width="2" stroke-linecap="round"/>
            <circle cx="30" cy="45" r="3" fill="#2764AE"/>
            <path d="M20 50 Q30 55 40 50" stroke="#2764AE" stroke-width="2" stroke-linecap="round"/>
          </svg></div>
        </div>

        <div class="stage-item">
          <div class="stage-item__number">04</div>
          <div class="stage-item__content">
            <h3 class="stage-item__title">Сдача и гарантия</h3>
            <p class="stage-item__description">Промываем скважину, сдаем паспорт объекта, подключаем оборудование и даем гарантию 5 лет.</p>
          </div>
          <div class="stage-item__icon"><svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="28" fill="#2764AE" opacity="0.1"/>
            <path d="M30 15 L42 20 L42 32 C42 40 36 45 30 48 C24 45 18 40 18 32 L18 20 L30 15 Z" stroke="#2764AE" stroke-width="2" stroke-linejoin="round"/>
            <path d="M25 30 L28 33 L35 26" stroke="#2764AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg></div>

        </div>


      </div>

    </div>
    <div class="stages-footer">
      <router-link to="/contacts" class="services-cta">Обсудить мой проект</router-link>
    </div>
  </section>

</template>

<script setup>

</script>

<style>
.stages-footer {
  text-align: center;
}
.stages-section {
  padding: 80px 20px;
  background: white;
}

.stages-timeline {
  max-width: 900px;
  margin: 0 auto;
}

.stage-item {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  padding: 25px 30px;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(60, 60, 59, 0.1);
  transition: all 0.3s ease;
}

.stage-item:hover {
  transform: translateX(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

.stage-item__number {
  font-size: 2.2rem;
  font-weight: bold;
  color: #2764AE;
  min-width: 60px;
  margin-right: 25px;
}

.stage-item__content {
  flex-grow: 1;
  margin-right: 25px;
}

.stage-item__title {
  font-size: 1.4rem;
  color: #1E293B;
  margin-bottom: 10px;
}

.stage-item__description {
  color: #475569;
  line-height: 1.6;
}

.stage-item__icon {
  width: 60px;
  height: 60px;
  background-color: rgba(39, 100, 174, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

@media (max-width: 768px) {
  .stage-item { flex-direction: column; text-align: center; }
  .stage-item__number { margin-right: 0; margin-bottom: 15px; }
  .stage-item__content { margin-right: 0; margin-bottom: 20px; }
}
</style>