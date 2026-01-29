# Claude Instructions – To Do List Backend (Python + FastAPI)

---

## Delegação de Tarefas

**IMPORTANTE:** Todas as tarefas relacionadas ao desenvolvimento backend devem ser delegadas ao subagent especialista.

### Subagent de Backend

* **Arquivo:** `.claude/subagents/BACKEND_AGENT.md`
* **Responsabilidades:**

  * Criação e manutenção de APIs com FastAPI
  * Definição de rotas, schemas e models
  * Integração com MongoDB
  * Implementação de validações e regras de negócio
  * Configuração de ambiente (virtualenv, requirements, uvicorn)
  * Qualquer código Python do projeto

### Quando delegar

* Criar endpoints
* Criar schemas (Pydantic)
* Criar models de banco
* Criar services e repositories
* Configurar conexão com MongoDB
* Criar middlewares
* Criar validações e regras de negócio
* Organizar estrutura de pastas do backend

### Quando NÃO delegar

* Decisões arquiteturais de alto nível
* Mudança de stack
* Escolha de bibliotecas extras
* Aprovação de sugestões
* Alterações que impactem o contrato com o frontend

---

## Contexto Geral

Você (Claude) **NÃO deve tomar decisões sozinho**.

Você pode **sugerir**, **explicar prós e contras** e **apontar boas práticas**,
mas **NUNCA deve**:

* Implementar algo sem aprovação explícita
* Assumir padrões por conta própria
* Escolher bibliotecas, estruturas ou abordagens alternativas sem perguntar
* Alterar contratos de API sem alinhamento com o frontend

Sempre que houver mais de uma opção técnica ou arquitetural:
➡️ **Pergunte antes de implementar.**

Evite decisões implícitas, como:

* Estrutura de pastas diferente
* Campos extras no banco
* Mudança de naming
* Adição de validações não especificadas
* Otimizações não solicitadas

---

## Objetivo do Projeto

Criar uma API para um **To Do List**, totalmente alinhada com o frontend existente.

A API deve:

* Expor endpoints REST claros e previsíveis
* Ser escalável e bem estruturada
* Usar tipagem forte com Pydantic
* Ter contrato 1:1 com os tipos do frontend
* Ser simples, explícita e bem documentada

---

## Stack Obrigatória

* **Python**
* **FastAPI**
* **Pydantic**
* **MongoDB**
* **Uvicorn**

❗ **Não adicionar outras bibliotecas sem aprovação.**

---

## Ambiente e Setup (Obrigatório)

### Virtual Environment

* Usar **virtualenv**
* Nunca instalar pacotes globalmente

Exemplo esperado:

```bash
python -m venv venv
source venv/bin/activate
```

### Dependências

* Todas as dependências devem estar listadas em:

```
requirements.txt
```

* Nenhuma dependência implícita
* Nenhuma dependência “porque sim”

---

## Execução Local

A API deve rodar localmente usando **uvicorn**.

Exemplo esperado:

```bash
uvicorn app.main:app --reload
```

---

## Documentação

### README.md (Obrigatório)

O projeto deve conter um `README.md` **bem detalhado**, incluindo:

* Visão geral do projeto
* Stack utilizada
* Estrutura de pastas
* Como criar e ativar o virtualenv
* Como instalar dependências
* Como rodar o projeto localmente
* Variáveis de ambiente necessárias
* Exemplos básicos de endpoints

---

## Estrutura da API

A API deve ser **bem organizada**, separando claramente responsabilidades.

Exemplo de responsabilidades (estrutura final deve ser aprovada):

* **routers** → definição de endpoints
* **schemas** → contratos de entrada e saída (Pydantic)
* **models** → representação do banco
* **services** → regra de negócio
* **repositories** → acesso ao MongoDB
* **core/config** → configurações e environment
* **database** → conexão com MongoDB

❗ Não definir estrutura final sem aprovação.

---

## Banco de Dados

### MongoDB (Obrigatório)

* Usar MongoDB como banco de dados
* IDs devem ser tratados corretamente (ObjectId ↔ string)
* Nunca vazar detalhes internos do MongoDB para o frontend

---

## Contrato com o Frontend (CRÍTICO)

### Tipos 1:1

Os tipos da API devem ser **100% alinhados** com o frontend.

Tipo principal **ToDo**:

```ts
interface ToDo {
  id: string;
  name: string;
  description: string;
  createdAt: string; // ISO date
  deadline: string; // ISO date
  status: 'done' | 'not_done';
  canceled: boolean;
}
```

Regras:

* Nenhum campo extra sem aprovação
* Nenhum campo faltando
* Datas sempre em ISO string
* Status exatamente:

  * `done`
  * `not_done`

### Cancelamento

* `canceled` é **independente** do status
* Uma tarefa pode ser:

  * `done + canceled`
  * `not_done + canceled`

---

## Regras Gerais de Código

* Código limpo, legível e previsível
* Funções pequenas e bem nomeadas
* Uma responsabilidade por camada
* Nenhuma regra de negócio em router
* Nada “mágico” ou implícito

---

## Idioma e Padrões

* **Tudo em inglês**

  * Variáveis
  * Funções
  * Classes
  * Endpoints
  * Schemas
  * Comentários

---

## Versionamento de API

* Preparar estrutura para versionamento (`/v1`)
* Não implementar versões extras sem aprovação

---

## Documentação de Padrões

Sempre que um **padrão reutilizável** for definido (ex: padrão de update, soft delete, cancelamento, validação):

Claude **DEVE documentar**.

Separação obrigatória:

* **CLAUDE.md** → regras, comportamento e decisões de alto nível
* **BACKEND_AGENT.md** → documentação técnica e exemplos de implementação

---

## Regras de Negócio Implementadas

### Paginação (GET /api/v1/todos/)

* O endpoint de listagem retorna dados **paginados**
* Query params: `page` (int, default: 1, min: 1), `limit` (int, default: 10, min: 1, max: 100)
* Response schema: `PaginatedTodoResponse`
  * `items`: lista de `TodoResponse`
  * `total`: total de documentos no banco
  * `page`: página atual
  * `limit`: itens por página
  * `pages`: total de páginas (calculado: `ceil(total / limit)`)

### Ordenação (Fixa)

* A listagem sempre retorna os todos na seguinte ordem:
  1. `canceled ASC` — não canceladas primeiro
  2. `createdAt DESC` — mais recentes primeiro
* Essa ordenação é aplicada no **repository** via MongoDB `.sort()`
* O frontend **não** reordena os dados

### Camada de responsabilidade

* **Repository** (`find_all_paginated`): aplica sort, skip, limit e count no MongoDB
* **Service** (`get_all`): calcula `pages` e monta o `PaginatedTodoResponse`
* **Router** (`get_all_todos`): recebe query params com validação via `Query()`

---

## Final

Claude:

* **Não implemente nada sem aprovação**
* **Não decida sozinho**
* **Sugira, explique e aguarde confirmação**
* **Pergunte sempre que algo não estiver explícito**
* **Mantenha alinhamento total com o frontend**

Se algo não estiver claro → **pergunte antes**.
Se tiver uma sugestão → **apresente e espere aprovação**.

---

Se quiser, no próximo passo eu posso:

* Criar o `BACKEND_AGENT.md`
* Sugerir (sem implementar) a estrutura ideal de pastas
* Definir o contrato completo dos endpoints REST (GET/POST/PUT/DELETE) alinhado com o front
