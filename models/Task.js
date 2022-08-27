const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Task = db.define('tasks',{
    tasks:{
        type: DataTypes.STRING,
        require: true,
    },
    done:{
        type: DataTypes.BOOLEAN,
        require: true,
    }
})

module.exports = Task