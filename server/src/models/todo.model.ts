import mongoose from "mongoose";

export interface ITodo {
  title: string;
  description?: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const todoSchema = new mongoose.Schema<ITodo>(
  {
    title: { type: String, required: true ,trim:true},
    description: { type: String ,trim:true},
    done: { type: Boolean, default: false,trim:true },
  },
  { timestamps: true },
);

const Todo = mongoose.model<ITodo>("Todo", todoSchema);

export default Todo;