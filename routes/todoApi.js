const Todo = require("../models/todoSchema");
const passport = require("passport");
// const BearerStrategy = require("passport-http-bearer").Strategy;
const User = require("../models/userSchema");
module.exports = function (app) {
  // get all todo
  app.get(
    "/todo",
    passport.authenticate("bearer", { session: false }),
    async (req, res) => {
      const user = await User.findById(req.user.user);
      console.log(user);
      if (!user) return res.status(401).send({ message: "Unauthorized" });
      const todo = await Todo.find();
      res.send(todo);
    }
  );

  //get todo by id
  app.get(
    "/todo/:id",
    passport.authenticate("bearer", { session: false }),
    async (req, res) => {
      const todo = await Todo.findById(req.params.id);
      res.send(todo);
    }
  );

  // save new todo
  app.post(
    "/todo",
    passport.authenticate("bearer", { session: false }),
    async (req, res) => {
      const user = await User.findById(req.user.user._id);
      const todoTask = new Todo(req.body);
      await todoTask.save();
      await User.findByIdAndUpdate(user._id, {
        $push: { todosId: todoTask._id },
      });
      res.send(todoTask);
    }
  );

  //update todo by id
  app.put(
    "/todo/:id",
    passport.authenticate("bearer", { session: false }),
    async (req, res) => {
      Todo.findByIdAndUpdate({ _id: req.params.id }, req.body).then((todo) => {
        res.send(todo);
      });
    }
  );
  //delete todo
  app.delete(
    "/todo/:id",
    passport.authenticate("bearer", { session: false }),
    async (req, res) => {
      Todo.findByIdAndRemove({ _id: req.params.id }).then(function (todo) {
        res.send(todo);
      });
    }
  );
};
