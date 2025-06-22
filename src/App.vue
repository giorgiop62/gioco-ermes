<template>
  <UserRegister v-if="!user" @registered="onRegistered" />

  <Home v-else-if="!gameStarted" @start="startGame" />

  <Questions
    v-else-if="gameStarted && !gameOver"
    @score="updateScore"
    @gameOver="onGameOver"
  />

  <GameResult
    v-else
    :score="score"
    :total="totalQuestions"
    :won="won"
    @restart="restartGame"
  />
</template>

<script setup>
import { ref } from 'vue'
import UserRegister from './components/UserRegister.vue'
import Home from './views/Home.vue'
import Questions from './components/Question.vue'
import GameResult from './components/GameResult.vue'

const user = ref(null)
const gameStarted = ref(false)
const score = ref(0)
const totalQuestions = 2
const gameOver = ref(false)
const won = ref(false)

function onRegistered(username) {
  user.value = username
  gameStarted.value = false
  gameOver.value = false
}

function startGame() {
  gameStarted.value = true
  gameOver.value = false
  score.value = 0
}

function updateScore(newScore) {
  score.value = newScore
}

function onGameOver() {
  gameOver.value = true
  won.value = score.value === totalQuestions
  saveScore()
}

function saveScore() {
  const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]')
  const existing = leaderboard.find(e => e.username === user.value)
  if (existing) {
    if (score.value > existing.score) existing.score = score.value
  } else {
    leaderboard.push({ username: user.value, score: score.value })
  }
  leaderboard.sort((a, b) => b.score - a.score)
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard))
}

function restartGame() {
  gameStarted.value = false
  gameOver.value = false
  score.value = 0
  won.value = false
}
</script>