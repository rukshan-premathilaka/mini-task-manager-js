import TaskItem from "./TaskItem";

export default function TaskList({
									 tasks,
									 onToggle,
									 onDelete,
									 pendingTaskIds,
								 }) {
	if (tasks.length === 0) {
		return (
			<div className="px-5 py-14 text-center">
				<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-xl text-slate-500">
					+
				</div>

				<h3 className="mt-4 font-semibold text-slate-800">
					No tasks yet
				</h3>

				<p className="mt-1 text-sm text-slate-500">
					Add your first task above to get started.
				</p>
			</div>
		);
	}

	return (
		<ul className="divide-y divide-slate-100">
			{tasks.map((task) => (
				<TaskItem
					key={task.id}
					task={task}
					onToggle={onToggle}
					onDelete={onDelete}
					isBusy={pendingTaskIds.includes(task.id)}
				/>
			))}
		</ul>
	);
}