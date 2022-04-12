const express = require("express");
const router = express.Router();

const taskValidation = require("../../validation/todo-task.validation");
const todoModel = require("../../models/todo.model");
//http://localhost:3000/api/todo/task
//create new task in todo
router.post("/", async (req, res) => {
  //id of todo
  //task cmd and task isDone
  try {
    const validatedValue = await taskValidation.taskCreateSchema.validateAsync(
      { ...req.body },
      {
        abortEarly: false,
      }
    );
    const updateTodoInfo = await todoModel.insertTaskToTodoByTodoId(
      validatedValue._id, //id of todo
      validatedValue.cmd,
      validatedValue.isDone
    );
    res.json({ msg: "todo updated" });
  } catch (err) {
    console.log("error from todo-task post", err);
    res.status(400).json({ err });
  }
});

//update task
router.patch("/", async (req, res) => {
  try {
    const validatedValue = await taskValidation.taskUpdateSchema.validateAsync(
      { ...req.body },
      {
        abortEarly: false,
      }
    );
    const updateTodoInfo = await todoModel.updateTaskByTodoId(
      validatedValue._id, //id of todo
      validatedValue._idTask,
      req.userData._id,
      validatedValue.cmd,
      validatedValue.isDone
    );
    res.json({ msg: "task updated" });
  } catch (err) {
    res.status(400).json({ err });
  }
});

//delete task
router.delete("/", async (req, res) => {
  try {
    const validatedValue = await taskValidation.taskDeleteSchema.validateAsync(
      { ...req.body },
      {
        abortEarly: false,
      }
    );
    const updateTodoInfo = await todoModel.deleteTaskByTodoId(
      validatedValue._id, //id of todo
      validatedValue._idTask,
      req.userData._id
    );
    res.json({ msg: "task deleted" });
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
