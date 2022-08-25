const Task = require('../models/Task')

module.exports = class TaskController{
    static async home(req,res){
        const tasks = await Task.findAll({raw:true})
        res.render('tasks/home',{tasks})
        
    }

    static async remove(req,res){
        const id = req.params.id
        await Task.destroy({where:{id:id}})
        res.redirect('/')
    }

    static async edit(req,res){
        const id = req.params.id
        const rawTasks = await Task.findOne({where:{id:id}})
        const tasks = rawTasks.dataValues.tasks
        res.render('tasks/editTask',{tasks,id})
    }

    static async postInsert(req,res){
        const tarefa = req.body.tarefa
        await Task.create({tasks:tarefa})
        res.redirect('/')
    }

    static async postEdit(req,res){
        const id = req.body.id
        const tasks = {tasks:req.body.editTask}
        await Task.update(tasks,{where: { id:id } })
        res.redirect('/')
    }
}