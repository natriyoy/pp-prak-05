<template>
  <div v-if="isVisible" :class="['toast', `toast-${type}`]">
    <span class="toast-icon">{{ icon }}</span>
    <span class="toast-message">{{ message }}</span>
    <button class="toast-close" @click="close">&times;</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  message: { type: String, required: true },
  type: { type: String, default: 'success' },
  duration: { type: Number, default: 3000 }
})

const emit = defineEmits(['close'])

const isVisible = ref(true)

const iconMap = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: ''
}

const icon = iconMap[props.type] || 'ℹ'

const close = () => {
  isVisible.value = false
  emit('close')
}

onMounted(() => {
  setTimeout(close, props.duration)
})
</script>

<style>
.toast {
  position: fixed;
  bottom: 30px;
  right: 30px;
  padding: 16px 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  z-index: 3000;
  animation: slideIn 0.3s ease;
  max-width: 400px;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.toast-success {
  background: #10b981;
  color: white;
}

.toast-error {
  background: #ef4444;
  color: white;
}

.toast-warning {
  background: #f59e0b;
  color: white;
}

.toast-info {
  background: #2764AE;
  color: white;
}

.toast-icon {
  font-size: 1.2rem;
  font-weight: bold;
}

.toast-message {
  flex: 1;
  font-size: 0.95rem;
}

.toast-close {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0.8;
}

.toast-close:hover {
  opacity: 1;
}

@media (max-width: 480px) {
  .toast {
    bottom: 20px;
    right: 20px;
    left: 20px;
    max-width: none;
  }
}
</style>