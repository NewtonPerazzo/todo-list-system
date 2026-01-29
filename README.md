# To Do List System

Projeto fullstack de lista de tarefas, desenvolvido como prática de desenvolvimento assistido por IA utilizando o **Claude Code** (Claude Opus 4.5).

O objetivo é explorar o fluxo completo de uma aplicação web moderna — do backend ao frontend — com arquitetura limpa, boas práticas e integração real entre as camadas.

## Stack

### Frontend (`todo-list/`)
- **React** + **TypeScript**
- **Redux Toolkit** (estado global)
- **React Hook Form** (formulários)
- **Axios** (HTTP client)
- **TailwindCSS v4** (estilização)
- **Atomic Design** (organização de componentes)

### Backend (`todo-list-api/`)
- **FastAPI** (Python)
- **MongoDB** (via Motor — driver async)
- **Pydantic** (validação e schemas)

## Funcionalidades

- Criar, editar, deletar e listar tarefas
- Marcar tarefa como concluída / pendente
- Cancelar e reativar tarefas
- Paginação com ordenação pelo backend (mais recentes primeiro, canceladas por último)
- Layout responsivo e mobile-first (suporte a partir de 320px)
- Sistema de cores semântico centralizado

## Como rodar

### Pré-requisitos
- Node.js 18+
- Python 3.10+
- MongoDB (local ou via Docker)

### Backend

```bash
cd todo-list-api
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Criar arquivo .env
echo "MONGO_URI=mongodb://localhost:27017" > .env
echo "MONGO_DB_NAME=todo_list_db" >> .env

uvicorn app.main:app --reload
```

API disponível em `http://localhost:8000/api/v1`

### Frontend

```bash
cd todo-list
npm install

# Criar arquivo .env
echo "VITE_API_BASE_URL=http://localhost:8000/api/v1" > .env

npm run dev
```

App disponível em `http://localhost:5173`

## Estrutura

```
todo-list-system/
├── todo-list/            # Frontend React
│   ├── src/
│   │   ├── api/          # Axios + services
│   │   ├── components/   # Atoms, Molecules, Organisms
│   │   ├── store/        # Redux (slices, thunks, types)
│   │   ├── styles/       # Cores e CSS
│   │   ├── utils/        # Helpers
│   │   └── pages/        # Páginas
│   └── ...
│
├── todo-list-api/        # Backend FastAPI
│   ├── app/
│   │   ├── routers/      # Endpoints REST
│   │   ├── services/     # Lógica de negócio
│   │   ├── repositories/ # Acesso ao MongoDB
│   │   ├── schemas/      # Pydantic models
│   │   ├── models/       # Document builders
│   │   ├── database/     # Conexão MongoDB
│   │   └── core/         # Configurações
│   └── ...
│
└── .claude/              # Instruções de integração para o Claude
```

## Sobre o desenvolvimento

Todo o projeto foi construído em pair programming com o **Claude Code** (modelo Claude Opus 4.5), seguindo um fluxo estruturado:

- Regras e contratos documentados em arquivos `CLAUDE.md`
- Sistema de delegação por subagents (frontend e backend separados)
- Claude sugere e aguarda aprovação antes de implementar
- Decisões arquiteturais sempre discutidas antes da execução

O foco foi praticar desenvolvimento fullstack real com assistência de IA, mantendo controle total sobre as decisões técnicas.
