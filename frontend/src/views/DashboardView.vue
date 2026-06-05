<template>
  <div>
    <Navbar />
    <div class="dashboard">
      <h2>Bem-vindo, {{ authStore.user?.user_metadata?.nome || authStore.user?.email?.split('@')[0] || 'Usuário' }}!</h2>
      <p class="subtitle">Aqui está um resumo da sua coleção</p>

      <div class="cards-stats">
        <div class="stat-card">
          <span class="stat-icon">🎬</span>
          <span class="stat-numero">{{ filmesStore.filmes.length }}</span>
          <span class="stat-label">Total de Filmes</span>
        </div>
        <div class="stat-card">
          <span class="stat-icon">⭐</span>
          <span class="stat-numero">{{ mediaNotas }}</span>
          <span class="stat-label">Média de Notas</span>
        </div>
        <div class="stat-card">
          <span class="stat-icon">🏆</span>
          <span class="stat-numero">{{ melhorFilme }}</span>
          <span class="stat-label">Melhor Avaliado</span>
        </div>
        <div class="stat-card">
          <span class="stat-icon">🎭</span>
          <span class="stat-numero">{{ filmesStore.categorias.length }}</span>
          <span class="stat-label">Categorias</span>
        </div>
      </div>

      <div class="recentes">
        <h3>Filmes Recentes</h3>
        <div class="filmes-grid">
          <CardFilme
            v-for="filme in filmesRecentes"
            :key="filme.id"
            :filme="filme"
            @editar="irParaEdicao"
            @deletar="deletarFilme"
          />
        </div>
        <router-link to="/filmes" class="btn-ver-todos">Ver todos os filmes →</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import CardFilme from '../components/CardFilme.vue'
import { useAuthStore } from '../stores/auth'
import { useFilmesStore } from '../stores/filmes'

const authStore = useAuthStore()
const filmesStore = useFilmesStore()
const router = useRouter()

onMounted(async () => {
  await filmesStore.buscarFilmes()
  await filmesStore.buscarCategorias()
})

const filmesRecentes = computed(() => filmesStore.filmes.slice(0, 4))

const mediaNotas = computed(() => {
  if (filmesStore.filmes.length === 0) return '0.0'
  const soma = filmesStore.filmes.reduce((acc, f) => acc + (f.nota || 0), 0)
  return (soma / filmesStore.filmes.length).toFixed(1)
})

const melhorFilme = computed(() => {
  if (filmesStore.filmes.length === 0) return 'Nenhum'
  const melhor = filmesStore.filmes.reduce((a, b) => (a.nota > b.nota ? a : b))
  return melhor.titulo.length > 12 ? melhor.titulo.substring(0, 12) + '...' : melhor.titulo
})

const irParaEdicao = (filme) => {
  router.push(`/filmes/editar/${filme.id}`)
}

const deletarFilme = async (id) => {
  if (confirm('Tem certeza que deseja excluir este filme?')) {
    await filmesStore.deletarFilme(id)
  }
}
</script>

<style scoped>
.dashboard {
  padding: 2rem 3rem;
  background: #0f0f1a;
  min-height: calc(100vh - 60px);
  color: white;
}

h2 {
  font-size: 1.8rem;
  margin: 0;
}

.subtitle {
  color: #aaa;
  margin: 0.3rem 0 2rem;
}

.cards-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.stat-card {
  background: #1a1a2e;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.stat-icon {
  font-size: 2rem;
}

.stat-numero {
  font-size: 1.8rem;
  font-weight: bold;
  color: #e94560;
}

.stat-label {
  color: #aaa;
  font-size: 0.85rem;
}

.recentes h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
}

.filmes-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.btn-ver-todos {
  color: #e94560;
  text-decoration: none;
  font-size: 0.95rem;
}

.btn-ver-todos:hover {
  text-decoration: underline;
}
</style>