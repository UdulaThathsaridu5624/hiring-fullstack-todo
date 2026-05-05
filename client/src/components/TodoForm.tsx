import { useState, type SyntheticEvent } from "react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface TodoFormProps {
  onAdd: (title: string, description?: string) => void;
}

const TodoForm = ({ onAdd }: TodoFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
    }
    onAdd(title.trim(), description.trim() || undefined);
    setTitle("");
    setDescription("");
    setError(null);
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit">Add Todo</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TodoForm;
