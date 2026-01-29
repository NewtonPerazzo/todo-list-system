Claude Instructions – To Do List Frontend (React + TypeScript)

---

## Delegação de Tarefas

**IMPORTANTE:** Todas as tarefas relacionadas ao desenvolvimento frontend devem ser delegadas ao subagent especialista.

### Subagent de Frontend
- **Arquivo:** `.claude/subagents/FRONTEND_AGENT.md`
- **Responsabilidades:**
  - Criação e edição de componentes React
  - Estilização com TailwindCSS
  - Configuração e uso do Redux
  - Implementação de formulários
  - Qualquer código dentro da pasta `src/`

### Quando delegar
- Criar componentes (Atoms, Molecules, Organisms)
- Implementar páginas
- Configurar estado global (Redux)
- Estilizar elementos
- Criar services e mocks
- Qualquer tarefa de código frontend

### Quando NÃO delegar
- Perguntas gerais sobre o projeto
- Decisões arquiteturais de alto nível
- Aprovação de sugestões

---

Contexto Geral

Você (Claude) deve apenas seguir instruções, não tomar decisões sozinho e não assumir padrões sem validação prévia.

Sempre que houver mais de uma opção técnica ou arquitetural, pergunte antes de implementar.

Você pode sugerir melhorias, mas NUNCA deve aplicá-las sem minha confirmação explícita.

Evite decisões implícitas (ex: escolha de biblioteca extra, padrão de pasta alternativo, novas cores, etc).

Este projeto é somente o FRONTEND, preparado para consumo de APIs no futuro, mas usando mock de dados por enquanto.

Objetivo do Projeto

Criar um projeto To Do List com:

React + TypeScript

TailwindCSS (com todas as configurações necessárias)

Redux + Redux Toolkit

Axios configurado

React Hook Form

Arquitetura escalável, performática e limpa

Design baseado em Atomic Design

Mobile-first e totalmente responsivo

Stack Obrigatória

React

TypeScript

TailwindCSS

Redux Toolkit

React-Redux

Axios

React Hook Form

❗ Não adicionar outras bibliotecas sem aprovação.

Regras Gerais de Código

Código limpo, legível e abstraído ao máximo possível

Funções, tipos ou constantes reutilizáveis devem ficar fora dos componentes

Componentes devem ser genéricos, com mínima ou nenhuma regra de negócio

Regra de negócio deve ficar em:

Organisms

Redux (slices, thunks)

Services

Utils

Idioma e Padrões

Todos os nomes devem estar em inglês:

Variáveis

Funções

Componentes

Tipos

Status

Valores de status:

done

not_done

Cancelamento:

`canceled: boolean` — campo independente do status. Uma tarefa pode ser done+canceled ou not_done+canceled.

Tipo Principal – ToDo

Criar o tipo principal:

export interface ToDo {
  id: string;
  name: string;
  description: string;
  createdAt: string; // ISO date
  deadline: string; // ISO date
  status: 'done' | 'not_done';
  canceled: boolean;
}
Estrutura de Pastas (Obrigatória)

src/
├── api/
│   ├── axios.ts
│   ├── todoService.ts
│
├── mocks/
│   └── todos.mock.ts
│
├── store/
│   ├── index.ts
│   ├── hooks.ts
│   └── todo/
│       ├── todoSlice.ts
│       ├── todoThunks.ts
│       └── todoTypes.ts
│
├── components/
│   ├── atoms/
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Select/
│   │
│   ├── molecules/
│   │   ├── Header/
│   │   └── ToDoItem/
│   │
│   └── organisms/
│       ├── ToDoForm/
│       └── ToDoList/
│
├── styles/
│   ├── colors.ts
│   └── tailwind.css
│
├── utils/
│   ├── date.ts
│   └── generateId.ts
│
├── pages/
│   └── Home.tsx
│
├── App.tsx
└── main.tsx
❗ Não alterar esta estrutura sem perguntar.

Atomic Design (Obrigatório)

Atoms

