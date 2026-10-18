import { useState } from "react";

export default function TaskForm({ onAddTask, isCreating }) {
	const [title, setTitle] = useState("");

	async function handleSubmit(event) {
		event.preventDefault();

		const trimmedTitle = title.trim();

		if (!trimmedTitle || isCreating) {
			return;
		}

		const success = await onAddTask(trimmedTitle);

		if (success) {
			setTitle("");
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-3 sm:flex-row"
		>
			<input
				type="text"
				value={title}
				onChange={(event) => setTitle(event.target.value)}
				placeholder="What needs to get done?"
				aria-label="New task title"
				maxLength={200}
				required
				className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
			/>

			<button
				type="submit"
				disabled={isCreating || !title.trim()}
				className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-50"
			>
				{isCreating ? "Adding..." : "Add task"}
			</button>
		</form>
	);
}