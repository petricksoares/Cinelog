<template>
  <nav class="navbar">
    <div class="navbar-brand">
      🎬 CineLog
    </div>
    <div class="navbar-menu">
      <router-link to="/dashboard">Início</router-link>
      <router-link to="/filmes">Filmes</router-link>
      <router-link to="/perfil">Perfil</router-link>
      <button @click="handleLogout" class="btn-logout">Sair</button>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1a1a2e;
  padding: 1rem 3rem;
  color: white;
  width: 100%;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: #e94560;
}

.navbar-menu {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.navbar-menu a {
  color: white;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s;
}

.navbar-menu a:hover,
.navbar-menu a.router-link-active {
  color: #e94560;
}

.btn-logout {
  background: #e94560;
  color: white;
  border: none;
  padding: 0.4rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.btn-logout:hover {
  background: #c73652;
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .navbar-brand {
    font-size: 1.7rem;
  }

  .navbar-menu {
    width: 100%;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .btn-logout {
    padding: 0.5rem 1rem;
  }
}
</style>