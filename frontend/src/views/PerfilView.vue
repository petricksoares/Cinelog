<template>
  <div>
    <Navbar />
    <div class="perfil-page">
      <div class="perfil-box">
        <div class="perfil-header">
          <div class="avatar">{{ iniciais }}</div>
          <div>
            <h2>{{ authStore.user?.user_metadata?.nome || 'Usuário' }}</h2>
            <p>{{ authStore.user?.email }}</p>
          </div>
        </div>

        <div class="perfil-stats">
          <div class="stat">
            <span class="stat-numero">{{ filmesStore.filmes.length }}</span>
            <span class="stat-label">Filmes cadastrados</span>
          </div>
          <div class="stat">
            <span class="stat-numero">{{ mediaNotas }}</span>
            <span class="stat-label">Média das notas</span>
          </div>
          <div class="stat">
            <span class="stat-numero">{{ melhorGenero }}</span>
            <span class="stat-label">Gênero mais visto</span>
          </div>
        </div>

        <div class="perfil-info">
          <h3>Informações da conta</h3>
          <div class="info-item">
            <span class="info-label">Email</span>
            <span class="info-valor">{{ authStore.user?.email }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Membro desde</span>
            <span class="info-valor">{{ dataCadastro }}</span>
          </div>
        </div>

        <button @click="handleLogout" class="btn-logout">Sair da conta</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import { useAuthStore } from '../stores/auth'
import { useFilmesStore } from '../stores/filmes'

const authStore = useAuthStore()
const filmesStore = useFilmesStore()
const router = useRouter()

onMounted(async () => {
  await filmesStore.buscarFilmes()
})

const iniciais = computed(() => {
  const nome = authStore.user?.user_metadata?.nome || authStore.user?.email || 'U'
  return nome.substring(0, 2).toUpperCase()
})

const mediaNotas = computed(() => {
  if (filmesStore.filmes.length === 0) return '0.0'
  const soma = filmesStore.filmes.reduce((acc, f) => acc + (f.nota || 0), 0)
  return (soma / filmesStore.filmes.length).toFixed(1)
})

const melhorGenero = computed(() => {
  if (filmesStore.filmes.length === 0) return 'Nenhum'
  const contagem = {}
  filmesStore.filmes.forEach(f => {
    const cat = f.categorias?.nome || 'Sem categoria'
    contagem[cat] = (contagem[cat] || 0) + 1
  })
  return Object.entries(contagem).sort((a, b) => b[1] - a[1])[0][0]
})

const dataCadastro = computed(() => {
  const data = authStore.user?.created_at
  if (!data) return 'N/A'
  return new Date(data).toLocaleDateString('pt-BR')
})

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.perfil-page {
  padding: 2rem;
  background: #0f0f1a;
  min-height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
}

.perfil-box {
  background: #1a1a2e;
  padding: 2rem;
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  height: fit-content;
}

.perfil-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.avatar {
  width: 70px;
  height: 70px;
  background: #e94560;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

.perfil-header h2 {
  color: white;
  margin: 0;
}

.perfil-header p {
  color: #aaa;
  margin: 0.3rem 0 0;
}

.perfil-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat {
  background: #0f3460;
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
}

.stat-numero {
  font-size: 1.5rem;
  font-weight: bold;
  color: #e94560;
}

.stat-label {
  color: #aaa;
  font-size: 0.8rem;
  text-align: center;
}

.perfil-info {
  margin-bottom: 2rem;
}

.perfil-info h3 {
  color: white;
  margin: 0 0 1rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 0;
  border-bottom: 1px solid #0f3460;
}

.info-label {
  color: #aaa;
}

.info-valor {
  color: white;
}

.btn-logout {
  width: 100%;
  padding: 0.8rem;
  background: #e94560;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background 0.2s;
}

.btn-logout:hover {
  background: #c73652;
}
</style>