const API_BASE_URL = (
	import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\/$/, "");

async function request(path, options = {}) {
	const response = await fetch(`${API_BASE_URL}${path}`, {
		...options,
		headers: {
			"Content-Type": "application/json",
			...options.headers,
		},
	});

	// A successful DELETE request has no response body.
	if (response.status === 204) {
		return null;
	}

	const data = await response.json().catch(() => null);

	if (!response.ok) {
		throw new Error(
			data?.message || `Request failed with status ${response.status}`
		);
	}

	return data;
}

const taskService = {
	getTasks() {
		return request("/api/tasks");
	},

	createTask(title) {
		return request("/api/tasks", {
			method: "POST",
			body: JSON.stringify({ title }),
		});
	},

	updateTask(id, completed) {
		return request(`/api/tasks/${id}`, {
			method: "PATCH",
			body: JSON.stringify({ completed }),
		});
	},

	deleteTask(id) {
		return request(`/api/tasks/${id}`, {
			method: "DELETE",
		});
	},
};

export default taskService;