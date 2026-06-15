<template>
  <div class="services-price-page">
    <div class="container">
      <PageChapter
          subtitle="Полный спектр услуг"
          title="Наши услуги по бурению скважин"
          description="Профессиональные решения для водоснабжения вашего участка. Работаем с 2010 года, выполнили более 500 успешных проектов."
      />

      <div class="services-grid">
        <div class="services-grid-item" v-for="service in services" :key="service.id">
          <div class="service-card-full">
            <div class="service-card__header">
              <div v-if="service.badge" class="service-card__badge">{{ service.badge }}</div>
              <div class="service-card__icon">{{ service.icon }}</div>
              <div class="service-card__subtitle">{{ service.subtitle }}</div>
              <h3 class="service-card__title">{{ service.title }}</h3>
            </div>

            <div class="service-card__content">
              <p class="service-card__description">{{ service.description }}</p>
              <ul class="service-card__features">
                <li v-for="(feature, index) in service.features" :key="index">{{ feature }}</li>
              </ul>
            </div>

            <div class="service-card__meta-wrapper">
              <div class="service-card__meta">
                <span class="service-card__price">{{ service.price }}</span>
              </div>
            </div>

            <div class="service-card__footer">
              <router-link to="/contacts" class="service-card__btn2">Заказать</router-link>
              <router-link :to="service.detailLink" class="service-card__btn">Подробнее</router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="advantages-section2">
        <h2 class="advantages-title2">Почему выбирают нас</h2>
        <div class="advantages-grid2">
          <div class="advantages-grid-item2" v-for="advantage in advantages" :key="advantage.id">
            <div class="advantage-icon2">{{ advantage.icon }}</div>
            <h3 class="advantage-title2">{{ advantage.title }}</h3>
            <p class="advantage-description2">{{ advantage.description }}</p>
          </div>
        </div>
      </div>

      <div class="cta-section">
        <h2 class="cta-title">Готовы обсудить ваш проект?</h2>
        <p class="cta-description">Оставьте заявку и наш специалист свяжется с вами в течение 30 минут. Бесплатный выезд на участок для точного расчета стоимости.</p>
        <div class="cta-buttons">
          <router-link to="/contacts" class="cta-btn primary">Оставить заявку</router-link>
          <a href="tel:89200521982" class="cta-btn secondary">Позвонить</a>
        </div>
      </div>
    </div>

    <ContactForm
        title="Обсудим ваш проект уже сегодня"
        subtitle=""
    />
  </div>
</template>

<script setup>
import PageChapter from '../components/sections/PageChapter.vue'
import ContactForm from '../components/forms/ContactForm.vue'

const services = [
  {
    id: 1,
    icon: '🔩',
    badge: 'Основная услуга',
    subtitle: 'Популярно',
    title: 'Бурение скважин на воду',
    description: 'Профессиональное бурение скважин любой сложности с использованием современного немецкого оборудования. Глубина бурения до 150 метров.',
    features: [
      'Артезианские скважины (50-150 м)',
      'Песчаные скважины (15-30 м)',
      'Абиссинские колодцы (8-12 м)',
      'Геологическое исследование',
      'Оформление паспорта скважины'
    ],
    price: 'от 2 500 ₽/метр',
    detailLink: '/services'
  },
  {
    id: 2,
    icon: '⚙️',
    badge: 'Установка',
    subtitle: 'Хит сезона',
    title: 'Монтаж насосного оборудования',
    description: 'Профессиональный подбор, установка и настройка насосного оборудования. Гарантия на работы 2 года.',
    features: [
      'Погружные насосы Grundfos, Pedrollo',
      'Насосные станции',
      'Автоматика управления',
      'Гидроаккумуляторы',
      'Системы фильтрации'
    ],
    price: 'от 15 000 ₽',
    detailLink: '/services'
  },
  {
    id: 3,
    icon: '🛠️',
    subtitle: 'Обслуживание',
    title: 'Чистка и ремонт скважин',
    description: 'Восстановление производительности скважин. Устранение заиливания, песка, повышение дебита.',
    features: [
      'Гидроударная чистка',
      'Механическая очистка',
      'Видеодиагностика скважины',
      'Ремонт обсадных труб',
      'Замена фильтров'
    ],
    price: 'от 8 000 ₽',
    detailLink: '/services'
  },
  {
    id: 4,
    icon: '',
    subtitle: 'Комплекс',
    title: 'Обустройство скважины',
    description: 'Комплекс работ по защите скважины и подключению к водопроводной системе дома.',
    features: [
      'Установка кессона',
      'Монтаж скважинного адаптера',
      'Утепление и гидроизоляция',
      'Подвод воды в дом',
      'Установка автоматики'
    ],
    price: 'от 25 000 ₽',
    detailLink: '/services'
  },
  {
    id: 5,
    icon: '🏭',
    subtitle: 'Промышленность',
    title: 'Промышленные скважины',
    description: 'Бурение глубоких скважин на воду для предприятий и производств',
    features: [
      'Глубина бурения до 300 метров и более',
      'Дебит скважины от 5 до 100+ м³/час',
      'Полный комплект документации (паспорт скважины)',
      'Использование промышленных обсадных колонн',
      'Соблюдение всех норм и требований (СанПиН, СНиП)'
    ],
    price: 'от 5 000 ₽',
    detailLink: '/services'
  },
  {
    id: 6,
    icon: '📞',
    subtitle: 'Бесплатно',
    title: 'Консультация специалиста',
    description: 'Бесплатная консультация по вопросам бурения, обслуживания и ремонта скважин.',
    features: [
      'Выезд на участок',
      'Анализ почвы и грунта',
      'Подбор оптимального решения',
      'Расчет предварительной сметы',
      'Ответы на все вопросы'
    ],
    price: 'Бесплатно',
    detailLink: '/services'
  }
]

