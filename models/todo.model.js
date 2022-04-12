const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title: { type: String, required: true },
  createdBy: { type: mongoose.Types.ObjectId, required: true },
  tasks: [{ cmd: String, isDone: Boolean }],
});

const Todo = mongoose.model("Todos", todoSchema);

const selectTodosByCreatedId = (createdBy) => {
  return Todo.find({ createdBy });
};

const insertTodo = (title, createdBy, tasks) => {
  const newTodo = new Todo({
    title,
    createdBy,
    tasks,
  });
  return newTodo.save();
};

const insertTaskToTodoByTodoId = (_id, cmd, isDone) => {
  return Todo.updateOne(
    { _id },
    {
      $push: {
        tasks: { cmd, isDone },
      },
    }
  );
};

const updateTaskTitleByTodoId = (_id, createdBy, title) => {
  return Todo.updateOne({ $and: [{ _id }, { createdBy }] }, { title });
};

const deleteTaskByTodoId = (_id, createdBy) => {
  return Todo.deleteOne({ $and: [{ _id }, { createdBy }] });
};

module.exports = {
  insertTodo,
  insertTaskToTodoByTodoId,
  selectTodosByCreatedId,
  updateTaskTitleByTodoId,
  deleteTaskByTodoId,
};
