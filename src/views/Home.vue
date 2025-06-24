<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const user = ref(null)
const router = useRouter()

onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
  } else {
    router.push('/register') // se non registrato, redirect
  }
})

function startGame() {
  router.push('/quiz')
}
</script>

<template>
  <div class="home">
    <h1>🐶 Quanto conosci il mio Ermes?</h1>
    <h2 v-if="user">Benvenuto {{ user.first_name }}!</h2>
    <p>Sei pronto ad iniziare il gioco?</p>
    <button @click="startGame">Inizia il quiz</button>
  </div>
</template>