const Task = require('../models/Task')

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
        res.render("tasks", { tasks: tasks})
    } catch(err) {
        console.log(err)
    }
}

exports.createTask = async (req, res) => {
    try {
        await Task.create({
            taskName: req.body.taskName,
            taskDescription: req.body.taskDescription
        })

        res.redirect('/tasks')
    } catch(err) {
        console.log(err)
    }
}

exports.updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        await Task.findByIdAndUpdate(
            {_id: taskId},
        {
            taskName: req.body.taskName,
            taskDescription: req.body.taskDescription
        })

        res.redirect('/tasks')
    } catch(err) {
        console.log(err)
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        await Task.findByIdAndDelete({_id: taskId})

        res.redirect('/tasks')
    } catch(err) {
        console.log(err)
    }
}