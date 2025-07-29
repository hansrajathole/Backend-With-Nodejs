# Prisma + PostgreSQL + Neon Quickstart

---

**SQL (Relational Database)**  
SQL is a structured, table-based database that uses predefined schemas and supports relationships between data using SQL queries.

**NoSQL (Non-Relational Database)**  
NoSQL is a flexible, schema-less database designed for scalable and fast handling of unstructured or semi-structured data.

---

## 1. What is Prisma?
Prisma is an open-source ORM (Object-Relational Mapping) tool that makes working with databases easier in Node.js and JavaScript/TypeScript.

🔧 **What Prisma Does:**
- It lets you define your data models using a special schema.prisma file.
- It generates auto-complete-enabled CRUD queries to your database.
- It handles migrations—a way to keep your database schema in sync with your code.

---

## 2. What is PostgreSQL?
PostgreSQL is a powerful, open-source relational database system. You can store data in tables, define relationships, run queries (using SQL), and ensure data integrity.

---

## 3. What is Prisma Migrate?
Prisma Migrate is a feature of Prisma that allows you to:
- Automatically generate and run SQL migration files.
- Version-control your database schema changes.
- Keep your PostgreSQL database schema in sync with your Prisma models.

---

## 4. What is Neon?
Neon is a serverless PostgreSQL platform. Think of it like:
- PostgreSQL + GitHub + Vercel — it's made for cloud-based development.
- Free tier available.
- You can create a cloud-hosted PostgreSQL DB in minutes.

---

## 5. Step-by-Step: Implementing Prisma with PostgreSQL using JavaScript

### 🛠️ Step 1: Install Dependencies
First, create a new Node.js project:

```bash
mkdir prisma-postgres
cd prisma-postgres
npm init -y
```

Then install Prisma and PostgreSQL driver:

```bash
npm install prisma --save-dev
npm install @prisma/client
```

Initialize Prisma:

```bash
npx prisma init
```

 This creates:
- `prisma/schema.prisma`: The Prisma schema file.
- `.env`: Where you store your database URL.

---

### 🧑‍💻 Step 2: Create a Neon PostgreSQL DB (Optional but recommended)
- Go to https://neon.tech
- Sign up and create a new project.
- Copy the connection string. It will look like:

```
postgresql://<user>:<password>@<host>/<dbname>?sslmode=require
```

Paste it in your `.env` file:

```
DATABASE_URL="postgresql://..."
```

---

### 📐 Step 3: Define Your Data Model in schema.prisma

Example `schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
}
```

This means:
- You are defining a User table.
- Each user has id, name, email, createdAt.
- Prisma will turn this into SQL and apply it to your PostgreSQL DB.

---

### 📦 Step 4: Run Prisma Migrations

```bash
npx prisma migrate dev --name init
```

✔️ This will:
- Generate a SQL migration file.
- Apply it to the PostgreSQL database.
- Create a `prisma/migrations/` folder to track changes.

---

### 🔌 Step 5: Use Prisma Client in JavaScript

Create `index.js`:

```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Hansraj Athole',
      email: 'hansraj@example.com',
    },
  });

  console.log('User created:', user);

  const allUsers = await prisma.user.findMany();
  console.log('All users:', allUsers);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Run:

```bash
node index.js
```

---

## 📦 Prisma Folder Structure

```
.
├── prisma/
│   ├── schema.prisma       --> Data models
│   └── migrations/         --> SQL migration history
├── node_modules/
├── .env                    --> Database URL
├── package.json
├── index.js                --> Your JS logic
```

---

## 🌐 Useful Prisma Commands

| Command                                 | What it Does                  |
|------------------------------------------|-------------------------------|
| npx prisma init                         | Initializes Prisma            |
| npx prisma migrate dev --name NAME       | Applies changes to DB         |
| npx prisma studio                       | Opens a GUI to view/edit DB   |
| npx prisma generate                     | Generates client              |
| npx prisma db push                      | Sync schema with DB (no migration) |

---

## Concepts

| Concept         | Description                        |
|-----------------|------------------------------------|
| Prisma          | ORM for Node.js                    |
| Prisma Client   | Auto-generated DB access code      |
| Prisma Migrate  | Handles schema changes + versioning|
| PostgreSQL      | Relational DB                      |
| Neon
