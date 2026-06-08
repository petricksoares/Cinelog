<template>
  <div>
    <Navbar />
    <div class="filmes-page">
      <div class="page-header">
        <h2>Minha Coleção</h2>
        <router-link to="/filmes/novo" class="btn-novo">+ Adicionar Filme</router-link>
      </div>

      <div class="filtros">
        <input
          v-model="busca"
          type="text"
          placeholder="Buscar filme..."
          class="input-busca"
        />
        <select v-model="categoriaSelecionada" class="select-categoria">
          <option value="">Todas as categorias</option>
          <option v-for="cat in filmesStore.categorias" :key="cat.id" :value="cat.id">
            {{ cat.nome }}
          </option>
        </select>
      </div>

      <div v-if="filmesStore.loading" class="loading">Carregando filmes...</div>

      <div v-else-if="filmesFiltrados.length === 0" class="empty">
        <p>Nenhum filme encontrado. Adicione um novo! 🎬</p>
      </div>

      <div v-else class="filmes-grid">
        <CardFilme
          v-for="filme in filmesFiltrados"
          :key="filme.id"
          :filme="filme"
          @editar="irParaEdicao"
          @deletar="deletarFilme"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import CardFilme from '../components/CardFilme.vue'
import { useFilmesStore } from '../stores/filmes'

const filmesStore = useFilmesStore()
const router = useRouter()

const busca = ref('')
const categoriaSelecionada = ref('')

onMounted(async () => {
  await filmesStore.buscarFilmes()
  await filmesStore.buscarCategorias()
})

const filmesFiltrados = computed(() => {
  return filmesStore.filmes.filter(filme => {
    const matchBusca = filme.titulo.toLowerCase().includes(busca.value.toLowerCase())
    const matchCategoria = categoriaSelecionada.value === '' || filme.categoria_id === categoriaSelecionada.value
    return matchBusca && matchCategoria
  })
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
.filmes-page {
  padding: 2rem 3rem;
  background: #0f0f1a;
  min-height: calc(100vh - 60px);
  color: white;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

h2 {
  margin: 0;
  font-size: 1.8rem;
}

.btn-novo {
  background: #e94560;
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.95rem;
  transition: background 0.2s;
}

.btn-novo:hover {
  background: #c73652;
}

.filtros {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.input-busca {
  flex: 1;
  padding: 0.7rem 1rem;
  background: #1a1a2e;
  border: 1px solid #0f3460;
  border-radius: 8px;
  color: white;
  font-size: 0.95rem;
}

.input-busca:focus {
  outline: none;
  border-color: #e94560;
}

.select-categoria {
  padding: 0.7rem 1rem;
  background: #1a1a2e;
  border: 1px solid #0f3460;
  border-radius: 8px;
  color: white;
  font-size: 0.95rem;
  cursor: pointer;
  min-width: 200px;
}

.select-categoria:focus {
  outline: none;
  border-color: #e94560;
}

.filmes-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.loading, .empty {
  text-align: center;
  color: #aaa;
  padding: 3rem;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .filmes-page {
    padding: 1rem;
  }

  .filtros {
    flex-direction: column;
  }

  .select-categoria {
    width: 100%;
  }

  .filmes-grid {
    grid-template-columns: repeat(1, 1fr);
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>