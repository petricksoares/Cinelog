<template>
  <div class="login-container">
    <div class="login-box">
      <h1>🎬 CineLog</h1>
      <p class="subtitle">Sua coleção de filmes pessoal</p>

      <div class="tabs">
        <button :class="{ active: aba === 'login' }" @click="aba = 'login'">Login</button>
        <button :class="{ active: aba === 'register' }" @click="aba = 'register'">Cadastrar</button>
      </div>

      <form @submit.prevent="handleSubmit">
        <div v-if="aba === 'register'" class="form-group">
          <label>Nome</label>
          <input v-model="nome" type="text" placeholder="Seu nome" required />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" placeholder="seu@email.com" required />
        </div>
        <div class="form-group">
          <label>Senha</label>
          <input v-model="password" type="password" placeholder="••••••••" required />
        </div>

        <p v-if="erro" class="erro">{{ erro }}</p>
        <p v-if="sucesso" class="sucesso">{{ sucesso }}</p>

        <button type="submit" class="btn-submit" :disabled="loading">
          {{ loading ? 'Aguarde...' : aba === 'login' ? 'Entrar' : 'Cadastrar' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const aba = ref('login')
const nome = ref('')
const email = ref('')
const password = ref('')
const erro = ref('')
const sucesso = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  erro.value = ''
  sucesso.value = ''
  loading.value = true

  try {
    if (aba.value === 'login') {
      await authStore.login(email.value, password.value)
      router.push('/dashboard')
    } else {
      await authStore.register(email.value, password.value, nome.value)
      sucesso.value = 'Cadastro realizado! Verifique seu email e faça login.'
      aba.value = 'login'
    }
  } catch (error) {
    erro.value = 'Email ou senha inválidos. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f0f1a;
}

.login-box {
  background: #1a1a2e;
  padding: 2.5rem;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
}

h1 {
  color: #e94560;
  text-align: center;
  font-size: 2rem;
  margin: 0;
}

.subtitle {
  color: #aaa;
  text-align: center;
  margin: 0.5rem 0 1.5rem;
}

.tabs {
  display: flex;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #0f3460;
}

.tabs button {
  flex: 1;
  padding: 0.6rem;
  background: transparent;
  color: #aaa;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.tabs button.active {
  background: #e94560;
  color: white;
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

.form-group input {
  width: 100%;
  padding: 0.7rem;
  background: #0f3460;
  border: 1px solid #1a5276;
  border-radius: 8px;
  color: white;
  font-size: 0.95rem;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #e94560;
}

.btn-submit {
  width: 100%;
  padding: 0.8rem;
  background: #e94560;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background 0.2s;
}

.btn-submit:hover:not(:disabled) {
  background: #c73652;
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.erro {
  color: #e94560;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.sucesso {
  color: #2ecc71;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}
</style>