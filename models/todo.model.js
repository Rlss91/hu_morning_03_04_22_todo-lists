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

const updateTodoTitleByTodoId = (_id, createdBy, title) => {
  return Todo.updateOne({ $and: [{ _id }, { createdBy }] }, { title });
};

const updateTaskByTodoId = (_id, _idTask, createdBy, cmd, isDone) => {
  return Todo.updateOne(
    { _id, tasks: { $elemMatch: { _id: _idTask } }, createdBy },
    { "tasks.$.cmd": cmd, "tasks.$.isDone": isDone }
  );
};

const deleteTodoByTodoId = (_id, createdBy) => {
  return Todo.deleteOne({ $and: [{ _id }, { createdBy }] });
};

const deleteTaskByTodoId = (_id, _idTask, createdBy) => {
  return Todo.updateOne(
    { _id, createdBy },
    {
      $pull: { tasks: { _id: _idTask } },
    }
  );
};

module.exports = {
  insertTodo,
  insertTaskToTodoByTodoId,
  selectTodosByCreatedId,
  updateTodoTitleByTodoId,
  updateTaskByTodoId,
  deleteTodoByTodoId,
  deleteTaskByTodoId,
};
