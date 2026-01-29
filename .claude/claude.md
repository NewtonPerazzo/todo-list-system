Claude Instructions – To Do List System Integration

(Frontend + Backend | React + FastAPI)

Escopo deste Documento

Este arquivo governa exclusivamente a integração entre o FRONTEND e o BACKEND.

Ele NÃO substitui:

todo-list/CLAUDE.md

todo-list-api/CLAUDE.md

Ele coordena os dois.

Estrutura do Projeto

A estrutura base do repositório é:

todo-list-system/
├── todo-list/          # Frontend (React + TypeScript)
│   └── CLAUDE.md
│
├── todo-list-api/      # Backend (FastAPI)
│   └── CLAUDE.md
│
└── CLAUDE.md           # (este arquivo – integração)


❗ Claude não pode:

Mover projetos de pasta

Alterar essa estrutura

Criar monorepo tooling sem aprovação

Papel do Claude na Integração
Regra de Ouro

Claude NÃO toma decisões sozinho.

Na integração entre frontend e backend, Claude pode:

✅ Sugerir fluxos
✅ Apontar ajustes necessários
✅ Identificar incompatibilidades
✅ Explicar impactos

Claude NUNCA pode:

❌ Alterar contrato da API
❌ Alterar tipos do frontend
❌ Remover mocks sem autorização
❌ Ativar integração real sem confirmação
❌ Criar endpoints novos sem alinhamento

Delegação de Responsabilidades (OBRIGATÓRIO)

### Regra de Delegação

Claude **NUNCA** escreve código direto de implementação. Claude apenas coordena e orienta.

Toda tarefa de código **DEVE** ser delegada ao projeto correto:

| Tipo de tarefa | Delegar para | Documentação |
|---|---|---|
| Código frontend (React, componentes, estilos, Redux, services) | `todo-list/.claude/CLAUDE.md` e seus subagents (`FRONTEND_AGENT.md`) | `todo-list/.claude/CLAUDE.md` |
| Código backend (FastAPI, rotas, schemas, models, repositories) | `todo-list-api/.claude/CLAUDE.md` e seus subagents (`BACKEND_AGENT.md`) | `todo-list-api/.claude/CLAUDE.md` |

### Como delegar

- **Frontend**: Tarefas que envolvam arquivos dentro de `todo-list/` devem seguir as regras e subagents definidos em `todo-list/.claude/CLAUDE.md`
- **Backend**: Tarefas que envolvam arquivos dentro de `todo-list-api/` devem seguir as regras e subagents definidos em `todo-list-api/.claude/CLAUDE.md`
- **Integração**: Tarefas que envolvam ambos os projetos devem ser coordenadas por este documento, delegando cada parte ao projeto correspondente

### Violações

Claude **NÃO PODE**:

- Editar arquivos do frontend sem seguir o fluxo de delegação do `todo-list`
- Editar arquivos do backend sem seguir o fluxo de delegação do `todo-list-api`
- Implementar código diretamente em qualquer projeto sem passar pela cadeia de delegação
- Ignorar os subagents definidos em cada projeto

Objetivo da Integração

Permitir que:

O frontend (todo-list) deixe de usar mocks

O frontend consuma a API real do backend (todo-list-api)

Ambos rodem localmente

Seja possível testar o fluxo completo:

Criar ToDo

Listar ToDos

Atualizar ToDo

Cancelar ToDo

Estratégia de Integração (Obrigatória)
1. Backend como Fonte da Verdade

Após a integração:

O backend (todo-list-api) é a fonte oficial de dados

O frontend (todo-list) não acessa mocks diretamente

O fluxo permanece o mesmo:

Component
 → dispatch(thunk)
   → service
     → API (FastAPI)


❗ A arquitetura Redux não deve ser alterada
❗ Apenas a implementação interna do service muda

2. Contrato de API (Imutável)

O contrato definido no frontend é soberano.

Tipo principal ToDo:

interface ToDo {
  id: string;
  name: string;
  description: string;
  createdAt: string; // ISO date
  deadline: string;  // ISO date
  status: 'done' | 'not_done';
  canceled: boolean;
}


Regras:

Backend adapta MongoDB → contrato

Frontend não transforma dados da API

Nenhum campo extra

Nenhum campo opcional implícito

Configuração de Ambiente (Integração)
Backend (todo-list-api)

Rodando localmente em:

http://localhost:8000


API versionada:

/api/v1


Exemplo:

GET http://localhost:8000/api/v1/todos

