import AppLayout from "../components/layout/AppLayout";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import useTasks from "../hooks/useTasks";

export default function TasksPage() {
	const {
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
	} = useTasks();

	const completedCount = tasks.filter((task) => task.completed).length;
	const remainingCount = tasks.length - completedCount;

	return (
		<AppLayout>
			<section>
				<p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
					Your productivity space
				</p>

				<div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
							Make today count.
						</h1>

						<p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
							Keep your tasks in one place, track your progress, and focus
							on what matters next.
						</p>
					</div>

					<span className="w-fit rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600">
            {remainingCount} remaining
          </span>
				</div>
			</section>

			<section
				aria-label="Task statistics"
				className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
			>
				<StatCard label="Total tasks" value={tasks.length} />
				<StatCard label="In progress" value={remainingCount} />
				<StatCard label="Completed" value={completedCount} />
			</section>

			<section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
				<div className="border-b border-slate-100 px-5 py-5 sm:px-6">
					<h2 className="text-lg font-bold text-slate-900">
						Your tasks
					</h2>

					<p className="mt-1 text-sm text-slate-500">
						Add a task, mark it complete, or remove it when it's no longer
						needed.
					</p>

					<div className="mt-5">
						<TaskForm
							onAddTask={addTask}
							isCreating={isCreating}
						/>
					</div>
				</div>

				{error && (
					<div
						role="alert"
						className="mx-5 mt-5 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:mx-6 sm:flex-row sm:items-center sm:justify-between"
					>
						<p>{error}</p>

						<div className="flex shrink-0 gap-3">
							{tasks.length === 0 && !loading && (
								<button
									type="button"
									onClick={loadTasks}
									className="font-semibold underline underline-offset-2"
								>
									Retry
								</button>
							)}

							<button
								type="button"
								onClick={clearError}
								className="font-semibold underline underline-offset-2"
							>
								Dismiss
							</button>
						</div>
					</div>
				)}

				{loading ? (
					<div
						className="px-5 py-14 text-center text-sm text-slate-500"
						role="status"
					>
						Loading your tasks...
					</div>
				) : (
					<TaskList
						tasks={tasks}
						onToggle={toggleTask}
						onDelete={removeTask}
						pendingTaskIds={pendingTaskIds}
					/>
				)}

				{!loading && tasks.length > 0 && (
					<div className="border-t border-slate-100 bg-slate-50 px-5 py-3 text-xs text-slate-500 sm:px-6">
						Showing {tasks.length} {tasks.length === 1 ? "task" : "tasks"} ·{" "}
						{completedCount} completed
					</div>
				)}
			</section>
		</AppLayout>
	);
}

function StatCard({ label, value }) {
	return (
		<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
			<p className="text-sm font-medium text-slate-500">{label}</p>

			<p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
				{value}
			</p>
		</div>
	);
}