<template>
  <div class="gallery-container">
    <div v-for="(section, index) in sections" :key="index" class="gallery-section6">
      <div class="section-header6">
        <h2 class="section-title6">{{ section.name }}</h2>
        <span class="section-count6">{{ section.photos.length }} фото</span>
      </div>
      <div class="gallery">
        <div v-for="(photo, pIndex) in section.photos" :key="pIndex" class="photo-container" @click="openLightbox(section.photos, pIndex)">
          <img :src="photo" :alt="section.name" class="photo" loading="lazy" />
        </div>
      </div>
    </div>

    <LightboxModal
        :is-open="isLightboxOpen"
        :image-src="currentImage"
        @close="isLightboxOpen = false"
        @prev="prevImage"
        @next="nextImage"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import LightboxModal from '../common/LightboxModal.vue'

const props = defineProps({
  sections: { type: Array, default: () => [] }
})

const isLightboxOpen = ref(false)
const currentIndex = ref(0)
const currentSectionPhotos = ref([])

const currentImage = computed(() => currentSectionPhotos.value[currentIndex.value] || '')

const openLightbox = (photos, index) => {
  currentSectionPhotos.value = photos
  currentIndex.value = index
  isLightboxOpen.value = true
}

const prevImage = () => {
  if (currentIndex.value > 0) currentIndex.value--
}

const nextImage = () => {
  if (currentIndex.value < currentSectionPhotos.value.length - 1) currentIndex.value++
}
</script>

<style>
.gallery-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 60px;
}

.gallery-section6 {
  margin-bottom: 50px;
}

.gallery-section6:last-child {
  margin-bottom: 0;
}

.section-header6 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #2764AE;
  position: relative;
}

.section-title6 {
  font-size: 1.8rem;
  color: #1E293B;
  font-weight: 700;
  margin: 0;
}

.section-count6 {
  background: #2764AE;
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin: 0;
}

.photo-container {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  aspect-ratio: 4/3;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.photo-container:hover {
  border-color: #2764AE;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.photo-container:hover .photo {
  transform: scale(1.05);
}

@media (max-width: 1200px) {
  .gallery {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  .section-title6 {
    font-size: 1.6rem;
  }
}

@media (max-width: 900px) {
  .gallery {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }

  .section-header6 {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .section-count6 {
    align-self: flex-start;
  }
}

@media (max-width: 768px) {
  .gallery-container {
    margin-top: 20px;
  }
}

@media (max-width: 600px) {
  .gallery-container {
    padding: 0 15px 40px;
    margin-top: 20px;
  }

  .gallery {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .section-title6 {
    font-size: 1.4rem;
  }
}

.gallery-section6::before {
  content: '';
  display: block;
  height: 1px;
  background: linear-gradient(90deg, transparent, #eee, transparent);
  margin: 30px 0;
}

.gallery-section6:first-child::before {
  display: none;
}
</style>