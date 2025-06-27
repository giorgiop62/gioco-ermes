<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AddDomande from '../components/AddDomande.vue'

const user = ref(null)
const showMenu = ref(false)
const router = useRouter()

onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
  } else {
    router.push('/register')
  }
})

function startGame() {
  router.push('/quiz')
}

function goToLeaderboard() {
  router.push('/leaderboard')
}

function logout() {
  localStorage.removeItem('user')
  router.push('/register')
}
function goToAddDomande() {
  router.push('/add')
}
function goToClassifica() {
  router.push('/classifica')
}
</script>

<template>
  <div class="home">
    <!-- NAVBAR -->
    <nav class="navbar">
      <div class="nav-left">
        <img src="../assets/logo.png" alt="Logo" class="logo" />
      </div>

      <div class="nav-toggle" @click="showMenu = !showMenu">
        <span class="burger"></span>
        <span class="burger"></span>
        <span class="burger"></span>
      </div>

      <ul :class="['nav-links', { show: showMenu }]">
        <li><button @click="goToClassifica">Classifica</button></li>
        <li><button @click="goToAddDomande">Aggiungi le tue domande</button></li>
        <li><button @click="logout">Logout</button></li>
      </ul>
    </nav>

    <!-- CONTENUTO CENTRALE -->
    <main>
      <h1 v-if="user">Ciao {{ user.first_name.toUpperCase() }}!</h1>
      <h2>🐶 Quanto conosci Ermes?</h2>
      <p>Sei pronto ad iniziare il gioco?</p>
      <button class="my-btn-primary" @click="startGame">Inizia il quiz</button>
    </main>
  </div>
</template>

<style scoped>
/* RESET */
:global(html, body) {
  margin: 0;
  padding: 0;
  height: 100%;
}

/* LAYOUT GENERALE */
.home {
  width: 100vw;
  height: 100vh;
  background-image: url('../assets/home.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  color: white;
}

.my-btn-primary {
  padding: 0.5rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  background-color: #9a2a24; /* bordò */
  color: #fae490;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;
}

.btn-primary:hover {
  background-color: #a00028; /* tono più chiaro al passaggio */
  transform: scale(1.03);
}

.btn-primary:active {
  background-color: #660019; /* più scuro alla pressione */
  transform: scale(0.98);
}

/* NAVBAR */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0);
  padding: 1rem 2rem;
  position: relative;
  padding-bottom: 20px;
}

.logo {
  height: 50px;
}

/* BURGER MENU */
.nav-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 4px;
}

.burger {
  width: 25px;
  height: 3px;
  background-color: white;
}

/* NAV LINKS */
.nav-links {
  list-style: none;
  display: flex;
  gap: 1rem;
}

.nav-links li button {
  background: none;
  border: none;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
}

.nav-links li button:hover {
  text-decoration: underline;
}

/* CONTENUTO CENTRALE */
main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  padding-bottom: 5rem;
  text-align: center;
}

main h1, main h2, main p {
  text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.7);
}

.btn-primary {
  padding: 12px 24px;
  font-size: 1.2rem;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .nav-toggle {
    display: flex;
  }

  .nav-links {
    flex-direction: column;
    position: absolute;
    top: 100%;
    right: 0;
    background: rgba(0, 0, 0, 0.85);
    width: 100%;
    display: none;
    padding: 1rem;
    text-align: right;
  }

  .nav-links.show {
    display: flex;
  }

  .nav-links li {
    margin-bottom: 1rem;
  }
}
</style>