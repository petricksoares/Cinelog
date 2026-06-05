<template>
  <div class="card">
    <img
      :src="filme.poster_url || 'https://via.placeholder.com/300x450?text=Sem+Poster'"
      :alt="filme.titulo"
      class="card-poster"
    />
    <div class="card-body">
      <h3 class="card-titulo">{{ filme.titulo }}</h3>
      <span class="card-categoria">{{ filme.categorias?.nome || 'Sem categoria' }}</span>
      <p class="card-critica">{{ filme.sinopse || 'Nenhuma crítica adicionada.' }}</p>
      <div class="card-footer">
        <span class="card-ano">📅 {{ filme.ano }}</span>
        <span class="card-nota">⭐ {{ filme.nota }}/10</span>
      </div>
      <div class="card-acoes">
        <button @click="$emit('editar', filme)" class="btn-editar">Editar</button>
        <button @click="$emit('deletar', filme.id)" class="btn-deletar">Excluir</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  filme: {
    type: Object,
    required: true
  }
})

defineEmits(['editar', 'deletar'])
</script>

<style scoped>
.card {
  background: #16213e;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-5px);
}

.card-poster {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.card-body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-titulo {
  color: white;
  font-size: 1.1rem;
  margin: 0 0 0.5rem;
}

.card-categoria {
  background: #e94560;
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.75rem;
  align-self: flex-start;
}

.card-critica {
  color: #aaa;
  font-size: 0.85rem;
  margin: 0.8rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  color: #ccc;
  font-size: 0.85rem;
  margin-bottom: 0.8rem;
}

.card-nota {
  color: #f5c518;
}

.card-acoes {
  display: flex;
  gap: 0.5rem;
}

.btn-editar {
  flex: 1;
  background: #0f3460;
  color: white;
  border: none;
  padding: 0.4rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-editar:hover {
  background: #1a5276;
}

.btn-deletar {
  flex: 1;
  background: #e94560;
  color: white;
  border: none;
  padding: 0.4rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-deletar:hover {
  background: #c73652;
}

@media (max-width: 768px) {
  .card-poster {
    height: 200px;
  }
}
</style>