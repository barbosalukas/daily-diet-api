# Daily Diet API

Uma API REST para controle de dieta diária, permitindo usuários registrarem e acompanharem suas refeições com métricas de desempenho.

## 🚀 Stack Utilizado

- **Node.js** + **Fastify** + **TypeScript**
- **SQLite** para desenvolvimento
- **Knex.js** para gerenciamento de migrations
- **Zod** para validação de dados
- **@fastify/cookie** para gerenciamento de sessão
- **ESLint** para linting

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/barbosalukas/daily-diet-api.git
cd daily-diet-api
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Execute as migrations:
```bash
npm run knex migrate:latest
```

## ▶️ Como rodar

**Desenvolvimento:**
```bash
npm run dev
```

A API estará disponível em `http://localhost:3333`

**Lint:**
```bash
npm run lint
```

## 📚 Rotas da API

### Usuários

**POST `/users`** — Criar novo usuário
```json
{
  "name": "João Silva",
  "email": "joao@example.com"
}
```
Retorna um cookie `sessionId` para identificação nas próximas requisições.

---

### Refeições

**POST `/meals`** — Registrar uma refeição (requer autenticação)
```json
{
  "name": "Almoço",
  "description": "Frango com arroz integral",
  "isOnDiet": true,
  "date": "2024-01-15T12:30:00"
}
```

**GET `/meals`** — Listar todas as refeições do usuário (requer autenticação)

**GET `/meals/:mealId`** — Buscar uma refeição específica (requer autenticação)

**PUT `/meals/:mealId`** — Editar uma refeição (requer autenticação)
```json
{
  "name": "Almoço",
  "description": "Frango com salada",
  "isOnDiet": true,
  "date": "2024-01-15T12:30:00"
}
```

**DELETE `/meals/:mealId`** — Deletar uma refeição (requer autenticação)

**GET `/meals/metrics`** — Obter métricas do usuário (requer autenticação)
```json
{
  "totalMeals": 10,
  "totalMealsOnDiet": 7,
  "totalMealsOffDiet": 3,
  "bestOnDietSequence": 5
}
```

## 🔐 Autenticação

A API usa sessão baseada em cookie. Quando você cria um usuário, recebe um cookie `sessionId` que deve ser enviado nas próximas requisições automaticamente.

## 📁 Estrutura do projeto

```
src/
├── @types/           # Tipos TypeScript customizados
├── database.ts       # Configuração do Knex
├── env/              # Variáveis de ambiente
├── middlewares/      # Middlewares (validação de sessão)
├── routes/           # Rotas da API
└── server.ts         # Inicialização do Fastify

db/
└── migrations/       # Migrations do Knex
```

## 📝 Licença

MIT

## 👨‍💻 Autor

[Lukas Barbosa](https://github.com/barbosalukas)
