const fs = require("node:fs/promises");
const path = require("node:path");

const DATA_DIR = path.join(__dirname, "../../../data");
const DATA_FILE = path.join(DATA_DIR, "tasks.json");

let writeQueue = Promise.resolve();

async function ensureDataFile() {
	await fs.mkdir(DATA_DIR, { recursive: true });

	try {
		await fs.access(DATA_FILE);
	} catch (error) {
		if (error.code !== "ENOENT") {
			throw error;
		}

		await fs.writeFile(
			DATA_FILE,
			JSON.stringify({ nextId: 1, tasks: [] }, null, 2),
			"utf8"
		);
	}
}

async function readData() {
	await ensureDataFile();

	const content = await fs.readFile(DATA_FILE, "utf8");

	let data;

	try {
		data = JSON.parse(content);
	} catch {
		throw new Error(
			"The task data file contains invalid JSON. Restore a valid backup before continuing."
		);
	}

	if (
		!data ||
		!Number.isSafeInteger(data.nextId) ||
		data.nextId < 1 ||
		!Array.isArray(data.tasks)
	) {
		throw new Error("The task data file has an invalid structure.");
	}

	return data;
}

function writeData(data) {
	const operation = writeQueue.then(async () => {
		await ensureDataFile();

		const tempFile = `${DATA_FILE}.tmp`;

		await fs.writeFile(
			tempFile,
			JSON.stringify(data, null, 2),
			"utf8"
		);

		await fs.rename(tempFile, DATA_FILE);
	});

	// Keep the queue usable even if a previous write fails.
	writeQueue = operation.catch(() => {});

	return operation;
}

async function findAll() {
	const data = await readData();
	return data.tasks;
}

async function findById(id) {
	const data = await readData();
	return data.tasks.find((task) => task.id === id) || null;
}

async function create(title) {
	const data = await readData();

	const task = {
		id: data.nextId,
		title,
		completed: false,
		createdAt: new Date().toISOString(),
	};

	data.nextId += 1;
	data.tasks.push(task);

	await writeData(data);

	return task;
}

async function updateCompleted(id, completed) {
	const data = await readData();
	const task = data.tasks.find((item) => item.id === id);

	if (!task) {
		return null;
	}

	task.completed = completed;

	await writeData(data);

	return task;
}

async function remove(id) {
	const data = await readData();
	const index = data.tasks.findIndex((task) => task.id === id);

	if (index === -1) {
		return false;
	}

	data.tasks.splice(index, 1);

	await writeData(data);

	return true;
}

module.exports = {
	findAll,
	findById,
	create,
	updateCompleted,
	remove,
};