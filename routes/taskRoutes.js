const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth ,taskController.getTasks)
router.post('/', taskController.createTask)
router.put('/:id', taskController.updateTask)
router.delete('/:id', taskController.deleteTask)

module.exports = router