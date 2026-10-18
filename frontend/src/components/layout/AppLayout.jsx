export default function AppLayout({ children }) {
	return (
		<div className="min-h-screen bg-slate-50 text-slate-900">
			<header className="border-b border-slate-200 bg-white">
				<div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
					<a href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">
              TM
            </span>

						<span>
              <span className="block font-bold tracking-tight">
                Task Manager
              </span>
              <span className="block text-xs text-slate-500">
                Personal workspace
              </span>
            </span>
					</a>

					<span className="hidden rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 sm:inline-flex">
            Simple. Focused. Organized.
          </span>
				</div>
			</header>

			<main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
				{children}
			</main>

			<footer className="mx-auto max-w-5xl px-4 py-6 text-center text-xs text-slate-400 sm:px-6">
				Mini Task Manager · Built with React and Tailwind CSS
			</footer>
		</div>
	);
}