Button

Input

Select

Regras:

Sem regra de negócio

Sem acesso ao Redux

Apenas props visuais e callbacks

Molecules

Header (TO DO LIST)

ToDoItem (exibe dados de uma tarefa)

Organisms

ToDoForm (formulário de criação)

ToDoList (lista de tarefas + integração com Redux)

Estado Global (Redux)

Usar Redux Toolkit

Criar estrutura preparada para API real

Mesmo usando mock, tudo deve passar por thunks

Exemplo de fluxo

Component → dispatch(thunk)

Thunk → chama service

Service → retorna mock (por enquanto)

Slice → atualiza estado

API Layer (Preparada para o Futuro)

Mesmo usando mock:

Axios deve estar:

Instalado

Configurado

Com baseURL definida (ex: /api)

// api/axios.ts
// api/todoService.ts
❗ Nenhum componente deve acessar mock diretamente.

Mock de Dados

Criar pasta mocks/

Simular chamadas assíncronas

Usar Promise + setTimeout

Formulários

Usar React Hook Form

Validações básicas:

name: obrigatório

deadline: obrigatório

Estilização

Tailwind

Configurar Tailwind desde o zero

Usar Mobile First

Breakpoints Obrigatórios

até 500px

500px – 800px

800px – 1200px

acima de 1200px

Sistema de Cores (OBRIGATÓRIO — Contrato de Trabalho)

### Regra Absoluta

**Todas as cores do projeto DEVEM estar centralizadas em:**
- `src/styles/colors.ts` — variáveis JS exportadas
- `src/styles/tailwind.css` — variáveis CSS no `@theme` (usadas pelo Tailwind v4)

**Claude NUNCA pode:**
- ❌ Usar classes de cor do Tailwind que não estejam registradas no `@theme` (ex: `text-red-500`, `bg-green-50`)
- ❌ Adicionar cores novas sem aprovação
- ❌ Usar cores hardcoded em componentes

**Claude SEMPRE deve:**
- ✅ Usar as cores semânticas definidas abaixo
- ✅ Verificar `colors.ts` e `tailwind.css` antes de usar qualquer cor
- ✅ Pedir aprovação antes de adicionar uma nova cor

### Paleta Semântica

| Token | Uso | Exemplo de classe |
|-------|-----|-------------------|
| `primary-*` | Cor principal, UI geral, botões, links, foco | `text-primary-500`, `bg-primary-100` |
| `background` | Fundo da aplicação | `bg-background` |
| `error-*` | Erros, validação, delete, estados destrutivos | `text-error-500`, `bg-error-50`, `border-error-200` |
| `success-*` | Sucesso, reativação, confirmação | `text-success-600`, `bg-success-50` |
| `warning-*` | Avisos, cancelamento | `text-warning-600`, `bg-warning-50` |
| `gray-*` | Disabled, neutro | `disabled:bg-gray-100` |
| `white` | Fundo de cards, inputs | `bg-white` |

### Variações disponíveis

- **primary**: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
- **error**: 50, 100, 200, 300, 500, 600, 700
- **success**: 50, 600
- **warning**: 50, 600
- **gray**: 100

### Arquivos de referência
- `src/styles/colors.ts` — fonte da verdade JS
- `src/styles/tailwind.css` — `@theme` com CSS variables para Tailwind v4

### Adição de novas cores
Se houver necessidade de mais cores:
1. Sugira a cor e seu propósito semântico
2. Aguarde aprovação
3. Adicione em `colors.ts` E `tailwind.css` simultaneamente
4. Nunca aplique sem confirmação

UI Obrigatória

Header

Texto: TO DO LIST

Lista de ToDos

Cada item deve exibir:

Name

Created date

Deadline

Status

Ações

Botão: Add To Do

Ao cadastrar:

A tarefa deve aparecer imediatamente na lista

Editar e deletar:

Pode existir UI

Não precisa ter ação funcional (mock)

Performance e Escalabilidade

Usar memo quando fizer sentido

