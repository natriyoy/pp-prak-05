<template>
  <button
      :class="['btn', `btn-${variant}`, { 'btn-block': block, 'btn-small': small }]"
      :type="type"
      @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  variant: { type: String, default: 'primary' },
  type: { type: String, default: 'button' },
  block: { type: Boolean, default: false },
  small: { type: Boolean, default: false }
})
defineEmits(['click'])
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  font-family: inherit;
  line-height: 1;
}

.btn-primary {
  background-color: #2764AE;
  color: white;
  border-color: #2764AE;
}

.btn-primary:hover {
  background-color: #1E3A8A;
  border-color: #1E3A8A;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(39, 100, 174, 0.3);
}

.btn-secondary {
  background-color: transparent;
  color: #2764AE;
  border-color: #2764AE;
}

.btn-secondary:hover {
  background-color: #2764AE;
  color: white;
  transform: translateY(-2px);
}

.btn-white {
  background-color: white;
  color: #2764AE;
  border-color: white;
}

.btn-white:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  background-color: #f8fafc;
  color: #1E3A8A;
}

.btn-outline-white {
  background-color: transparent;
  color: white;
  border-color: white;
}

.btn-outline-white:hover {
  background-color: white;
  color: #2764AE;
  transform: translateY(-2px);
}

.btn-block {
  width: 100%;
  display: flex;
}

.btn-small {
  padding: 10px 20px;
  font-size: 0.9rem;
}

/* Отключаем hover на мобильных */
@media (max-width: 768px) {
  .btn-primary:hover,
  .btn-secondary:hover,
  .btn-white:hover,
  .btn-outline-white:hover {
    transform: none;
    box-shadow: none;
  }
}
</style>