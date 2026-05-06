# Todo App - Server

Express.js REST API with TypeScript and MongoDB.

## Tech Stack

- Node.js v22
- Express.js
- TypeScript
- MongoDB + Mongoose
- tsx (TypeScript runner)

## Setup

### Prerequisites

- Node.js v22+
- A MongoDB Atlas account (free tier works)

### Installation

```bash
cd server
npm install
```

### Environment Variables

Create a `.env` file in the `/server` directory:

```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

To get your MongoDB URI:

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a free cluster
3. Click Connect → Drivers → Copy the connection string
4. Replace `<password>` with your database user password

### Run in Development

```bash
npm run dev
```

Server runs on `http://localhost:5000`

## API Endpoints

| Method | Endpoint            | Description              |
| ------ | ------------------- | ------------------------ |
| GET    | /api/todos          | Get all todos            |
| POST   | /api/todos          | Create a todo            |
| PUT    | /api/todos/:id      | Update title/description |
| PATCH  | /api/todos/:id/done | Toggle done status       |
| DELETE | /api/todos/:id      | Delete a todo            |

## Assumptions and Limitations

- No authentication — todos are shared across all users
- No unit or integration tests
- No pagination — all todos are returned in a single request
- MongoDB Atlas is required (no local MongoDB setup instructions)
