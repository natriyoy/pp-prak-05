<template>
  <span :class="['badge', `badge-${variant}`]">
    <slot></slot>
  </span>
</template>

<script setup>
defineProps({
  variant: { type: String, default: 'primary' }
})
</script>

<style>
.badge {
  display: inline-block;
  padding: 6px 18px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-primary {
  background-color: rgba(39, 100, 174, 0.1);
  color: #2764AE;
}

.badge-white {
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);
}

.badge-dark {
  background-color: #1E293B;
  color: #2764AE;
}
</style>