import { createRouter, createWebHistory } from 'vue-router'
import UserRegister from '../components/UserRegister.vue'
import Home from '../views/Home.vue'
import Questions from '../components/Question.vue'
import GameResult from '../components/GameResult.vue'
import UserLogin from '../components/UserLogin.vue'
import AddDomande from '../components/AddDomande.vue'
import Classifica from '../components/Classifica.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/register', name: 'Register', component: UserRegister },
  { path: '/quiz', name: 'Quiz', component: Questions },
  { path: '/result', name: 'Result', component: GameResult },
  { path: '/login', component: UserLogin },
  { path: '/add', component: AddDomande },
  { path: '/classifica', component: Classifica },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router