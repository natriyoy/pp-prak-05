<template>
  <div class="services-page">
    <div class="container">
      <section class="anim-blur">

      <PageChapter
          subtitle="Наша специализация"
          title="Все услуги"
          description="Полный спектр услуг по водоснабжению от проектирования до обслуживания"
      />
      </section>
      <div class="services-detail-list">

        <div class="service-detail" v-for="(service, index) in services" :key="index">
          <section class="anim-blur">

          <div class="service-detail__header">
            <span class="service-detail__number">0{{ index + 1 }}</span>
            <h2 class="service-detail__title">{{ service.title }}</h2>
            <div class="service-detail__meta">
              <span class="service-detail__price">{{ service.price }}</span>
              <span class="service-detail__guarantee">Гарантия: {{ service.guarantee }}</span>
            </div>
          </div>

          <div class="service-detail__content">
            <div class="service-detail__left">
              <div class="service-detail__image">
                <img :src="service.image" :alt="service.title" />
              </div>

              <div class="service-detail__features">
                <h3>{{ service.featuresTitle }}</h3>
                <ul>
                  <li v-for="(feature, fIndex) in service.features" :key="fIndex">{{ feature }}</li>
                </ul>
              </div>
            </div>

            <div class="service-detail__right">
              <div class="service-detail__description">
                <h3>Подробное описание</h3>
                <p>{{ service.description }}</p>
              </div>

              <div class="service-detail__process">
                <h3>{{ service.processTitle }}</h3>
                <ol>
                  <li v-for="(step, sIndex) in service.process" :key="sIndex">{{ step }}</li>
                </ol>
              </div>

              <router-link to="/contacts" class="service-detail__cta">{{ service.ctaText }}</router-link>
            </div>
          </div>
            </section>
        </div>
      </div>
      <section class="anim-blur">

      <div class="services-cta-block">
        <div class="cta-content">
          <h2>Нужна консультация по бурению скважины?</h2>
          <p>Наши специалисты помогут подобрать оптимальное решение для вашего участка</p>
          <router-link to="/contacts" class="cta-button">Оставить заявку</router-link>
        </div>
      </div>
      </section>
    </div>
    <section class="anim-blur">

    <ContactForm
        title="Остались вопросы?"
        subtitle="Заполните форму и мы свяжемся с вами в течение 30 минут"
    />
      </section>
  </div>
</template>