const advantages = [
  {
    id: 1,
    icon: '🛡️',
    title: 'Гарантия 5 лет',
    description: 'Даем официальную гарантию на все виды работ и используемые материалы'
  },
  {
    id: 2,
    icon: '⭐',
    title: 'Опыт 10+ лет',
    description: 'Более 10 лет профессиональной работы и 500+ успешных проектов'
  },
  {
    id: 3,
    icon: '⚙️',
    title: 'Современное оборудование',
    description: 'Используем профессиональное оборудование от ведущих производителей'
  },
  {
    id: 4,
    icon: '💰',
    title: 'Честные цены',
    description: 'Прозрачное ценообразование без скрытых платежей и накруток'
  }
]
</script>

<style>
.services-price-page {
  padding: 20px 0;
}

.container {
  max-width: 1400px;
  padding: 0 20px;
  margin: 0 auto;
}

.services-grid {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px 0px -15px;
}

.services-grid-item {
  width: 33.333%;
  padding: 0 15px 30px 15px;
  box-sizing: border-box;
  display: flex;
}

.service-card-full {
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.service-card-full:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(38, 70, 83, 0.15);
  border-color: #dee2e6;
}

.service-card__header {
  padding: 25px 25px 15px;
  position: relative;
  flex-shrink: 0;
}

.service-card__badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #2764AE;
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
}

