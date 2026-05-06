import { useState } from "react";
import type { Todo } from "../api/todos";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description?: string) => void;
}

const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");
  const [editError, setEditError] = useState<string | null>(null);

  const handleEdit = () => {
    if (!title.trim()) {
      setEditError("Title is required");
      return;
    }
    onEdit(todo._id, title.trim(), description.trim() || undefined);
    setIsEditing(false);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(todo._id), 200);
  };

  if (isEditing) {
    return (
      <Card className={`mb-3 transition-opacity duration-200 ${todo.done ? "opacity-50" : ""}`}>
        <CardContent className="pt-4 flex flex-col gap-3">
          <Input value={title} onChange={(e) => { setTitle(e.target.value); setEditError(null); }} />
          {editError && <p className="text-sm text-red-500">{editError}</p>}
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleEdit}>
              Save
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`mb-3 transition-opacity duration-200 ${todo.done ? "opacity-50" : ""} ${isDeleting ? "todo-deleting" : ""}`}
    >
      <CardContent className="pt-4 flex items-start gap-3">
        <Checkbox
          checked={todo.done}
          onCheckedChange={() => onToggle(todo._id)}
          className="mt-1"
        />
        <div className="flex-1">
          <p
            className={`font-medium transition-all duration-300 ${todo.done ? "line-through text-muted-foreground" : ""}`}
          >
            {todo.title}
          </p>
          {todo.description && (
            <p className="text-sm text-muted-foreground mt-1">
              {todo.description}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoItem;
