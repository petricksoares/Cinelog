<template>
  <div>
    <Navbar />
    <div class="form-page">
      <div class="form-box">
        <h2>{{ isEdicao ? '✏️ Editar Filme' : '🎬 Novo Filme' }}</h2>

        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Título *</label>
            <input v-model="form.titulo" type="text" placeholder="Nome do filme" required />
          </div>

          <div class="form-group">
            <label>Crítica / Review</label>
            <textarea v-model="form.sinopse" placeholder="Escreva sua crítica ou review do filme..." rows="4"></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Ano</label>
              <input v-model="form.ano" type="number" placeholder="2024" min="1900" max="2100" />
            </div>
            <div class="form-group">
              <label>Nota (0-10)</label>
              <input v-model="form.nota" type="number" placeholder="8.5" min="0" max="10" step="0.1" />
            </div>
          </div>

          <div class="form-group">
            <label>Categoria</label>
            <select v-model="form.categoria_id">
              <option value="">Selecione uma categoria</option>
              <option v-for="cat in filmesStore.categorias" :key="cat.id" :value="cat.id">
                {{ cat.nome }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>URL do Poster</label>
            <input v-model="form.poster_url" type="url" placeholder="https://..." />
          </div>

          <div v-if="form.poster_url" class="poster-preview">
            <img :src="form.poster_url" alt="Preview do poster" />
          </div>

          <p v-if="erro" class="erro">{{ erro }}</p>

          <div class="form-acoes">
            <button type="button" @click="$router.back()" class="btn-cancelar">Cancelar</button>
            <button type="submit" class="btn-salvar" :disabled="loading">
              {{ loading ? 'Salvando...' : 'Salvar Filme' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import { useFilmesStore } from '../stores/filmes'
import api from '../services/api'

const router = useRouter()
const route = useRoute()
const filmesStore = useFilmesStore()

const loading = ref(false)
const erro = ref('')

const form = ref({
  titulo: '',
  sinopse: '',
  ano: '',
  nota: '',
  categoria_id: '',
  poster_url: ''
})

const isEdicao = computed(() => !!route.params.id)

onMounted(async () => {
  await filmesStore.buscarCategorias()

  if (isEdicao.value) {
    try {
      const response = await api.get(`/filmes/${route.params.id}`)
      const filme = response.data
      form.value = {
        titulo: filme.titulo || '',
        sinopse: filme.sinopse || '',
        ano: filme.ano || '',
        nota: filme.nota || '',
        categoria_id: filme.categoria_id || '',
        poster_url: filme.poster_url || ''
      }
    } catch (error) {
      erro.value = 'Erro ao carregar filme.'
    }
  }
})

const handleSubmit = async () => {
  erro.value = ''
  loading.value = true

  try {
    if (isEdicao.value) {
      await filmesStore.atualizarFilme(route.params.id, form.value)
    } else {
      await filmesStore.criarFilme(form.value)
    }
    router.push('/filmes')
  } catch (error) {
    erro.value = 'Erro ao salvar filme. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.form-page {
  padding: 2rem;
  background: #0f0f1a;
  min-height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
}

.form-box {
  background: #1a1a2e;
  padding: 2rem;
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  height: fit-content;
}

h2 {
  color: white;
  margin: 0 0 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  color: #ccc;
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.7rem;
  background: #0f3460;
  border: 1px solid #1a5276;
  border-radius: 8px;
  color: white;
  font-size: 0.95rem;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #e94560;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.poster-preview {
  margin: 0.5rem 0 1rem;
  text-align: center;
}

.poster-preview img {
  max-height: 200px;
  border-radius: 8px;
  object-fit: cover;
}

.form-acoes {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn-cancelar {
  flex: 1;
  padding: 0.8rem;
  background: #0f3460;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background 0.2s;
}

.btn-cancelar:hover {
  background: #1a5276;
}

.btn-salvar {
  flex: 1;
  padding: 0.8rem;
  background: #e94560;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background 0.2s;
}

.btn-salvar:hover:not(:disabled) {
  background: #c73652;
}

.btn-salvar:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.erro {
  color: #e94560;
  font-size: 0.85rem;
}
</style>