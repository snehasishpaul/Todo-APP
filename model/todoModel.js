const mongooose = require("mongoose");

const todoSchema = new mongooose.Schema({
    name: {
        type: String,
    },
    desc: {
        type: String,
    },
});

const Todo = mongooose.model("todo", todoSchema);
module.exports = Todo;
