const express = require("express");
const router = express.Router();

const todoValidation = require("../../validation/todo.validation");
const todoModel = require("../../models/todo.model");

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

module.exports = router;
