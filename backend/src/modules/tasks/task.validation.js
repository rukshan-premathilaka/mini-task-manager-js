function validateCreateTask(body) {
	if (
		!body ||
		typeof body.title !== "string" ||
		!body.title.trim()
	) {
		const error = new Error("Task title is required.");
		error.statusCode = 400;
		throw error;
	}

	if (body.title.trim().length > 200) {
		const error = new Error(
			"Task title cannot exceed 200 characters."
		);
		error.statusCode = 400;
		throw error;
	}

	return {
		title: body.title.trim(),
	};
}

function validateTaskId(value) {
	const id = Number(value);

	if (!Number.isSafeInteger(id) || id < 1) {
		const error = new Error("Task ID must be a positive integer.");
		error.statusCode = 400;
		throw error;
	}

	return id;
}

function validateUpdateTask(body) {
	if (!body || typeof body.completed !== "boolean") {
		const error = new Error(
			"The completed field must be true or false."
		);
		error.statusCode = 400;
		throw error;
	}

	return {
		completed: body.completed,
	};
}

module.exports = {
	validateCreateTask,
	validateTaskId,
	validateUpdateTask,
};