<template>
  <div class="register">
    <h2>Registrati per giocare</h2>
    <input v-model="username" placeholder="Inserisci il tuo nome" />
    <button @click="register" :disabled="!username.trim()">Registrati</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['registered'])
const username = ref('')

function register() {
  if (username.value.trim()) {
    emit('registered', username.value.trim())
  }
}
</script>

<style scoped>
.register {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
input {
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
  width: 200px;
}
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>