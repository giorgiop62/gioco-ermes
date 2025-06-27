<template>
  <div class="endgame-page">
    <div class="endgame-box">
      <h2 v-if="won">🎉 Hai vinto, {{ capitalizedUsername }}!</h2>
      <h2 v-else>❌ {{ capitalizedUsername }}, ritenta la prossima volta!</h2>

      <p class="score">Punteggio: {{ score }} su {{ total }}</p>

      <button class="my-btn-primary" @click="restart">🔁 Gioca di nuovo</button>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'

const route = useRoute()
const router = useRouter()

const score = parseInt(route.query.score) || 0
const total = parseInt(route.query.total) || 0
const won = route.query.won === 'true'
const username = route.query.username || 'Giocatore'
const userId = parseInt(route.query.userId) || null

const capitalizedUsername = computed(() => {
  return username.charAt(0).toUpperCase() + username.slice(1)
})

const erroreSalvataggio = ref(false)

onMounted(async () => {
  if (userId) {
    try {
      const res = await fetch(`http://localhost:8000/score/update/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score }),
      })
      if (!res.ok) throw new Error('Errore salvataggio punteggio')
    } catch (e) {
      console.error(e)
      erroreSalvataggio.value = true
    }
  }

  // Dopo aver salvato, faccio redirect automatico verso la classifica
  if (userId && userId > 0) {
  router.push({
    path: '/classifica',
    query: { userId, score }
  })
} else {
  console.warn('userId non valido:', userId)
  // Puoi fare un redirect normale o mostrare un errore
  router.push('/classifica')
}
})

const restart = () => {
  router.push('/')
}
</script>

<style scoped>
/* Qui puoi mantenere lo stile già presente che va bene */
.endgame-page {
  width: 100vw;
  height: 100vh;
  background-image: url('../assets/car.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.endgame-box {
  background: rgba(0, 0, 0, 0.4);
  padding: 2rem 2.5rem;
  border-radius: 16px;
  max-width: 600px;
  width: 90%;
  text-align: center;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.6);
}

.score {
  font-size: 1.2rem;
  margin: 1rem 0;
  text-shadow: 1px 1px 3px black;
}

.my-btn-primary {
  margin-top: 2rem;
  padding: 0.6rem 1.4rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  background-color: #800020;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;
}

.my-btn-primary:hover {
  background-color: #a00028;
  transform: scale(1.03);
}

.my-btn-primary:active {
  background-color: #660019;
  transform: scale(0.97);
}

@media (max-width: 600px) {
  .endgame-box {
    padding: 1.5rem;
  }
  .my-btn-primary {
    font-size: 1rem;
    width: 100%;
  }
}
</style>