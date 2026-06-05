import { defineStore } from 'pinia'
import api from '../services/api'

export const useFilmesStore = defineStore('filmes', {
  state: () => ({
    filmes: [],
    categorias: [],
    loading: false,
    error: null
  }),

  actions: {
    async buscarFilmes() {
      this.loading = true
      try {
        const response = await api.get('/filmes')
        this.filmes = response.data
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async buscarCategorias() {
      try {
        const response = await api.get('/categorias')
        this.categorias = response.data
      } catch (error) {
        this.error = error.message
      }
    },

    async criarFilme(filme) {
      const response = await api.post('/filmes', filme)
      this.filmes.unshift(response.data)
      return response.data
    },

    async atualizarFilme(id, filme) {
      const response = await api.put(`/filmes/${id}`, filme)
      const index = this.filmes.findIndex(f => f.id === id)
      if (index !== -1) this.filmes[index] = response.data
      return response.data
    },

    async deletarFilme(id) {
      await api.delete(`/filmes/${id}`)
      this.filmes = this.filmes.filter(f => f.id !== id)
    }
  }
})