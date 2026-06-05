import { defineStore } from 'pinia'
import api from '../services/api'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://vcdxfcbeumyajtcfqabt.supabase.co',
  'sb_publishable_K9Xb_qOO884W_QjPCGarwQ_uOio4FIu'
)

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null
  }),

  getters: {
    isAuthenticated: (state) => !!state.user
  },

  actions: {
    async login(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      this.user = data.user
      this.token = data.session.access_token
      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('token', data.session.access_token)
    },

    async register(email, password, nome) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { nome } }
      })
      if (error) throw error
    },

    async logout() {
      await supabase.auth.signOut()
      this.user = null
      this.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },

    async refreshToken() {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        this.token = data.session.access_token
        localStorage.setItem('token', data.session.access_token)
      }
    }
  }
})