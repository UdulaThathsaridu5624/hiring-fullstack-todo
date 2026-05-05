import { NextFunction, Request,Response } from "express";
import Todo from "../models/todo.model";

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
    const todo = await Todo.create({ title, description })
    res.status(201).json(todo)
  } catch (err) {
    next(err)
  }
}

export const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description } = req.body
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    )
    if (!todo) {
      res.status(404).json({ message: 'Todo not found' })
      return
    }
    res.json(todo)
  } catch (err) {
    next(err)
  }
}

export const toggleDone = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todo = await Todo.findById(req.params.id)
    if (!todo) {
      res.status(404).json({ message: 'Todo not found' })
      return
    }
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
    if (!todo) {
      res.status(404).json({ message: 'Todo not found' })
      return
    }
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}
