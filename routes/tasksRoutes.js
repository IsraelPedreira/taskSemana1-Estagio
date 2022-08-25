const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/TaskController')

router.post('/tasks/insert', TaskController.postInsert)
router.post('/tasks/edit', TaskController.postEdit)
router.get('/tasks/remove/:id', TaskController.remove)
router.get('/tasks/edit/:id', TaskController.edit)
router.get('/', TaskController.home)


module.exports = router