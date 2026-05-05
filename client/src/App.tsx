import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import useTodos from "./hooks/useTodos";

function App() {
  const { todos, loading, error, addTodo, editTodo, toggleTodo, removeTodo } =
    useTodos();
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center">Todo App</h1>
        <TodoForm onAdd={addTodo} />
        {error && (
          <p className="text-sm text-red-500 mb-4 text-center">{error}</p>
        )}
        {loading ? (
          <p className="text-center text-muted-foreground">Loading...</p>
        ) : (
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={removeTodo}
            onEdit={editTodo}
          />
        )}
      </div>
    </div>
  );
}

export default App;
