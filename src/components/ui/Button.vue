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

<style>
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
}

.btn-primary {
  background-color: #2764AE;
  color: white;
  border-color: #2764AE;
}

.btn-primary:hover {
  background-color: transparent;
  color: #2764AE;
}

.btn-secondary {
  background-color: transparent;
  color: #2764AE;
  border-color: #2764AE;
}

.btn-secondary:hover {
  background-color: #2764AE;
  color: white;
}

.btn-white {
  background-color: white;
  color: #2764AE;
  border-color: white;
}

.btn-white:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.btn-outline-white {
  background-color: transparent;
  color: white;
  border-color: white;
}

.btn-outline-white:hover {
  background-color: white;
  color: #2764AE;
}

.btn-block {
  width: 100%;
}

.btn-small {
  padding: 10px 20px;
  font-size: 0.9rem;
}
</style>