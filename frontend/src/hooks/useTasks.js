import { useCallback, useEffect, useState } from "react";
import taskService from "../services/taskService";

export default function useTasks() {
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isCreating, setIsCreating] = useState(false);
	const [pendingTaskIds, setPendingTaskIds] = useState([]);
	const [error, setError] = useState("");

	const loadTasks = useCallback(async () => {
		setLoading(true);
		setError("");

		try {
			const data = await taskService.getTasks();
			setTasks(data);
		} catch (err) {
			setError(err.message || "Unable to load tasks.");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		void loadTasks();
	}, [loadTasks]);

	async function addTask(title) {
		setIsCreating(true);
		setError("");

		try {
			const createdTask = await taskService.createTask(title);
			setTasks((currentTasks) => [createdTask, ...currentTasks]);
			return true;
		} catch (err) {
			setError(err.message || "Unable to create task.");
			return false;
		} finally {
			setIsCreating(false);
		}
	}

	async function toggleTask(task) {
		setPendingTaskIds((current) => [...current, task.id]);
		setError("");

		try {
			const updatedTask = await taskService.updateTask(
				task.id,
				!task.completed
			);

			setTasks((currentTasks) =>
				currentTasks.map((item) =>
					item.id === updatedTask.id ? updatedTask : item
				)
			);
		} catch (err) {
			setError(err.message || "Unable to update task.");
		} finally {
			setPendingTaskIds((current) =>
				current.filter((id) => id !== task.id)
			);
		}
	}

	async function removeTask(taskId) {
		setPendingTaskIds((current) => [...current, taskId]);
		setError("");

		try {
			await taskService.deleteTask(taskId);
			setTasks((currentTasks) =>
				currentTasks.filter((task) => task.id !== taskId)
			);
		} catch (err) {
			setError(err.message || "Unable to delete task.");
		} finally {
			setPendingTaskIds((current) =>
				current.filter((id) => id !== taskId)
			);
		}
	}

	function clearError() {
		setError("");
	}

	return {
		tasks,
		loading,
		isCreating,
		pendingTaskIds,
		error,
		loadTasks,
		addTask,
		toggleTask,
		removeTask,
		clearError,
	};
}