import { useEffect, useState } from "react";
import { createTodo, deleteTodo, getTodos, toggleDone, updateTodo, type Todo } from "../api/todos";


const useTodos = () =>{
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        fetchTodos();
    },[]);

    const fetchTodos = async () => {
        setLoading(true);
        setError(null);
        try{
            const data = await getTodos();
            setTodos(data);
        }catch{
            setError("Failed to fetch todos");
        }finally{
            setLoading(false);
        }
    }

    const addTodo = async (title: string, description?: string) => {
        const tempId = `temp-${Date.now()}`;
        const tempTodo: Todo = { _id: tempId, title, description, done: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        setTodos(prev => [tempTodo, ...prev]);
        try{
            const newTodo = await createTodo(title, description);
            setTodos(prev => prev.map(todo => todo._id === tempId ? newTodo : todo));
        }catch{
            setTodos(prev => prev.filter(todo => todo._id !== tempId));
            setError("Failed to add todo");
        }
    }

    const editTodo = async (id: string, title: string, description?: string) => {
        const previous = todos.find(todo => todo._id === id);
        setTodos(prev => prev.map(todo => todo._id === id ? { ...todo, title, description } : todo));
        try{
            const updated = await updateTodo(id, title, description);
            setTodos(prev => prev.map(todo => todo._id === id ? updated : todo));
        }catch{
            if(previous) setTodos(prev => prev.map(todo => todo._id === id ? previous : todo));
            setError("Failed to edit todo");
        }
    }

    const toggleTodo = async (id: string) => {
        setTodos(prev => prev.map(todo => todo._id === id ? {...todo, done: !todo.done} : todo));
        try{
            await toggleDone(id);
        } catch {
            setTodos(prev => prev.map(todo => todo._id === id ? {...todo, done: !todo.done} : todo));
            setError("Failed to toggle todo");
        }
    }

    const removeTodo = async(id: string) => {
        setTodos(prev => prev.filter(todo => todo._id !== id));
        try{
            await deleteTodo(id);
        }catch{
            fetchTodos();
            setError("Failed to delete todo");
        }
    }

    return { todos, loading, error, addTodo, editTodo, toggleTodo, removeTodo }
}

export default useTodos;