Frontend (todo-list)

O frontend deve:

Usar Axios

Ter baseURL configurável

Nunca hardcodear URLs

Exemplo conceitual:

baseURL = import.meta.env.VITE_API_BASE_URL

Variáveis de Ambiente (Obrigatório)

A integração deve usar .env.

Frontend (todo-list/.env)
VITE_API_BASE_URL=http://localhost:8000/api/v1

Backend (todo-list-api/.env)
MONGO_URI=...


❗ Claude não cria variáveis novas sem aprovação.

Estratégia de Migração Mock → API
Estado Atual

Frontend usa mocks

Services simulam chamadas assíncronas

Migração Controlada (Obrigatória)

Claude deve seguir exatamente esta ordem:

Manter a interface atual dos services

Substituir internamente:

mock → chamada HTTP real

Não alterar:

thunks

slices

componentes

Garantir:

Redux continua funcionando

UI não quebra

❗ Mocks só podem ser removidos com autorização explícita.

Testes Manuais Esperados

Após integração, deve ser possível:

Subir todo-list-api

Subir todo-list

Criar uma tarefa pelo frontend

Recarregar a página

Ver a tarefa persistida (MongoDB)

Claude não cria testes automatizados sem pedido.

CORS (Atenção)

Claude deve:

Sugerir configuração de CORS no backend

Nunca ativar automaticamente

Sempre pedir aprovação antes

Alinhamento de Erros

A API deve retornar erros previsíveis

O frontend não deve:

Fazer parsing customizado

Ignorar erros silenciosamente

O formato final de erro deve ser discutido antes.

Versionamento e Evolução

Qualquer mudança de contrato:

Deve ser discutida

Impacta frontend e backend

Claude nunca faz breaking changes sozinho

Documentação Obrigatória

Sempre que surgir um padrão reutilizável, Claude deve documentar em:

CLAUDE.md (raiz – integração)

FRONTEND_AGENT.md (todo-list)

BACKEND_AGENT.md (todo-list-api)

---

## Contratos de Trabalho

### Sistema de Cores (OBRIGATÓRIO)

- **Todas as cores** do frontend devem estar centralizadas em `todo-list/src/styles/colors.ts` e `todo-list/src/styles/tailwind.css`
- Componentes **NUNCA** usam classes de cor do Tailwind que não estejam no `@theme` (ex: proibido `text-red-500`, usar `text-error-500`)
- Cores são semânticas: `primary-*`, `error-*`, `success-*`, `warning-*`, `gray-*`
- Novas cores requerem aprovação antes de serem adicionadas
- Detalhes completos: `todo-list/.claude/CLAUDE.md` → seção "Sistema de Cores"

### Documentação Obrigatória

- **Toda alteração de regra de negócio** deve ser documentada nos CLAUDE.md relevantes
- Claude deve **sempre verificar** a documentação existente antes de implementar
- Tudo o que for definido no prompt deve ser refletido nos respectivos CLAUDE.md/subagents

---

## Regras de Negócio Documentadas

### Paginação

- O endpoint `GET /api/v1/todos/` retorna dados **paginados**
- Query params: `page` (default: 1), `limit` (default: 10, max: 100)
- Response: `{ items: ToDo[], total: number, page: number, limit: number, pages: number }`
- O contrato individual do `ToDo` **não muda**, apenas o envelope do GET list

### Ordenação

- Todos são sempre retornados na seguinte ordem fixa:
  1. **Não canceladas primeiro** (`canceled ASC`)
  2. **Criadas mais recentemente primeiro** (`createdAt DESC`)
- Canceladas ficam sempre por último
- A ordenação é responsabilidade do **backend**

### Refetch após mutações

- Após criar, atualizar ou deletar um todo, o frontend faz **refetch** da página atual
- Isso garante que a ordenação e paginação permaneçam consistentes com o backend

---

Resumo Final (Não Negociável)

Claude:

❌ Não decide

❌ Não implementa sem aprovação

✅ Sugere

✅ Explica

✅ Alinha frontend e backend

✅ Garante contrato 1:1

✅ Mantém arquitetura limpa

Se algo não estiver claro → pergunte
Se algo puder ser melhor → sugira e aguarde aprovação

Se quiser, próximo passo eu posso:

Criar um checklist de integração passo a passo

Definir o contrato exato dos endpoints

Mapear quais services do frontend mudam (sem implementar)

Propor um modo híbrido mock/API pra facilitar testes locais