<template>
  <div class="home">
    <h1>🐶 Quanto conosci il mio Ermes?</h1>
    <button @click="$emit('start')">Inizia il quiz</button>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url('/src/assets/ermes.jpg');
  background-size: cover;
  background-position: center;
  color: white;
}
button {
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
}
</style>