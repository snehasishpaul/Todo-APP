const mongoose = require("mongoose");
const Todo = require("./model/todoModel.js");

mongoose
    .connect("mongodb://localhost:27017/todoList")
    .then(() => {
        console.log("Database Connected");
    })
    .catch((err) => {
        console.log("Connection Failed:", err);
    });

const fakeData = [
    {
        name: "david",
        desc: "watch netflix",
    },
    {
        name: "dynamo",
        desc: "play guitar",
    },
    {
        name: "john",
        desc: "do some coding",
    },
];

async function populate() {
    await Todo.deleteMany({});
    await Todo.insertMany(fakeData);
    console.log("Insertion Done! ");
}

populate().then(() => {
    mongoose.connection.close();
});
