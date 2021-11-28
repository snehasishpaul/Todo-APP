const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const Todo = require("./model/todoModel");
const methodOverride = require("method-override");

mongoose
    .connect("mongodb://localhost:27017/todoList")
    .then(() => {
        console.log("Database Connected");
    })
    .catch((err) => {
        console.log("Connection Failed:", err);
    });

//middle wares
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/todos", async (req, res) => {
    const todos = await Todo.find({});
    res.render("todos", { todos });
});

app.get("/todos/new", (req, res) => {
    res.render("new");
});

app.post("/todos", async (req, res) => {
    console.log(req.body);
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.redirect("todos");
});

app.get("/todos/:id", async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    res.render("show", { todo });
});

app.get("/todos/:id/edit", async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    res.render("edit", { todo });
});

app.put("/todos/:id", async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });
    res.redirect(`/todos/${todo._id}`);
});

app.delete("/todos/:id", async (req, res) => {
    const { id } = req.params;
    await Todo.findByIdAndRemove(id);
    res.redirect("/todos");
});

app.listen(3000, () => {
    console.log("Listening on PORT 3000...");
});

// get(/todos - list all todos)
// get(/todos/new - new todo input)
// get(/todos/:id - individual todo)
// put(/todos/:id/edit - update todo)
// delete(/todos/:id - delete todo)
