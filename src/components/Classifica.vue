<template>
  <div class="leaderboard-page" v-if="loaded">
    <h2>🏆 Classifica Utenti</h2>
    <ul>
      <li v-for="(user, index) in leaderboard" :key="user.id">
        <span>{{ index + 1 }}.</span>
        <strong>{{ user.username }}</strong> – {{ user.punteggio }} punti
      </li>
    </ul>
    <button @click="goHome" class="back-btn">🏠 Torna alla Home</button>
  </div>
  <div v-else>
    <p>Caricamento classifica...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const leaderboard = ref([])
const loaded = ref(false)

// Usa Number() per essere più sicuro di convertire
const userId = Number(route.query.userId)
const newScore = Number(route.query.score)

console.log('Ricevuto da query:', { userId, newScore })

async function aggiornaPunteggio(userId, score) {
  try {
    const res = await fetch(`http://localhost:8000/score/update/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score }),
    })
    const data = await res.json()
    console.log('Risposta update:', data)
  } catch (error) {
    console.error('Errore aggiornamento punteggio:', error)
  }
}

async function caricaClassifica() {
  try {
    const res = await fetch('http://localhost:8000/api/leaderboard')
    const data = await res.json()
    leaderboard.value = data
    console.log('Classifica caricata:', data)
  } catch (error) {
    console.error('Errore caricamento classifica:', error)
  }
}

onMounted(async () => {
  loaded.value = false

  console.log('📥 Valori letti da query:', { userId, newScore })

  if (!isNaN(userId) && !isNaN(newScore) && newScore >= 0) {
    console.log('✅ Parametri validi, aggiorno punteggio...')
    await aggiornaPunteggio(userId, newScore)
  } else {
    console.warn('⚠️ Parametri non validi, salto aggiornamento punteggio')
  }

  await caricaClassifica()
  loaded.value = true
})

function goHome() {
  router.push('/')
}
</script>
<style scoped>
.leaderboard-page {
  width: 100vw;
  min-height: 100vh;
  padding: 2rem;
  color: black;
  background-image: url('../assets/vesuvio.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

ul {
  list-style: none;
  padding: 1rem;
  margin: 1rem 0;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
}

li {
  font-size: 1.2rem;
  margin: 0.5rem 0;
  color: #333;
}

.back-btn {
  color: #fae490;
  font-weight: bold;
  margin-top: 1rem;
  background: none;
  border: none;
  cursor: pointer;
}
</style>