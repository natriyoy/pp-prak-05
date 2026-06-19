<template>

  <div class="calculator-page">
    <div class="container">
      <PageChapter
          subtitle="Онлайн калькулятор"
          title="Рассчитайте стоимость скважины"
          description="Предварительный расчет стоимости бурения скважины на вашем участке"
      />

      <PriceCalculator />
    </div>

    <ContactForm
        title="Подайте заявку"
        subtitle="Заполните форму и мы свяжемся с вами в течение 30 минут"
    />
  </div>
</template>

<script setup>
import PageChapter from '../components/sections/PageChapter.vue'
import PriceCalculator from '../components/calculator/PriceCalculator.vue'
import ContactForm from '../components/forms/ContactForm.vue'


</script>

<style>
.calculator-page {
  padding: 20px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>