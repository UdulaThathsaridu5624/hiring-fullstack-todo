# Todo App - Client

React frontend with TypeScript, Tailwind CSS and shadcn/ui.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Axios

## Setup

### Prerequisites

- Node.js v22+
- Backend server running on `http://localhost:3000`

### Installation

```bash
cd client
npm install
```

### Environment Variables

Create a `.env` file in the `/client` directory:

```
VITE_API_URL=http://localhost:3000/api/todos
```

### Run in Development

```bash
npm run dev
```

Client runs on `http://localhost:5173`

## Features

- View all todos
- Create a todo with title and optional description
- Edit a todo inline
- Toggle done status with optimistic updates
- Delete a todo with fade-out animation and optimistic updates
- Optimistic updates for all actions (add, edit, toggle, delete)
- Form validation
- Loading and error states
- Smooth transitions on todo completion

## Assumptions and Limitations

- Requires the backend server to be running
- No authentication
- No unit or integration tests
- No pagination
