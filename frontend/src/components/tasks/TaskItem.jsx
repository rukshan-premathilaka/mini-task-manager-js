function formatDate(value) {
	if (!value) {
		return "";
	}

	const date = new Date(value);

	if (Number.isNaN(date.getTime())) {
		return "";
	}

	return new Intl.DateTimeFormat(undefined, {
		month: "short",
		day: "numeric",
	}).format(date);
}

export default function TaskItem({
									 task,
									 onToggle,
									 onDelete,
									 isBusy,
								 }) {
	const checkboxId = `task-${task.id}`;
	const createdDate = formatDate(task.createdAt);

	return (
		<li className="flex items-start gap-3 px-4 py-4 transition hover:bg-slate-50 sm:px-5">
			<input
				id={checkboxId}
				type="checkbox"
				checked={task.completed}
				disabled={isBusy}
				onChange={() => onToggle(task)}
				className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-blue-600 disabled:cursor-wait"
			/>

			<label
				htmlFor={checkboxId}
				className="min-w-0 flex-1 cursor-pointer"
			>
        <span
			className={`block break-words text-sm font-medium ${
				task.completed
					? "text-slate-400 line-through"
					: "text-slate-800"
			}`}
		>
          {task.title}
        </span>

				<span className="mt-1 block text-xs text-slate-400">
          {task.completed ? "Completed" : "In progress"}
					{createdDate ? ` · Added ${createdDate}` : ""}
        </span>
			</label>

			<button
				type="button"
				onClick={() => onDelete(task.id)}
				disabled={isBusy}
				aria-label={`Delete task: ${task.title}`}
				title="Delete task"
				className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-200 disabled:cursor-wait disabled:opacity-50"
			>
				<svg
					aria-hidden="true"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.8"
					className="h-4 w-4"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M4 7h16M10 11v6m4-6v6M5.5 7l1 13h11l1-13M9 7V4h6v3"
					/>
				</svg>
			</button>
		</li>
	);
}