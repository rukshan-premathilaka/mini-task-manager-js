const taskService = require("./task.service");

const {
	validateCreateTask,
	validateTaskId,
	validateUpdateTask,
} = require("./task.validation");

async function getAllTasks(req, res, next) {
	try {
		const tasks = await taskService.getAllTasks();
		res.status(200).json(tasks);
	} catch (error) {
		next(error);
	}
}

async function createTask(req, res, next) {
	try {
		const { title } = validateCreateTask(req.body);
		const task = await taskService.createTask(title);

		res.status(201).json(task);
	} catch (error) {
		next(error);
	}
}

async function updateTask(req, res, next) {
	try {
		const id = validateTaskId(req.params.id);
		const { completed } = validateUpdateTask(req.body);

		const task = await taskService.updateTask(id, completed);

		res.status(200).json(task);
	} catch (error) {
		next(error);
	}
}

async function deleteTask(req, res, next) {
	try {
		const id = validateTaskId(req.params.id);

		await taskService.deleteTask(id);

		res.status(204).end();
	} catch (error) {
		next(error);
	}
}

module.exports = {
	getAllTasks,
	createTask,
	updateTask,
	deleteTask,
};