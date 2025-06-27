<template>
  <div class="login-page">
    <div class="login-box">
      <h2 class="title">🔒 Login</h2>
      <form @submit.prevent="login" novalidate>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model="form.email"
            type="email"
            id="email"
            placeholder="Inserisci la tua email"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="form.password"
            type="password"
            id="password"
            placeholder="Inserisci la tua password"
            required
          />
        </div>

        <button type="submit" class="my-btn-primary">
          Accedi
        </button>
      </form>

      <div class="register-link">
        <router-link to="/register">
          Non hai un account? <strong>Registrati</strong>
        </router-link>
      </div>

      <div v-if="error" class="alert error">
        {{ error }}
      </div>

      <div v-if="success" class="alert success">
        {{ success }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      error: '',
      success: '',
    };
  },
  methods: {
    async login() {
      this.error = '';
      this.success = '';
      try {
        const response = await fetch('http://localhost:8000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.form),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('user', JSON.stringify(data.user));
          this.success = 'Accesso riuscito! Reindirizzamento in corso...';
          setTimeout(() => {
            this.$router.push('/');
          }, 1500);
        } else {
          this.error = data.error || 'Credenziali non valide';
        }
      } catch (err) {
        this.error = 'Errore di connessione al server';
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  width: 100vw;
  height: 100vh;
  background-image: url('../assets/ermes5.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  background: rgba(0, 0, 0, 0.5);
  padding: 2rem 2.5rem;
  border-radius: 16px;
  max-width: 400px;
  width: 90%;
  color: white;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.6);
}

.title {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #ffd700;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.3rem;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 8px;
  border: none;
  outline: none;
}

input::placeholder {
  color: #aaa;
}

.my-btn-primary {
  margin-top: 1rem;
  padding: 0.6rem 1.4rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  background-color: #800020;
  color: white;
  cursor: pointer;
  width: 100%;
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

.register-link {
  text-align: center;
  margin-top: 1rem;
}

.register-link a {
  color: #ffd700;
  text-decoration: none;
}

.alert {
  margin-top: 1rem;
  padding: 0.6rem;
  border-radius: 8px;
  text-align: center;
}

.alert.error {
  background-color: rgba(255, 0, 0, 0.3);
  color: #ff4d4d;
}

.alert.success {
  background-color: rgba(0, 128, 0, 0.3);
  color: #00e600;
}

/* Responsive */
@media (max-width: 400px) {
  .login-box {
    padding: 1.5rem;
  }
}
</style>