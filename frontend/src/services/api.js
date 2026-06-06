import axios from 'axios'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://vcdxfcbeumyajtcfqabt.supabase.co',
  'sb_publishable_K9Xb_qOO884W_QjPCGarwQ_uOio4FIu'
)

const api = axios.create({
  baseURL: 'https://cinelog-backend-812z.onrender.com/api'
})

api.interceptors.request.use(async (config) => {
  const { data } = await supabase.auth.getSession()
  if (data.session) {
    config.headers.Authorization = `Bearer ${data.session.access_token}`
  }
  return config
})

export default api