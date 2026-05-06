import { NextFunction, Request,Response } from "express";
import Todo from "../models/todo.model";
import { createAppError } from "../middleware/errorHandler";

export const getAllTodos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 })
    res.json(todos)
  } catch (err) {
    next(err)
  }
}


export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description } = req.body
    if (!title?.trim()) return next(createAppError('Title is required', 400))
    if (description !== undefined && description !== null && typeof description !== 'string') return next(createAppError('Description must be a string', 400))
    const todo = await Todo.create({ title: title.trim(), description })
    res.status(201).json(todo)
  } catch (err) {
    next(err)
  }
}

export const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description } = req.body
    if (!title?.trim()) return next(createAppError('Title is required', 400))
    if (description !== undefined && description !== null && typeof description !== 'string') return next(createAppError('Description must be a string', 400))
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title: title.trim(), description },
      { new: true }
    )
    if (!todo) return next(createAppError('Todo not found', 404))
    res.json(todo)
  } catch (err) {
    next(err)
  }
}

export const toggleDone = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todo = await Todo.findById(req.params.id)
    if (!todo) return next(createAppError('Todo not found', 404))
    todo.done = !todo.done
    await todo.save()
    res.json(todo)
  } catch (err) {
    next(err)
  }
}

export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id)
    if (!todo) return next(createAppError('Todo not found', 404))
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}
