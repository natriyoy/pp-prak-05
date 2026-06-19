<template>
  <div v-if="visible" class="modal-overlay" @click.self="$emit('cancel')">
    <div class="modal-box">
      <p class="modal-text">{{ text }}</p>
      <div class="modal-actions">
        <button class="btn-cancel" @click="$emit('cancel')">Отмена</button>
        <button class="btn-confirm" @click="$emit('confirm')">Да, в архив</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  visible: Boolean,
  text: { type: String, default: 'Вы уверены?' }
})
defineEmits(['confirm', 'cancel'])
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-box {
  background: white;
  border-radius: 14px;
  padding: 28px;
  max-width: 360px;
  width: 100%;
  text-align: center;
}

.modal-text {
  font-size: 15px;
  color: var(--zag, #1E293B);
  margin-bottom: 20px;
  font-weight: 600;
}

.modal-actions {
  display: flex;
  gap: 10px;
}

.btn-cancel, .btn-confirm {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  border: none;
}

.btn-cancel {
  background: #F1F5F9;
  color: var(--tex, #475569);
}

.btn-confirm {
  background: var(--lazur, #2764AE);
  color: white;
}
</style>