.service-card__icon {
  width: 60px;
  height: 60px;
  background-color: rgba(39, 100, 174, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
  font-size: 1.5rem;
}

.service-card__subtitle {
  color: #2764AE;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.service-card__title {
  font-size: 1.4rem;
  color: #1E293B;
  margin-bottom: 15px;
  line-height: 1.3;
  font-weight: 700;
}

.service-card__content {
  padding: 0 25px 0px 25px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.service-card__description {
  color: #475569;
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 0.95rem;
  flex-shrink: 0;
}

.service-card__features {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
  flex-shrink: 0;
}

.service-card__features li {
  position: relative;
  padding-left: 25px;
  margin-bottom: 8px;
  color: #475569;
  font-size: 0.9rem;
}

.service-card__features li:before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #2764AE;
  font-weight: bold;
}

.service-card__meta-wrapper {
  margin-top: auto;
  padding-top: 15px;
  border-top: 1px solid #e9ecef;
  flex-shrink: 0;
}

.service-card__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.service-card__price {
  font-size: 1.3rem;
  color: #2764AE;
  font-weight: 700;
}

.service-card__footer {
  padding: 0 25px 10px;
  flex-shrink: 0;
}

.service-card__btn {
  display: block;
  width: 100%;
  padding: 12px;
  background-color: transparent;
  color: #2764AE;
  text-decoration: none;
  border: 2px solid #2764AE;
  border-radius: 8px;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s ease;
  margin-bottom: 20px;
}

.service-card__btn:hover {
  background-color: #2764AE;
  color: white;
}

.service-card__btn2 {
  display: block;
  width: 100%;
  padding: 12px;
  background-color: #2764AE;
  color: white;
  text-decoration: none;
  border: 2px solid #2764AE;
  border-radius: 8px;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s ease;
  margin-bottom: 10px;
}

.advantages-section2 {
  background: white;
  padding: 50px;
  margin-bottom: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(38, 70, 83, 0.1);
  border: 1px solid #e9ecef;
}

.advantages-title2 {
  text-align: center;
  font-size: 2rem;
  color: #1E293B;
  margin-bottom: 40px;
  font-weight: 700;
}

.advantages-grid2 {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -20px;
}

.advantages-grid-item2 {
  width: 25%;
  padding: 0 20px 30px 20px;
  box-sizing: border-box;
  text-align: center;
}

.advantage-icon2 {
  width: 80px;
  height: 80px;
  background-color: rgba(39, 100, 174, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 2rem;
}

.advantage-title2 {
  font-size: 1.3rem;
  color: #1E293B;
  margin-bottom: 10px;
  font-weight: 600;
}

.advantage-description2 {
  color: #475569;
  line-height: 1.5;
  font-size: 0.95rem;
}

.cta-section {
  text-align: center;
  padding: 60px 40px;
  background: linear-gradient(135deg, #1E3A8A 0%, #2764AE 100%);
  border-radius: 20px;
  color: white;
  margin-bottom: 30px;
}

.cta-title {
  font-size: 2.5rem;
  margin-bottom: 20px;
  font-weight: 700;
}

.cta-description {
  font-size: 1.1rem;
  margin-bottom: 30px;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-btn {
  padding: 16px 35px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.cta-btn.primary {
  background-color: white;
  color: #2764AE;
}

.cta-btn.secondary {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}

.cta-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

@media (max-width: 1200px) {
  .services-grid-item {
    width: 50%;
  }

  .advantages-grid-item2 {
    width: 50%;
  }

  .container {
    padding: 0 30px;
  }
}

@media (max-width: 992px) {
  .services-price-page {
    padding: 50px 0;
  }

  .advantages-section2 {
    padding: 40px 30px;
  }

  .cta-section {
    padding: 50px 30px;
  }

  .cta-title {
    font-size: 2.2rem;
  }
}

@media (max-width: 768px) {
  .services-price-page {
    padding: 40px 0;
  }

  .cta-btn:hover {
    transform: translateY(0px);
  }

  .service-card-full:hover {
    transform: translateY(0px);
  }

  .service-card__btn {
    background-color: transparent;
    color: #2764AE;
  }

  .service-card__btn:hover {
    background-color: transparent;
    color: #2764AE;
  }

  .services-grid {
    margin: 0 -10px 40px -10px;
  }

  .services-grid-item {
    width: 100%;
    padding: 0 10px 25px 10px;
  }

  .service-card__header,
  .service-card__content,
  .service-card__footer {
    padding-left: 20px;
    padding-right: 20px;
  }

  .advantages-grid2 {
    margin: 0 -10px;
  }

  .advantages-grid-item2 {
    width: 100%;
    padding: 0 10px 25px 10px;
  }

  .advantage-icon2 {
    width: 70px;
    height: 70px;
  }

  .advantages-section2 {
    padding: 30px 20px;
    border-radius: 15px;
    margin-bottom: 40px;
  }

  .advantages-title2 {
    font-size: 1.8rem;
    margin-bottom: 30px;
  }
}

@media (max-width: 576px) {
  .services-price-page {
    padding: 30px 0;
  }

  .container {
    padding: 0 15px;
  }

  .service-card__title {
    font-size: 1.3rem;
  }

  .service-card__price {
    font-size: 1.2rem;
  }

  .service-card__features li {
    font-size: 0.85rem;
  }

  .advantage-title2 {
    font-size: 1.2rem;
  }

  .advantage-description2 {
    font-size: 0.9rem;
  }

  .cta-title {
    font-size: 1.8rem;
  }

  .cta-description {
    font-size: 0.95rem;
  }

  .cta-section {
    padding: 40px 20px;
    border-radius: 15px;
  }

  .cta-buttons {
    flex-direction: column;
    gap: 15px;
  }

  .cta-btn {
    padding: 14px 25px;
    font-size: 1rem;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
}

@media (max-width: 400px) {
  .service-card__title {
    font-size: 1.2rem;
  }

  .service-card__icon {
    width: 50px;
    height: 50px;
  }

  .cta-title {
    font-size: 1.6rem;
  }
}
</style>