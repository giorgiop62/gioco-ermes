<template>
  <div class="container">
    <h2>{{ currentQuestion.question }}</h2>
    <ul>
      <li
        v-for="(text, key) in options"
        :key="key"
        :class="{
          correct: showFeedback && correctOptions.includes(key),
          wrong: showFeedback && selectedOptions.includes(key) && !correctOptions.includes(key)
        }"
        @click="selectOption(key)"
      >
        {{ text }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'  // <- IMPORTARE computed!

const emit = defineEmits(['score', 'gameOver'])

const questions = [
  {
    question: 'Che razza è Ermes?',
    options: {
      A: 'Labrador',
      B: 'Meticcio',
      C: 'Barboncino',
      D: 'Pastore tedesco'
    },
    correctOptions: ['B']
  },
  {
    question: 'Cosa adora fare Ermes?',
    options: {
      A: 'Nuotare',
      B: 'Mangiare',
      C: 'Correre nei boschi',
      D: 'Dormire sul divano'
    },
    correctOptions: ['C', 'D']
  }
]

const currentIndex = ref(0)
const selectedOptions = ref([])
const showFeedback = ref(false)
const score = ref(0)

const currentQuestion = computed(() => questions[currentIndex.value])
const options = computed(() => currentQuestion.value.options)
const correctOptions = computed(() => currentQuestion.value.correctOptions)

function selectOption(key) {
  if (showFeedback.value) return
  selectedOptions.value.push(key)

  const allCorrectSelected = correctOptions.value.every(opt => selectedOptions.value.includes(opt))
  const anyWrongSelected = selectedOptions.value.some(opt => !correctOptions.value.includes(opt))

  if (anyWrongSelected) {
    showFeedback.value = true
    setTimeout(() => {
      emit('score', score.value)
      emit('gameOver')
    }, 800)
  } else if (allCorrectSelected) {
    score.value++
    showFeedback.value = true
    setTimeout(() => {
      selectedOptions.value = []
      showFeedback.value = false
      if (currentIndex.value < questions.length - 1) {
        currentIndex.value++
      } else {
        emit('score', score.value)
        emit('gameOver')
      }
    }, 800)
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  background: #fff;
  border-radius: 8px;
  text-align: center;
  user-select: none;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  background: #eee;
  margin: 0.5rem 0;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}
li:hover {
  background: #ddd;
}
.correct {
  background-color: #c6f6d5 !important;
}
.wrong {
  background-color: #feb2b2 !important;
}
</style>