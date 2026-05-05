import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export interface Todo{
    _id: string;
    title: string;
    description?: string;
    done: boolean;
    createdAt: string;
    updatedAt: string;
}

export const getTodos = async (): Promise<Todo[]> => {
  const { data } = await api.get('/')
  return data
}

export const createTodo = async (title: string, description?: string): Promise<Todo> => {
  const { data } = await api.post('/', { title, description })
  return data
}

export const updateTodo = async (id: string, title: string, description?: string): Promise<Todo> => {
  const { data } = await api.put(`/${id}`, { title, description })
  return data
}

export const toggleDone = async (id: string): Promise<Todo> => {
  const { data } = await api.patch(`/${id}/toggle`)
  return data
}

export const deleteTodo = async (id: string): Promise<void> => {
  await api.delete(`/${id}`)
}