<template>
  <div class="section-header">
    <span class="section-subtitle">{{ subtitle }}</span>
    <h2 class="section-title">{{ title }}</h2>
    <p v-if="description" class="section-description22">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  subtitle: { type: String, default: '' },
  title: { type: String, required: true },
  description: { type: String, default: '' }
})
</script>

<style>
.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.section-title {
  font-size: 2.5rem;
  color: #1E293B;
  margin-bottom: 15px;
  line-height: 1.2;
  font-weight: 700;
}

.section-subtitle {
  font-size: 1rem;
  color: #2764AE;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 5px;
  padding: 6px 18px;
  background-color: rgba(39, 100, 174, 0.1);
  border-radius: 20px;
  display: inline-block;
}

.section-description22 {
  font-size: 1.1rem;
  color: #475569;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 0.9rem;
  }

  .section-description22 {
    font-size: 1rem;
  }
}
</style>