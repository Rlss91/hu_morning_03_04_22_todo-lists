const express = require("express");
const router = express.Router();

const taskRouter = require("./todo-task");
const todoValidation = require("../../validation/todo.validation");
const todoModel = require("../../models/todo.model");

//http://localhost:3000/api/todo/task
router.use("/task", taskRouter);

//http://localhost:3000/api/todo/
//get all tasks that was created by user
router.get("/", async (req, res) => {
  try {
    const todos = await todoModel.selectTodosByCreatedId(req.userData._id);
    res.json({ todos });
  } catch (err) {
    res.status(400).json({ err });
  }
});

//create new todo
router.post("/", async (req, res) => {
  try {
    console.log({ ...req.body, createdBy: req.userData._id });
    const validatedValue = await todoValidation.todoCreateSchema.validateAsync(
      { ...req.body, createdBy: req.userData._id },
      {
        abortEarly: true,
      }
    );
    const newTodo = await todoModel.insertTodo(
      validatedValue.title,
      req.userData._id,
      validatedValue.tasks
    );
    res.json({ msg: "created new todo" });
  } catch (err) {
    res.status(400).json({ err });
  }
});

//update todo
router.patch("/", async (req, res) => {
  try {
    const validatedValue = await todoValidation.todoUpdateSchema.validateAsync(
      { ...req.body },
      {
        abortEarly: true,
      }
    );
    const updateTodo = await todoModel.updateTaskTitleByTodoId(
      validatedValue._id,
      req.userData._id,
      validatedValue.title
    );
    res.json({ msg: "todo was updated" });
  } catch (err) {
    res.status(400).json({ err });
  }
});

//delete
router.delete("/", async (req, res) => {
  try {
    const validatedValue = await todoValidation.todoDeleteSchema.validateAsync(
      { ...req.body },
      {
        abortEarly: true,
      }
    );
    const deleteTodo = await todoModel.deleteTaskByTodoId(
      validatedValue._id,
      req.userData._id
    );
    res.json({ msg: "todo was deleted" });
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
