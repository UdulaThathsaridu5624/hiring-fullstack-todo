# hiring-fullstack-todo

A full-stack TODO application built with React, Express, TypeScript and MongoDB.

## Repository Structure

```
hiring-fullstack-todo/
├── client/     # React + Vite frontend
├── server/     # Express backend
└── README.md
```

## Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/UdulaThathsaridu5624/hiring-fullstack-todo.git
cd hiring-fullstack-todo
```

### 2. Setup and run the server

```bash
cd server
npm install
# create .env with PORT and MONGO_URI (see server/README.md)
npm run dev
```

### 3. Setup and run the client

```bash
cd client
npm install
# create .env with VITE_API_URL (see client/README.md)
npm run dev
```

### Or run both from root (in separate terminals)

```bash
# Terminal 1
npm run dev:server

# Terminal 2
npm run dev:client
```

## See Also

- [Client README](./client/README.md)
- [Server README](./server/README.md)