<script setup>
import PageChapter from '../components/sections/PageChapter.vue'
import ContactForm from '../components/forms/ContactForm.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
useScrollReveal()
const services = [
  {
    title: 'Бурение скважин на воду',
    price: 'от 2 500 ₽/метр',
    guarantee: '5 лет',
    image: './images/IMG20190801112509.jpg',
    featuresTitle: 'Особенности услуги:',
    features: [
      'Глубина бурения до 150 метров',
      'Использование современного оборудования',
      'Для частного и коммерческого использования',
      'Геологическое исследование участка',
      'Оформление паспорта скважины'
    ],
    description: 'Мы осуществляем профессиональное бурение скважин на воду любой сложности. Наши специалисты используют современное оборудование, что позволяет нам выполнять работы качественно и в кратчайшие сроки.',
    processTitle: 'Этапы работы:',
    process: [
      'Выезд специалиста для оценки участка',
      'Геологическое исследование и проектирование',
      'Согласование проекта и сметы',
      'Непосредственно бурение скважины',
      'Установка обсадных труб',
      'Промывка и тестирование скважины',
      'Оформление документации'
    ],
    ctaText: 'Заказать бурение'
  },
  {
    title: 'Монтаж насосного оборудования',
    price: 'от 15 000 ₽',
    guarantee: '2 года',
    image: './images/nasos-v-kolodtse-3.jpg',
    featuresTitle: 'Что входит в услугу:',
    features: [
      'Подбор оптимального насоса',
      'Монтаж и подключение оборудования',
      'Установка гидроаккумулятора',
      'Настройка автоматики',
      'Пусконаладочные работы'
    ],
    description: 'Профессиональный подбор, установка и настройка насосного оборудования. Гарантия на работы 2 года.',
    processTitle: 'Типы насосов которые мы устанавливаем:',
    process: [
      'Погружные насосы - для глубоких скважин',
      'Поверхностные насосы - для неглубоких источников',
      'Насосные станции - для автоматического водоснабжения',
      'Циркуляционные насосы - для систем отопления'
    ],
    ctaText: 'Заказать монтаж'
  },
  {
    title: 'Чистка и ремонт скважин',
    price: 'от 8 000 ₽',
    guarantee: '1 год',
    image: './images/image(44).png',
    featuresTitle: 'Что входит в услугу:',
    features: [
      'Диагностика состояния скважины',
      'Механическая чистка от ила и песка',
      'Химическая промывка',
      'Замена фильтров',
      'Восстановление дебита',
      'Ремонт обсадных труб'
    ],
    description: 'Восстановление производительности скважин. Устранение заиливания, песка, повышение дебита.',
    processTitle: 'Когда требуется чистка:',
    process: [
      'Снижение напора воды',
      'Появление песка или ила в воде',
      'Изменение вкуса или запаха воды',
      'Периодическая промывка (раз в 3-5 лет)'
    ],
    ctaText: 'Заказать чистку'
  },
  {
    title: 'Обустройство скважины',
    price: 'от 25 000 ₽',
    guarantee: '3 года',
    image: './images/diploma.webp',
    featuresTitle: 'Что входит в обустройство:',
    features: [
      'Установка кессона или адаптера',
      'Прокладка труб в дом',
      'Монтаж автоматики',
      'Подключение к системе водоснабжения',
      'Теплоизоляция и защита',
      'Пусконаладочные работы'
    ],
    description: 'Комплекс работ по защите скважины и подключению к водопроводной системе дома.',
    processTitle: 'Варианты обустройства:',
    process: [
      'Кессон - для зимнего использования, устанавливается в котлован',
      'Адаптер - для экономии, монтируется на глубине промерзания',
      'Адаптер + кессон - максимальная надежность и функциональность'
    ],
    ctaText: 'Заказать обустройство'
  },
  {
    title: 'Промышленные скважины',
    price: 'от 5 000 ₽/метр',
    guarantee: '7 лет',
    image: './images/promyshlennaya.jpg',
    featuresTitle: 'Особенности услуги:',
    features: [
      'Глубина бурения до 300 метров и более',
      'Дебит скважины от 5 до 100+ м³/час',
      'Полный комплект документации (паспорт скважины)',
      'Использование промышленных обсадных колонн',
      'Соблюдение всех норм и требований (СанПиН, СНиП)'
    ],
    description: 'Мы осуществляем профессиональное бурение промышленных скважин на воду для предприятий и производств. Наши специалисты используют современное оборудование и передовые технологии.',
    processTitle: 'Этапы работы:',
    process: [
      'Выезд специалиста для оценки объекта и технического задания',
      'Геологическое исследование и проектирование скважины',
      'Согласование проекта и сметы с заказчиком',
      'Получение необходимых разрешений и согласований',
      'Непосредственно бурение промышленной скважины',
      'Установка промышленных обсадных колонн',
      'Промывка, тестирование и определение дебита',
      'Оформление полного комплекта документации',
      'Сдача скважины в эксплуатацию'
    ],
    ctaText: 'Заказать диагностику'
  },
  {
    title: 'Консультация специалиста',
    price: 'Бесплатно',
    guarantee: 'честные рекомендации',
    image: './images/glaz.jpg',
    featuresTitle: 'Что входит в консультацию:',
    features: [
      'Выезд на участок',
      'Анализ почвы и грунта',
      'Подбор оптимального решения',
      'Расчет предварительной сметы',
      'Ответы на все вопросы'
    ],
    description: 'Мы предлагаем бесплатную консультацию по вопросам бурения, обслуживания и ремонта скважин. Наши специалисты помогут вам разобраться во всех нюансах и подобрать оптимальное решение для вашего участка.',
    processTitle: 'Процесс консультации:',
    process: [
      'Звонок или заявка на сайте',
      'Согласование удобного времени для выезда',
      'Выезд специалиста на ваш участок',
      'Осмотр участка и анализ условий',
      'Обсуждение ваших потребностей и пожеланий',
      'Предложение оптимальных вариантов решения',
      'Расчет предварительной стоимости работ',
      'Ответы на все ваши вопросы',
      'Составление плана дальнейших действий'
    ],
    ctaText: 'Заказать консультацию'
  }
]
</script>

