<script setup>
import { useScrollReveal } from '@/composables/useScrollReveal'
useScrollReveal()

const services =

<template>
  <div class="service-card hover-lift reveal"
       v-for="(service, i) in services"
       :key="service.id"
       :class="`reveal-delay-${(i % 4) + 1}`">
    ...
  </div>
</template>

<style scoped>

</style>