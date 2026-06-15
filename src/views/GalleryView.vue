<template>
  <div class="gallery-page">
    <div class="contacts-hero2">
      <div class="container">
        <div class="hero-content2">
          <div class="hero-badge2">
            <span class="badge-text2">Наши работы</span>
          </div>
          <h1 class="hero-title2">Фотогалерея</h1>
          <p class="hero-subtitle2">Мы всегда на связи и готовы ответить на ваши вопросы о бурении скважин, рассчитать стоимость и организовать выезд специалиста</p>
        </div>
      </div>
    </div>

    <div class="container">
      <GalleryGrid :sections="gallerySections" />
    </div>

    <FeedbackForm />
  </div>
</template>

<script setup>
import GalleryGrid from '../components/gallery/GalleryGrid.vue'
import ContactForm from '../components/forms/ContactForm.vue'
import FeedbackForm from "@/components/forms/FeedbackForm.vue";

const gallerySections = [
  {
    name: 'Борский район',
    photos: [
      '/images/IMG20190801090133.jpg',
      '/images/IMG20190801112509.jpg',
      '/images/IMG20190801125615_01.jpg',
      '/images/IMG20190804101727.jpg',
      '/images/IMG20190804101804.jpg',
      '/images/IMG20190804141410.jpg',
      '/images/IMG20190804141421.jpg',
      '/images/IMG20190804141426.jpg',
      '/images/IMG20190804141445.jpg',
      '/images/IMG20190804141508.jpg',
      '/images/IMG20190804141518.jpg',
      '/images/IMG20190804155231.jpg',
      '/images/IMG20190804155244.jpg',
      '/images/IMG20190804164107.jpg',
      '/images/IMG20190804164203.jpg',
      '/images/IMG20190805084717.jpg'
    ]
  },
  {
    name: 'Сокольское',
    photos: [
      '/images/P1120756.JPG',
      '/images/P1120758.JPG',
      '/images/P1120760.JPG',
      '/images/P1120761.JPG',
      '/images/P1120762.JPG',
      '/images/P1120763.JPG',
      '/images/P1120764.JPG',
      '/images/P1120765.JPG',
      '/images/P1120766.JPG'
    ]
  },
  {
    name: 'Николино Поле',
    photos: [
      '/images/IMG20190807135954.jpg',
      '/images/IMG20190807140002.jpg',
      '/images/IMG20190807140006.jpg',
      '/images/IMG20190807140017.jpg',
      '/images/IMG20190807140023.jpg',
      '/images/IMG20190807140030.jpg',
      '/images/IMG20190807140037.jpg',
      '/images/IMG20190807140050.jpg',
      '/images/IMG20190807151616.jpg',
      '/images/IMG20190807151619.jpg',
      '/images/IMG20190807151628.jpg',
      '/images/IMG20190807151632.jpg',
      '/images/IMG20190807151645.jpg',
      '/images/IMG20190807151648.jpg',
      '/images/IMG20190808123620.jpg',
      '/images/IMG20190808123623.jpg',
      '/images/IMG20190808123625.jpg',
      '/images/IMG20190808123642.jpg',
      '/images/IMG20190808124842.jpg',
      '/images/IMG20190810143941.jpg',
      '/images/IMG20190810143950.jpg',
      '/images/IMG20190810144007.jpg'
    ]
  },
  {
    name: 'Серпухов-Тула',
    photos: [
      '/images/IMG20200312145727.jpg',
      '/images/IMG20200312150137.jpg',
      '/images/IMG20200312150141.jpg',
      '/images/IMG20200312150159.jpg',
      '/images/IMG20200312160746.jpg',
      '/images/IMG20200312160749.jpg',
      '/images/IMG20200313101919.jpg',
      '/images/IMG20200313101921.jpg',
      '/images/IMG20200313101926.jpg',
      '/images/IMG20200313104037.jpg',
      '/images/IMG20200313110028.jpg',
      '/images/IMG20200313110036.jpg',
      '/images/IMG20200313111708.jpg',
      '/images/IMG20200313112832.jpg',
      '/images/IMG20200313123025.jpg',
      '/images/IMG20200313123041.jpg',
      '/images/IMG20200313125302.jpg',
      '/images/IMG20200313125310.jpg',
      '/images/IMG20200313145336.jpg',
      '/images/IMG20200313145345.jpg',
      '/images/IMG20200313154256.jpg',
      '/images/IMG20200313154311.jpg',
      '/images/IMG20200313154314.jpg',
      '/images/IMG20200313154316.jpg',
      '/images/IMG20200313164908.jpg',
      '/images/IMG20200313164921.jpg',
      '/images/IMG20200313172601.jpg',
      '/images/IMG20200313174244.jpg',
      '/images/IMG20200314101223.jpg',
      '/images/IMG20200314104053.jpg',
      '/images/IMG20200314110100.jpg',
      '/images/IMG20200314110102.jpg',
      '/images/IMG20200314110104.jpg',
      '/images/IMG20200314110107.jpg',
      '/images/IMG20200314110111.jpg',
      '/images/IMG20200314124250.jpg',
      '/images/IMG20200314130403.jpg'
    ]
  }
]
</script>

<style>
.gallery-page {
  background: #f8f9fa;
}

.contacts-hero2 {
  background: linear-gradient(135deg, #1E3A8A 0%, #2764AE 100%);
  border: none;
  padding: 80px 0 100px;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.contacts-hero2::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 101px;
  background: #f8f9fa;
  clip-path: polygon(0 100%, 100% 100%, 100% 0, 0 100%);
  transform: translateY(1px);
}

.hero-content2 {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  color: white;
}

.hero-badge2 {
  display: inline-block;
  margin-bottom: 20px;
  color: white;
}

.badge-text2 {
  color: white;
  display: inline-block;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 8px 20px;
  background-color: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 30px;
  backdrop-filter: blur(5px);
}

.hero-title2 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.2;
  color: white;
}

.hero-subtitle2 {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

@media (max-width: 810px) {
  .contacts-hero2 {
    padding: 40px 0 60px;
  }

  .contacts-hero2::before {
    width: 0;
    clip-path: polygon(0 100%, 100% 100%, 100% 0, 0 0%);
  }

  .hero-content2 {
    padding-bottom: 30px;
  }

  .hero-title2 {
    font-size: 2rem;
  }

  .hero-subtitle2 {
    font-size: 1rem;
  }
}
</style>