# 🎬 CineLog
 
> Sistema web para gerenciamento de coleção pessoal de filmes com críticas e avaliações.
 
---
 
## Índice
 
- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Executar](#como-executar)
- [Telas do Sistema](#telas-do-sistema)
- [Banco de Dados](#banco-de-dados)
- [Integrantes](#integrantes)
---
 
## Sobre o Projeto 📌
 
O **CineLog** é um sistema web completo desenvolvido como projeto avaliativo da disciplina de **Programação Web**. A aplicação permite que usuários cadastrem, organizem e avaliem filmes de sua coleção pessoal, escrevendo críticas e atribuindo notas para cada título.
 
O sistema foi desenvolvido utilizando arquitetura **cliente-servidor**, com front-end em **Vue.js** e back-end em **Node.js + Express**, integrado ao banco de dados **Supabase (PostgreSQL)**.
 
---
 
## Funcionalidades
 
### Autenticação
- Cadastro de novo usuário com nome e e-mail
- Login com e-mail e senha
- Controle de sessão com Pinia
- Proteção de rotas (apenas usuários autenticados acessam o sistema)
- Logout
### Filmes (CRUD Completo)
- Cadastrar novo filme
- Listar todos os filmes
- Editar filme existente
- Excluir filme
- Buscar filme por título
- Filtrar por categoria
### Dashboard
- Total de filmes cadastrados
- Média geral das notas
- Filme mais bem avaliado
- Total de categorias disponíveis
- Exibição dos 4 filmes mais recentes
### Perfil
- Informações do usuário logado
- Estatísticas pessoais (filmes cadastrados, média de notas, gênero mais visto)
- Data de cadastro na plataforma
---
 
## 🛠️ Tecnologias Utilizadas
 
### Front-end
| Tecnologia | Versão | Descrição |
|---|---|---|
| Vue.js | 3.x | Framework JavaScript progressivo |
| Pinia | 2.x | Gerenciamento de estado |
| Vue Router | 4.x | Roteamento SPA |
| Axios | 1.x | Requisições HTTP |
| Vite | 8.x | Build tool e servidor de desenvolvimento |
 
### Back-end
| Tecnologia | Versão | Descrição |
|---|---|---|
| Node.js | 24.x | Ambiente de execução JavaScript |
| Express | 5.x | Framework web para Node.js |
| Supabase JS | 2.x | Cliente para integração com Supabase |
| dotenv | 17.x | Gerenciamento de variáveis de ambiente |
| CORS | 2.x | Controle de acesso entre origens |
| Nodemon | 3.x | Reinicialização automática do servidor |
 
### Banco de Dados
| Tecnologia | Descrição |
|---|---|
| Supabase | Plataforma BaaS com PostgreSQL |
| Supabase Auth | Autenticação de usuários |
| Row Level Security | Segurança a nível de linha |
 
---
 
## 📁 Estrutura do Projeto
 
```
projeto3-Web/
├── frontend/
│   ├── src/
│   │   ├── assets/          # Arquivos estáticos e CSS global
│   │   ├── components/      # Componentes reutilizáveis
│   │   │   ├── Navbar.vue   # Barra de navegação
│   │   │   └── CardFilme.vue # Card de exibição de filme
│   │   ├── views/           # Telas da aplicação
│   │   │   ├── LoginView.vue
│   │   │   ├── DashboardView.vue
│   │   │   ├── FilmesView.vue
│   │   │   ├── FilmeFormView.vue
│   │   │   └── PerfilView.vue
│   │   ├── stores/          # Gerenciamento de estado (Pinia)
│   │   │   ├── auth.js      # Store de autenticação
│   │   │   └── filmes.js    # Store de filmes
│   │   ├── router/          # Configuração de rotas
│   │   │   └── index.js
│   │   ├── services/        # Serviços de API
│   │   │   └── api.js
│   │   ├── App.vue
│   │   └── main.js
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── backend/
    ├── src/
    │   ├── controllers/     # Lógica de negócio
    │   │   ├── authController.js
    │   │   ├── filmesController.js
    │   │   └── categoriasController.js
    │   ├── routes/          # Definição de rotas
    │   │   ├── auth.js
    │   │   ├── filmes.js
    │   │   └── categorias.js
    │   ├── middleware/      # Middlewares
    │   │   └── auth.js
    │   ├── supabase.js      # Configuração do Supabase
    │   └── server.js        # Arquivo principal
    ├── .env                 # Variáveis de ambiente
    └── package.json
```
 
---
 
## 🚀 Como Executar
 
### Pré-requisitos
- [Node.js](https://nodejs.org) instalado (versão 18 ou superior)
- [Git](https://git-scm.com) instalado
- Conta no [Supabase](https://supabase.com)
### 1. Clonar o repositório
```bash
git clone https://github.com/seu-usuario/projeto3-Web.git
cd projeto3-Web
```
 
### 2. Configurar o Back-end
```bash
cd backend
npm install
```
 
Crie o arquivo `.env` dentro da pasta `backend` com as seguintes variáveis:
```env
PORT=3000
SUPABASE_URL=sua_url_do_supabase
SUPABASE_KEY=sua_chave_do_supabase
```
 
Inicie o servidor:
```bash
npm run dev
```
 
O back-end estará rodando em: `http://localhost:3000`
 
### 3. Configurar o Front-end
```bash
cd frontend
npm install
npm run dev
```
 
O front-end estará rodando em: `http://localhost:5173`
 
### 4. Configurar o Banco de Dados
 
No **SQL Editor** do Supabase, execute:
 
```sql
-- Tabela de categorias
CREATE TABLE categorias (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
 
-- Tabela de filmes
CREATE TABLE filmes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  sinopse TEXT,
  ano INTEGER,
  nota DECIMAL(3,1) CHECK (nota >= 0 AND nota <= 10),
  poster_url TEXT,
  categoria_id UUID REFERENCES categorias(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
 
-- Políticas de segurança
ALTER TABLE filmes ENABLE ROW LEVEL SECURITY;
ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;
 
CREATE POLICY "Filmes visíveis para usuários autenticados" ON filmes
  FOR ALL USING (auth.uid() IS NOT NULL);
 
CREATE POLICY "Categorias visíveis para todos" ON categorias
  FOR ALL USING (true);
```
 
---
 
## 🗄️ Banco de Dados
 
O sistema utiliza **3 tabelas** no Supabase:
 
### `auth.users` (gerenciada pelo Supabase Auth)
| Campo | Tipo | Descrição |
|---|---|---|
| id | UUID | Identificador único |
| email | TEXT | E-mail do usuário |
| user_metadata | JSON | Dados extras (nome) |
 
### `categorias`
| Campo | Tipo | Descrição |
|---|---|---|
| id | UUID | Identificador único |
| nome | TEXT | Nome da categoria |
| descricao | TEXT | Descrição da categoria |
| created_at | TIMESTAMP | Data de criação |
 
### `filmes`
| Campo | Tipo | Descrição |
|---|---|---|
| id | UUID | Identificador único |
| titulo | TEXT | Título do filme |
| sinopse | TEXT | Crítica/review do usuário |
| ano | INTEGER | Ano de lançamento |
| nota | DECIMAL | Nota de 0 a 10 |
| poster_url | TEXT | URL do poster |
| categoria_id | UUID | Referência à categoria |
| user_id | UUID | Referência ao usuário |
| created_at | TIMESTAMP | Data de cadastro |
 
---
 
## 🖥️ Telas do Sistema
 
| Tela | Rota | Descrição |
|---|---|---|
| Login | `/login` | Autenticação e cadastro de usuário |
| Início | `/dashboard` | Estatísticas e filmes recentes |
| Filmes | `/filmes` | Listagem completa com busca e filtros |
| Novo Filme | `/filmes/novo` | Formulário de cadastro |
| Editar Filme | `/filmes/editar/:id` | Formulário de edição |
| Perfil | `/perfil` | Dados e estatísticas do usuário |
 
---
 
## 👤 Integrantes
 
| Integrante 1 | Integrante 2 |
|---|---|
| Petrick Gomes | Sammya Letícia |
 
---
 
## 📄 Licença
 
Este projeto foi desenvolvido para fins acadêmicos na disciplina de **Programação Web**.
 
---
