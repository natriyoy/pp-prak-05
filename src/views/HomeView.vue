<template>
  <HeroBanner />
  <OurServices />
  <Stages />
  <MiniCalculator />
  <ContactForm
      title="Подайте заявку"
      subtitle="Заполните форму и мы свяжемся с вами в течение 30 минут"
  />
</template>

<script setup>
import HeroBanner from '@/components/sections/HeroBanner.vue'
import OurServices from '@/components/sections/OurServices.vue'
import Stages from '@/components/sections/Stages.vue'
import MiniCalculator from '@/components/sections/MiniCalculator.vue'

import ContactForm from "@/components/forms/ContactForm.vue";
</script>