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
        const newTodo = await createTodo(title, description);
        setTodos(prev => [newTodo, ...prev]);
    }

    const editTodo = async (id: string, title: string, description?: string) => {
        const updated = await updateTodo(id, title, description);
       setTodos(prev => prev.map(todos => todos._id === id ? updated : todos))
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