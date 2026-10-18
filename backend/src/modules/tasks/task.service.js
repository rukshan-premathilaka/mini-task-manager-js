const taskRepository = require("./task.repository");

function createNotFoundError() {
	const error = new Error("Task not found.");
	error.statusCode = 404;
	return error;
}

async function getAllTasks() {
	return taskRepository.findAll();
}

async function createTask(title) {
	return taskRepository.create(title);
}

async function updateTask(id, completed) {
	const task = await taskRepository.updateCompleted(id, completed);

	if (!task) {
		throw createNotFoundError();
	}

	return task;
}

async function deleteTask(id) {
	const deleted = await taskRepository.remove(id);

	if (!deleted) {
		throw createNotFoundError();
	}
}

module.exports = {
	getAllTasks,
	createTask,
	updateTask,
	deleteTask,
};