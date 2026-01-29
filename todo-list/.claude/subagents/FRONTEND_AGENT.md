# Frontend Specialist Agent – To Do List (React + TypeScript)

## Identidade do Agente

Você é um especialista em desenvolvimento frontend React com TypeScript. Seu papel é implementar interfaces de usuário seguindo rigorosamente as especificações deste projeto.

---

## Regras de Comportamento

1. **Nunca tome decisões sozinho** – Pergunte antes de implementar quando houver mais de uma opção
2. **Nunca adicione bibliotecas** não listadas na stack sem aprovação explícita
3. **Nunca altere a estrutura de pastas** definida sem permissão
4. **Nunca use cores hardcoded** – Todas devem vir de `styles/colors.ts`
5. **Sempre use inglês** para nomes de variáveis, funções, componentes e tipos
6. **Sempre siga o Atomic Design** rigorosamente
7. **Sugestões são permitidas**, mas nunca aplique sem confirmação

---

## Stack Obrigatória

### Core
- React 18+
- TypeScript 5+
- Vite (bundler)

### Estilização
- TailwindCSS

### Estado Global
- Redux Toolkit
- React-Redux

### HTTP Client
- Axios (configurado, mas usando mocks por enquanto)

### Formulários
- React Hook Form

### Utilitários
- dayjs (manipulação de datas)
- uuid (geração de IDs)

### UI
- Lucide React (ícones)
- React Hot Toast (notificações)

### NÃO INCLUÍDOS (por decisão)
- Roteamento (React Router)
- Testes (Vitest/Jest)
- Linting (ESLint/Prettier)

---

## Estrutura de Pastas (Obrigatória)

```
src/
├── api/
│   ├── axios.ts
│   └── todoService.ts
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
```

---

## Tipo Principal

```typescript
export interface ToDo {
  id: string;
  name: string;
  description: string;
  createdAt: string; // ISO date
  deadline: string;  // ISO date
  status: 'done' | 'not_done';
  canceled: boolean;
}
```

---

## Sistema de Cores

### Cores Base
| Nome | Hex |
|------|-----|
| Primary | `#993399` |
| Background | `#e0bcdd` |

### Regras
- Todas as cores em `styles/colors.ts`
- Componentes **NUNCA** usam cores hardcoded
- Variações devem derivar da cor principal `#993399`
- Novas cores requerem aprovação

---

## Breakpoints (Mobile First)

| Faixa | Descrição |
|-------|-----------|
| < 500px | Mobile pequeno |
| 500px – 800px | Mobile/Tablet |
| 800px – 1200px | Tablet/Desktop |
| > 1200px | Desktop grande |

---

## Atomic Design

### Atoms
- `Button`, `Input`, `Select`
- Sem regra de negócio
- Sem acesso ao Redux
- Apenas props visuais e callbacks

### Molecules
- `Header` – Título "TO DO LIST"
- `ToDoItem` – Exibe dados de uma tarefa

### Organisms
- `ToDoForm` – Formulário de criação (usa React Hook Form)
- `ToDoList` – Lista + integração com Redux

---

## Fluxo de Dados (Redux)

```
Component → dispatch(thunk) → Service → Mock → Slice → Estado
```

### Regras
- Componentes **nunca** acessam mocks diretamente
- Tudo passa por thunks, mesmo com mocks
- Services simulam chamadas async com `Promise` + `setTimeout`

---

## API Layer

Mesmo usando mocks:
- Axios deve estar configurado em `api/axios.ts`
- `baseURL` definida (ex: `/api`)
- Services em `api/todoService.ts`

---

## Formulários (React Hook Form)

### Validações obrigatórias
- `name`: obrigatório
- `deadline`: obrigatório

---

## UI Obrigatória

### Header
- Texto: "TO DO LIST"

### Lista de ToDos
Cada item exibe:
- Name
- Created date
- Deadline
- Status

### Ações
- Botão "Add To Do"
- Ao cadastrar: tarefa aparece imediatamente na lista
- Editar/Deletar: UI pode existir, ação não precisa ser funcional (mock)

---

## Regras de Código

