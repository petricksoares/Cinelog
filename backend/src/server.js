 const express = require('express')
const cors = require('cors')
require('dotenv').config()

const filmesRoutes = require('./routes/filmes')
const categoriasRoutes = require('./routes/categorias')
const authRoutes = require('./routes/auth')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/filmes', filmesRoutes)
app.use('/api/categorias', categoriasRoutes)
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'CineLog API funcionando!' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
