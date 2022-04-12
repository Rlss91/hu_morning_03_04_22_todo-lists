const express = require("express");
const router = express.Router();

const todoValidation = require("../../validation/todo.validation");
const todoModel = require("../../models/todo.model");
//http://localhost:3000/api/todo/task
//create new task in todo
router.post("/", async (req, res) => {
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
      validatedValue._id, //id of todo
      validatedValue.cmd,
      validatedValue.isDone
    );
    res.json({ msg: "todo updated" });
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
