<template>
  <div class="container mt-5" style="max-width: 420px;">
    <div class="card shadow-sm">
      <div class="card-body">
        <h2 class="card-title mb-4 text-center text-primary">Login</h2>
        <form @submit.prevent="login" novalidate>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              v-model="form.email"
              type="email"
              id="email"
              class="form-control"
              placeholder="Inserisci la tua email"
              required
            />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              v-model="form.password"
              type="password"
              id="password"
              class="form-control"
              placeholder="Inserisci la tua password"
              required
            />
          </div>

          <button type="submit" class="btn btn-primary w-100">
            Accedi
          </button>
        </form>

        <div class="text-center mt-3">
          <router-link to="/register" class="text-decoration-none">
            Non hai un account? <strong>Registrati</strong>
          </router-link>
        </div>

        <div v-if="error" class="alert alert-danger mt-3" role="alert">
          {{ error }}
        </div>

        <div v-if="success" class="alert alert-success mt-3" role="alert">
          {{ success }}
        </div>
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
body {
  background-color: #f8f9fa;
}
</style>