<template>
  <div class="stat-item">
    <div class="stat-number">{{ value }}{{ suffix }}</div>
    <div class="stat-text">{{ label }}</div>
  </div>
</template>

<script setup>
defineProps({
  value: { type: [Number, String], required: true },
  label: { type: String, required: true },
  suffix: { type: String, default: '' }
})
</script>

<style>
.stat-item {
  text-align: center;
  flex: 1;
}

.stat-number {
  font-size: 2.2rem;
  font-weight: 700;
  color: #2764AE;
  line-height: 1;
  margin-bottom: 5px;
}

.stat-text {
  font-size: 0.9rem;
  color: #475569;
  font-weight: 500;
}

@media (max-width: 480px) {
  .stat-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    padding: 15px;
    background: rgba(39, 100, 174, 0.05);
    border-radius: 10px;
  }

  .stat-number {
    font-size: 1.6rem;
    margin-bottom: 0;
    margin-right: 15px;
  }

  .stat-text {
    font-size: 0.85rem;
    flex: 1;
  }
}
</style>