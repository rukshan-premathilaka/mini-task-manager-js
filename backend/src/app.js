const express = require("express");
const taskRoutes = require("./modules/tasks/task.routes");
const errorHandler = require("./middleware/error-handler");
const cors = require("cors");

const app = express();

app.use(
	cors({
		origin: process.env.FRONTEND_URL || "http://localhost:5173",
	})
);

app.use(express.json());

app.get("/api/health", (req, res) => {
	res.status(200).json({
		message: "Mini Task Manager API is running!",
	});
});

app.use("/api/tasks", taskRoutes);

// Handle requests to routes that do not exist.
app.use((req, res, next) => {
	const error = new Error("Route not found.");
	error.statusCode = 404;
	next(error);
});

// Error middleware must come after routes.
app.use(errorHandler);

module.exports = app;