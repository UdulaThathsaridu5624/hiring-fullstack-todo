import { useEffect, useState } from "react";
import axios from "axios";
import { createTodo, deleteTodo, getTodos, toggleDone, updateTodo, type Todo } from "../api/todos";

const getErrorMessage = (err: unknown, fallback: string): string => {
    if (axios.isAxiosError(err)) return err.response?.data?.message || fallback;
    return fallback;
}


const useTodos = () =>{
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const showError = (message: string) => {
        setError(message);
    }

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
        }catch(err){
            setTodos(prev => prev.filter(todo => todo._id !== tempId));
            showError(getErrorMessage(err, "Failed to add todo"));
        }
    }

    const editTodo = async (id: string, title: string, description?: string) => {
        const previous = todos.find(todo => todo._id === id);
        setTodos(prev => prev.map(todo => todo._id === id ? { ...todo, title, description } : todo));
        try{
            const updated = await updateTodo(id, title, description);
            setTodos(prev => prev.map(todo => todo._id === id ? updated : todo));
        }catch(err){
            if(previous) setTodos(prev => prev.map(todo => todo._id === id ? previous : todo));
            showError(getErrorMessage(err, "Failed to edit todo"));
        }
    }

    const toggleTodo = async (id: string) => {
        setTodos(prev => prev.map(todo => todo._id === id ? {...todo, done: !todo.done} : todo));
        try{
            await toggleDone(id);
        } catch(err) {
            setTodos(prev => prev.map(todo => todo._id === id ? {...todo, done: !todo.done} : todo));
            showError(getErrorMessage(err, "Failed to toggle todo"));
        }
    }

    const removeTodo = async(id: string) => {
        setTodos(prev => prev.filter(todo => todo._id !== id));
        try{
            await deleteTodo(id);
        }catch(err){
            fetchTodos();
            showError(getErrorMessage(err, "Failed to delete todo"));
        }
    }

    return { todos, loading, error, addTodo, editTodo, toggleTodo, removeTodo }
}

export default useTodos;