<template>
  <div class="quiz-page" v-if="loaded">
    <div class="quiz-box">
      <div class="stats">
        ⏱ Tempo rimasto: {{ timeLeft }}s • ✅ Corrette: {{ score }}/{{ questions.length }}
      </div>

<h2 class="question">{{ currentQuestion.question.toUpperCase() }}</h2>
      <ul class="options">
        <li
          v-for="(option, key) in currentOptions"
          :key="key"
          :class="{
            selected: selectedOption === key,
            correct: showFeedback && key === currentQuestion.correct_option,
            wrong: showFeedback && key === selectedOption && key !== currentQuestion.correct_option
          }"
          @click="selectOption(key)"
        >
            {{ option.toUpperCase() }}
        </li>
      </ul>

      <p v-if="feedback" class="feedback">{{ feedback }}</p>
    </div>
  </div>

  <div v-else class="loading">
    <p>Caricamento quiz...</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const questions = ref([])
const currentIndex = ref(0)
const selectedOption = ref(null)
const showFeedback = ref(false)
const feedback = ref('')
const loaded = ref(false)
const score = ref(0)
const timeLeft = ref(10)
let countdownTimer = null

const currentQuestion = computed(() => questions.value[currentIndex.value])
const currentOptions = computed(() => {
  if (!currentQuestion.value) return {}
  return {
    A: currentQuestion.value.option_a,
    B: currentQuestion.value.option_b,
    C: currentQuestion.value.option_c,
    D: currentQuestion.value.option_d
  }
})

const startQuestionTimer = () => {
  timeLeft.value = 10
  clearInterval(countdownTimer)
  countdownTimer = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      feedback.value = '⏰ Tempo scaduto!'
      gameOver(false)
    }
  }, 1000)
}

const selectOption = (key) => {
  if (showFeedback.value || timeLeft.value <= 0) return

  selectedOption.value = key
  showFeedback.value = true

  if (key === currentQuestion.value.correct_option) {
    score.value++
    feedback.value = '✅ Risposta corretta!'
    setTimeout(() => {
      nextQuestion()
    }, 1000)
  } else {
    feedback.value = '❌ Risposta sbagliata!'
    gameOver(false)
  }
}

const nextQuestion = () => {
  currentIndex.value++
  selectedOption.value = null
  showFeedback.value = false
  feedback.value = ''

  if (currentIndex.value >= questions.value.length) {
    gameOver(true)
  } else {
    startQuestionTimer()
  }
}

const gameOver = (won = false) => {
  clearInterval(countdownTimer)
  const user = JSON.parse(localStorage.getItem('user'))
  const username = user?.username || 'Giocatore'
  const userId = user?.id || null  // <-- aggiungi questa riga

  setTimeout(() => {
    router.push({
      path: '/result',
      query: {
        score: score.value,
        total: questions.value.length,
        won,
        username,
        userId   // <-- passa anche userId qui
      }
    })
  }, 1000)
}

onMounted(async () => {
  const res = await fetch('http://localhost:8000/api/quizzes')
  questions.value = await res.json()
  console.log("domande ricevute:", questions.value)
  loaded.value = true
  startQuestionTimer()
})

onUnmounted(() => {
  clearInterval(countdownTimer)
})
</script>

<style scoped>
/* SCHERMO INTERO */
.quiz-page {
  width: 100vw;
  height: 100vh;
  background-image: url('../assets/mare.jpg'); /* Cambia con immagine tua */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

/* CONTENITORE DOMANDE */
.quiz-box {
  background: rgba(0, 0, 0, 0.4);
  padding: 2rem;
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  text-align: center;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
}

/* STATS */
.stats {
  font-size: 0.9rem;
  margin-bottom: 1rem;
  color: #ddd;
}

/* DOMANDA */
.question {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-shadow: 1px 1px 4px black;
}

/* OPZIONI */
.options {
  list-style: none;
  padding: 0;
  margin: 0;
}
.options li {
  background: #f5f5f5;
  color: #333;
  padding: 12px 20px;
  margin: 10px 0;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.3s ease;
}
.options li:hover {
  background: #e0e0e0;
}
.options li.selected {
  border: 2px solid #007bff;
}
.options li.correct {
  background-color: #4caf50;
  color: white;
}
.options li.wrong {
  background-color: #f44336;
  color: white;
}

/* FEEDBACK */
.feedback {
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  text-shadow: 1px 1px 3px black;
}

/* CARICAMENTO */
.loading {
  width: 100vw;
  height: 100vh;
  background: #111;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
}

/* RESPONSIVE */
@media (max-width: 600px) {
  .quiz-box {
    padding: 1.5rem;
  }

  .question {
    font-size: 1.3rem;
  }

  .options li {
    font-size: 0.95rem;
    padding: 10px;
  }
}
</style>