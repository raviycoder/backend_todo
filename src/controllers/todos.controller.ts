import { Request, Response } from "express";
import Todo from "../models/todos.model";
import { decodeUser } from "../utils/decode";

export async function createTodo(req: Request, res: Response) {
  try {
    const { title, description, alarmAt } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const user = await decodeUser(req.cookies.todo_token);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const newTodo = new Todo({
      title,
      description,
      userId: user?._id,
      alarmAt,
    });

    const savedTodo = await newTodo.save();
    return res
      .status(201)
      .json({ message: "Todo successfully created", savedTodo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getTodos(req: Request, res: Response) {
  try {
    const user = await decodeUser(req.cookies.todo_token);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const todos = await Todo.find({ userId: user?._id, deletedAt:false });
    return res
      .status(200)
      .json({ message: "Todos fetched successfully", todos });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteTodo(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { isdeleteData } = req.body;
    if (isdeleteData) {
      const todo = await Todo.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ message: "Todo deleted successfully", todo });
    } else {
      const todo = await Todo.findByIdAndUpdate(
        id,
        { deletedAt: true },
        { new: true }
      );
      return res
        .status(200)
        .json({ message: "Todo deleted successfully", todo });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateTodo(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json({ message: "Todo updated successfully", todo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function completedTodo(req: Request, res: Response) {
  try {
    const { id } = req.params;
    console.log("hero", id);
    const todo = await Todo.findByIdAndUpdate(
      id,
      { completed: true },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Todo completed successfully", todo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function uncompletedTodo(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndUpdate(
      id,
      { completed: false },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Todo uncompleted successfully", todo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getCompletedTodos(req: Request, res: Response) {
  try {
    const user = await decodeUser(req.cookies.todo_token);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const todos = await Todo.find({ userId: user?._id, completed: true, deletedAt:false });
    return res
      .status(200)
      .json({ message: "Completed todos fetched successfully", todos });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getUncompletedTodos(req: Request, res: Response) {
  try {
    const user = await decodeUser(req.cookies.todo_token);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const todos = await Todo.find({ userId: user?._id, completed: false, deletedAt:false });
    return res
      .status(200)
      .json({ message: "Uncompleted todos fetched successfully", todos });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getDeletedTodos(req: Request, res: Response) {
  try {
    const user = await decodeUser(req.cookies.todo_token);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const todos = await Todo.find({ userId: user?._id, deletedAt: true });
    return res
      .status(200)
      .json({ message: "Deleted todos fetched successfully", todos });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function restoreTodo (req: Request, res: Response) {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndUpdate(
      id,
      { deletedAt: false },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Todo restored successfully", todo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}