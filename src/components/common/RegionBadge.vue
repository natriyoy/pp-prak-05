<template>
  <span class="region-badge">
    <slot></slot>
  </span>
</template>

<style>
.region-badge {
  background: #2764AE;
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-block;
}

.region-badge:hover {
  background: #0F172A;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .region-badge:hover {
    background: #2764AE;
    transform: translateY(0px);
  }
}

@media (max-width: 400px) {
  .region-badge {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
}
</style>