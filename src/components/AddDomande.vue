<template>
  <div class="add-question-page">
    <div class="form-box">
      <h2>➕ Aggiungi una nuova domanda</h2>

      <form @submit.prevent="submitQuestion">
        <label>
          Domanda:
          <input v-model="question" required />
        </label>

        <label>
          Risposta A:
          <input v-model="optionA" required />
        </label>
        <label>
          Risposta B:
          <input v-model="optionB" required />
        </label>
        <label>
          Risposta C:
          <input v-model="optionC" required />
        </label>
        <label>
          Risposta D:
          <input v-model="optionD" required />
        </label>

        <label>
          Risposta corretta:
          <select v-model="correctOption" required>
            <option disabled value="">Seleziona</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </label>

        <button class="my-btn-primary" type="submit"> Invia</button>
        <a href="#" @click.prevent="goHome" class="back-btn">🏠 Torna alla Home</a>        
        <p v-if="success" class="success-msg">Domanda inviata con successo!</p>
      </form>
    </div>
  </div>
</template>

<script setup>

import { useRouter } from 'vue-router'
const router = useRouter()

function goHome() {
  router.push('/')
}
import { ref } from 'vue'

const question = ref('')
const optionA = ref('')
const optionB = ref('')
const optionC = ref('')
const optionD = ref('')
const correctOption = ref('')
const success = ref(false)

const submitQuestion = async () => {
  const newQuestion = {
    question: question.value,
    option_a: optionA.value,
    option_b: optionB.value,
    option_c: optionC.value,
    option_d: optionD.value,
    correct_option: correctOption.value
  }

  try {
  const response = await fetch('http://localhost:8000/api/quizzes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newQuestion)
})

if (!response.ok) {
  const errorData = await response.json()
  alert('Errore: ' + (errorData.message || 'Errore durante l’invio della domanda.'))
  return
}

    // reset
    question.value = ''
    optionA.value = ''
    optionB.value = ''
    optionC.value = ''
    optionD.value = ''
    correctOption.value = ''
    success.value = true

    setTimeout(() => {
      success.value = false
    }, 3000)
  } catch (err) {
    alert('Errore durante l’invio della domanda.')
  }
}
</script>

<style scoped>
.add-question-page {
  min-height: 100vh;
  background-image: url('../assets/dorme.jpg'); /* Cambia con immagine tua */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 2rem;
}

.form-box {
  background: rgba(0, 0, 0, 0.5);
  padding: 2rem;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 0 15px black;
}

h2 {
  margin-bottom: 1rem;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  display: flex;
  flex-direction: column;
  font-weight: 500;
}

input,
select {
  margin-top: 4px;
  padding: 0.6rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
}

.my-btn-primary {
  margin-top: 1rem;
  padding: 0.6rem 1.4rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  background-color: #800020;
  color: #fae490;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.my-btn-primary:hover {
  background-color: #a00028;
}

.success-msg {
  margin-top: 1rem;
  color: #4caf50;
  font-weight: bold;
  text-align: center;
}
.back-btn {
  color: #fae490;
  text-decoration: none; /* se vuoi togliere la sottolineatura */
  cursor: pointer;
}
</style>