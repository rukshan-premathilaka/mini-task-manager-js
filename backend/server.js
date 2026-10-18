require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/health", (req, res) => {
	res.json({
		message: "Mini Task Manager API is running!",
	});
});

app.listen(PORT, () => {
	console.log(`Backend running at http://localhost:${PORT}`);
});