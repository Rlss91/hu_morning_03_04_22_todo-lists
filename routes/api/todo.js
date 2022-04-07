const express = require("express");
const router = express.Router();

const todoValidation = require("../../validation/todo.validation");
const todoModel = require("../../models/todo.model");

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

//create new task in todo
router.post("/newTask", async (req, res) => {
  //id of todo
  //task cmd and task isDone
  try {
    const validatedValue = await todoValidation.taskCreateSchema.validateAsync(
      { ...req.body },
      {
        abortEarly: false,
      }
    );
    const updateTodoInfo = await todoModel.insertTaskToTodoByTodoId(
      validatedValue._id,
      validatedValue.cmd,
      validatedValue.isDone
    );
    res.json({ msg: "todo updated" });
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
