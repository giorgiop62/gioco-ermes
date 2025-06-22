<template>
  <div class="container">
    <h2 v-if="won">🎉 Hai vinto!</h2>
    <h2 v-else>❌ Hai perso!</h2>

    <p>Punteggio: {{ score }} su {{ total }}</p>

    <div class="leaderboard">
      <h3>Classifica</h3>
      <ol>
        <li v-for="entry in leaderboard" :key="entry.username">
          {{ entry.username }} - {{ entry.score }} punti
        </li>
      </ol>
    </div>

    <button @click="$emit('restart')">Gioca di nuovo</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  score: Number,
  total: Number,
  won: Boolean
})

const emit = defineEmits(['restart'])
const leaderboard = ref([])

onMounted(() => {
  leaderboard.value = JSON.parse(localStorage.getItem('leaderboard') || '[]')
})
</script>

<style scoped>
.container {
  margin: 2rem auto;
  text-align: center;
  background-image: url('../assets/ermes2.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  height: 100vh;

}
.leaderboard {
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 8px;
  text-align: left;
}
ol {
  padding-left: 1.5rem;
    list-style-type: none;
}
button {
  margin-top: 1.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style>