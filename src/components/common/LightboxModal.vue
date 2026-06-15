<template>
  <div v-if="isOpen" class="lightbox-modal" @click="close">
    <div class="lightbox-content" @click.stop>
      <button class="lightbox-close" @click="close">&times;</button>
      <img :src="imageSrc" :alt="imageAlt" class="lightbox-image" />
      <div class="lightbox-nav">
        <button class="lightbox-prev" @click="prev">‹</button>
        <button class="lightbox-next" @click="next">›</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  imageSrc: { type: String, default: '' },
  imageAlt: { type: String, default: '' }
})

const emit = defineEmits(['close', 'prev', 'next'])

const close = () => emit('close')
const prev = () => emit('prev')
const next = () => emit('next')

watch(() => props.isOpen, (newVal) => {
  document.body.style.overflow = newVal ? 'hidden' : ''
})
</script>

<style>
.lightbox-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
}

.lightbox-image {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
}

.lightbox-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
}

.lightbox-prev, .lightbox-next {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.lightbox-prev:hover, .lightbox-next:hover {
  background: rgba(255, 255, 255, 0.4);
}
</style>