<style>
.services-page {
  padding: 20px 0;
}

.container {
  max-width: 1400px;
  padding: 0 20px;
  margin: 0 auto;
}

.services-detail-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 50px;
}

.service-detail {
  background: white;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
}

.service-detail__header {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid rgba(60, 60, 59, 0.1);
}

.service-detail__number {
  display: inline-block;
  background-color: #2764AE;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  font-weight: bold;
  margin-bottom: 15px;
}

.service-detail__title {
  font-size: 2rem;
  color: #1E293B;
  margin-bottom: 15px;
  font-weight: 700;
}

.service-detail__meta {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}

.service-detail__price {
  font-weight: bold;
  color: #475569;
  font-size: 1.2rem;
}

.service-detail__guarantee {
  font-weight: bold;
  color: #475569;
  font-size: 1.2rem;
}

.service-detail__content {
  display: flex;
  gap: 40px;
}

.service-detail__left {
  flex: 1;
}

.service-detail__right {
  flex: 1;
}

.service-detail__image {
  margin-bottom: 20px;
}

.service-detail__image img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
}

.service-detail__features {
  border-radius: 20px;
  overflow: hidden;
  padding: 25px;
  box-shadow: 0 15px 40px rgba(0, 60, 120, 0.08);
  border: 1px solid #2764AE;
  margin-bottom: 20px;
}

.service-detail__features h3 {
  color: #1E293B;
  margin-bottom: 15px;
  font-size: 1.3rem;
}

.service-detail__features ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.service-detail__features li {
  color: #475569;
  padding-left: 24px;
  margin-bottom: 10px;
  position: relative;
}

.service-detail__features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #2764AE;
  font-weight: bold;
}

.service-detail__description,
.service-detail__process {
  margin-bottom: 30px;
}

.service-detail__description h3,
.service-detail__process h3 {
  color: #1E293B;
  margin-bottom: 15px;
  font-size: 1.3rem;
}

.service-detail__description p,
.service-detail__process p {
  line-height: 1.6;
  color: #475569;
  margin-bottom: 15px;
}

.service-detail__process ol {
  padding-left: 20px;
  margin-bottom: 15px;
}

.service-detail__process ol li {
  margin-bottom: 8px;
  line-height: 1.6;
  color: #475569;
}

.service-detail__cta {
  display: inline-block;
  padding: 15px 30px;
  background-color: #2764AE;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  border: 2px solid #2764AE;
}

.service-detail__cta:hover {
  background-color: transparent;
  color: #2764AE;
}

.services-cta-block {
  background: linear-gradient(135deg, #1E3A8A 0%, #2764AE 100%);
  border-radius: 15px;
  padding: 60px 40px;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 50px;
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
}

.cta-content h2 {
  color: white;
  font-size: 2.2rem;
  margin-bottom: 15px;
}

.cta-content p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  margin-bottom: 30px;
  line-height: 1.6;
}

.cta-button {
  display: inline-block;
  padding: 16px 40px;
  background-color: white;
  color: #2764AE;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

@media (max-width: 992px) {
  .service-detail__content {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .service-detail {
    padding: 25px;
  }

  .service-detail__cta {
    background-color: #2764AE;
    color: white;
    width: 100%;
    text-align: center;
  }

  .service-detail__cta:hover {
    background-color: #2764AE;
    color: white;
  }

  .service-detail__title {
    font-size: 1.6rem;
  }

  .service-detail__meta {
    gap: 15px;
    font-size: 0.9rem;
  }

  .service-detail__image img {
    height: 200px;
  }
}

@media (max-width: 480px) {
  .service-detail {
    padding: 20px;
  }

  .service-detail__title {
    font-size: 1.4rem;
  }
}
</style>