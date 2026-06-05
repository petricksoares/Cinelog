const supabase = require('../supabase')

const listar = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('filmes')
      .select('*, categorias(nome)')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const buscarPorId = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('filmes')
      .select('*, categorias(nome)')
      .eq('id', req.params.id)
      .single()

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const criar = async (req, res) => {
  try {
    const { titulo, sinopse, ano, nota, poster_url, categoria_id } = req.body

    const { data, error } = await supabase
      .from('filmes')
      .insert([{ titulo, sinopse, ano, nota, poster_url, categoria_id, user_id: req.user.id }])
      .select()

    if (error) throw error
    res.status(201).json(data[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const atualizar = async (req, res) => {
  try {
    const { titulo, sinopse, ano, nota, poster_url, categoria_id } = req.body

    const { data, error } = await supabase
      .from('filmes')
      .update({ 
        titulo, 
        sinopse, 
        ano: ano ? parseInt(ano) : null, 
        nota: nota ? parseFloat(nota) : null, 
        poster_url, 
        categoria_id: categoria_id || null 
      })
      .eq('id', req.params.id)
      .select()

    if (error) throw error
    res.json(data[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deletar = async (req, res) => {
  try {
    const { error } = await supabase
      .from('filmes')
      .delete()
      .eq('id', req.params.id)

    if (error) throw error
    res.json({ message: 'Filme deletado com sucesso!' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { listar, buscarPorId, criar, atualizar, deletar }