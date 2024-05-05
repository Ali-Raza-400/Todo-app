import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Todo from "../models/todoModel.js";

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getTodo = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log("user", user);
  if (user) {
    const response = await Todo.find();
    res.json(response);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const saveTodo = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
  
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
  
    // Check if req.body.todo_id exists
    if (req.body.todo_id) {
      const todoExists = await Todo.findById(req.body.todo_id);
      if (!todoExists) {
        res.status(404);
        throw new Error("Todo not found");
      }
      // Update existing todo
      todoExists.title = req.body.title || todoExists.title;
      todoExists.description = req.body.description || todoExists.description;
      await todoExists.save();
      res.status(200).json({ msg: "Todo updated successfully", data: todoExists });
    } else {
      // Create new todo
      const { title, description } = req.body;
      const todo = await Todo.create({ title, description });
      res.status(200).json({ msg: "Todo created successfully", data: todo });
    }
  });

  // @desc    Delete user profile
// @route   DELETE /api/users/Todos
const deleteTodo = async(req, res) => {
    const user = await User.findById(req.user._id);
    if(user) {
        const todoExists = await Todo.findById(req.body.todo_id);
        if(todoExists) {
            todoExists.deleteOne();
            res.status(200).json({ msg: "Todo deleted successfully" });
        } else {
            res.status(404);
            throw new Error("Todo not found");
        }
    }
}
  
export { saveTodo, getTodo,deleteTodo };