Evitar re-renders desnecessários

Separar bem UI, lógica e estado

Documentação de Comportamento

**IMPORTANTE:** Sempre que uma implementação definir um padrão reutilizável (ex: fluxo de edição, padrão de formulário dual-mode, estrutura de estado Redux para features), Claude DEVE documentar esse padrão.

A documentação deve ser separada da seguinte forma:
- **CLAUDE.md** (este arquivo): Guidelines, regras de comportamento e padrões arquiteturais de alto nível
- **FRONTEND_AGENT.md**: Documentação técnica de implementação (código de referência, estrutura de componentes, helpers utilizados)

---

## Padrões Implementados

### Padrão: Edição de Entidade via Redux

**Aplicado em:** Edição de ToDo

**Fluxo:**
1. O `State` do slice possui um campo `editing[Entity]: Entity | null`
2. O slice expõe actions `setEditing[Entity]` e `clearEditing[Entity]`
3. O `clearEditing[Entity]` é chamado automaticamente no `fulfilled` do thunk de update
4. O componente de lista (Organism) faz `dispatch(setEditing[Entity](entity))` ao clicar em "Edit"
5. O componente de formulário (Organism) lê `editing[Entity]` do state e alterna entre modo criação/edição

**Arquivos envolvidos:**
- `store/[entity]/[entity]Types.ts` → `editing[Entity]` no `State`
- `store/[entity]/[entity]Slice.ts` → reducers `setEditing` / `clearEditing` + limpeza no `fulfilled` do update
- `components/organisms/[Entity]List/` → dispatch `setEditing` no handler de edit
- `components/organisms/[Entity]Form/` → lê `editing[Entity]`, alterna modo, preenche form com `reset()`

**Regras:**
- O formulário SEMPRE reutiliza o mesmo componente para criação e edição (dual-mode)
- Ao entrar em modo edição, o form é preenchido via `useEffect` + `reset()` do React Hook Form
- Ao cancelar ou salvar com sucesso, `editing[Entity]` volta a `null`
- O botão de submit muda texto/ícone conforme o modo

---

### Padrão: Paginação com Backend

**Aplicado em:** Listagem de ToDos

**Regras de negócio:**
- Todos são exibidos **10 por página** (limit padrão: 10)
- A ordenação é feita pelo **backend**: não canceladas primeiro, mais recentes primeiro
- Canceladas sempre aparecem por último

**State:**
- `TodoState` possui campos: `total`, `page`, `pages`
- `fetchTodos` recebe `FetchTodosParams` (page, limit opcionais) e retorna `PaginatedResponse`

**Fluxo:**
1. `ToDoList` chama `dispatch(fetchTodos({ page }))` no mount e ao navegar
2. O thunk chama `todoService.getAll(page, limit)` que envia `?page=X&limit=Y`
3. O slice armazena `items`, `total`, `page`, `pages`
4. `ToDoList` renderiza controles Previous/Next quando `pages > 1`

**Refetch após mutações:**
- Após `createTodo`: refetch para página 1 (novo todo aparece no topo)
- Após `updateTodo` ou `deleteTodo`: refetch para página atual
- O slice **não** manipula `todos[]` localmente em create/delete — sempre refetch

**Arquivos envolvidos:**
- `store/todo/todoTypes.ts` → `PaginatedResponse`, `FetchTodosParams`, `TodoState` com campos de paginação
- `store/todo/todoThunks.ts` → `fetchTodos` aceita `FetchTodosParams`
- `store/todo/todoSlice.ts` → `fetchTodos.fulfilled` popula `items`, `total`, `page`, `pages`
- `api/todoService.ts` → `getAll(page, limit)` com query params
- `components/organisms/ToDoList/` → controles de paginação e refetch
- `components/organisms/ToDoForm/` → refetch após create

---

Final

Claude, não execute nada além do que está descrito aqui.

Se algo não estiver claro, pergunte antes.
Se tiver uma sugestão, apresente e aguarde aprovação.