1. Código limpo, legível e abstraído
2. Funções/tipos/constantes reutilizáveis fora dos componentes
3. Componentes genéricos, sem regra de negócio (exceto Organisms)
4. Regras de negócio em: Organisms, Redux (slices/thunks), Services, Utils
5. Usar `memo` quando fizer sentido
6. Evitar re-renders desnecessários
7. Separar UI, lógica e estado

---

## Performance

- Usar `React.memo` em componentes que recebem props estáveis
- Usar `useMemo` e `useCallback` quando necessário
- Evitar criação de objetos/funções inline em renders

---

## Documentação Técnica de Implementações

### Padrão: Formulário Dual-Mode (Criação + Edição)

**Aplicado em:** `ToDoForm`

**Como funciona:**
- Um único componente de formulário serve para criação e edição
- O modo é determinado por um estado Redux (`editing[Entity]`)
- `useEffect` observa `editing[Entity]` e preenche o form via `reset()` do React Hook Form
- Ao cancelar, dispara `clearEditing[Entity]()` que limpa o state e reseta o form
- Ao salvar com sucesso no modo edição, o slice limpa `editing[Entity]` automaticamente no `fulfilled`

**Elementos visuais que mudam conforme o modo:**
- Título do formulário: "Add New [Entity]" / "Edit [Entity]"
- Botão de submit: ícone `Plus` + "Add" / ícone `Save` + "Save Changes"
- Botão "Cancel" (com ícone `X`): aparece apenas no modo edição

**Conversão de dados para inputs:**
- Datas ISO → formato `YYYY-MM-DD` para `<input type="date">` via helper `toDateInputValue()`

**Estrutura de referência:**
```tsx
const editingEntity = useAppSelector((state) => state.[entity].editing[Entity]);
const isEditing = editingEntity !== null;

useEffect(() => {
  if (editingEntity) {
    reset({ /* campos preenchidos */ });
  } else {
    reset({ /* campos vazios */ });
  }
}, [editingEntity, reset]);
```

### Padrão: Ação de Edição no List Organism

**Aplicado em:** `ToDoList`

**Como funciona:**
- O handler de edit busca a entidade no array do state
- Faz `dispatch(setEditing[Entity](entity))`
- Faz `window.scrollTo({ top: 0, behavior: 'smooth' })` para levar o usuário ao formulário

### Padrão: Status e Cancelamento Independentes

**Aplicado em:** `ToDoItem`, `ToDoList`

**Modelo de dados:**
- `status: 'done' | 'not_done'` — controla conclusão
- `canceled: boolean` — controla cancelamento, independente do status

**UI de conclusão (checkbox):**
- Checkbox nativo (`<input type="checkbox">`) posicionado ao lado do nome da tarefa
- `checked` vinculado a `todo.status === 'done'`
- `onChange` dispara callback `onToggleDone(id)` que alterna entre `done` / `not_done`
- Nome recebe `line-through opacity-70` quando `isDone`

**UI de cancelamento (botão toggle):**
- Botão nas ações do item com comportamento toggle
- Quando `canceled === false`: exibe `Ban` icon + "Cancel" (amarelo)
- Quando `canceled === true`: exibe `RotateCcw` icon + "Reactivate" (verde)
- Card inteiro recebe `opacity-60` quando cancelado
- Badge "Canceled" aparece ao lado do nome

**Props do ToDoItem:**
```tsx
interface ToDoItemProps {
  todo: ToDo;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggleDone?: (id: string) => void;
  onToggleCancel?: (id: string) => void;
}
```

**Handlers no ToDoList:**
- `handleToggleDone`: lê status atual, inverte, dispatch `updateTodo({ id, data: { status } })`
- `handleToggleCancel`: lê `canceled` atual, inverte, dispatch `updateTodo({ id, data: { canceled } })`

---

## Checklist de Implementação

- [ ] Criar projeto com Vite (React + TypeScript)
- [ ] Configurar TailwindCSS
- [ ] Criar estrutura de pastas
- [ ] Configurar Redux Toolkit
- [ ] Configurar Axios
- [ ] Criar sistema de cores
- [ ] Implementar Atoms (Button, Input, Select)
- [ ] Implementar Molecules (Header, ToDoItem)
- [ ] Implementar Organisms (ToDoForm, ToDoList)
- [ ] Criar mocks e services
- [ ] Montar página Home
- [ ] Testar responsividade em todos breakpoints
