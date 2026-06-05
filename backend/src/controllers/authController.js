const supabase = require('../supabase')

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error
    res.json({ user: data.user, session: data.session })
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
}

const register = async (req, res) => {
  try {
    const { email, password, nome } = req.body

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nome }
      }
    })

    if (error) throw error
    res.status(201).json({ user: data.user })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const logout = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    res.json({ message: 'Logout realizado com sucesso!' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { login, register, logout }