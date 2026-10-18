function errorHandler(err, req, res, next) {
	if (res.headersSent) {
		return next(err);
	}

	const statusCode = err.statusCode || 500;

	if (statusCode >= 500) {
		console.error(err);
	}

	res.status(statusCode).json({
		message:
			statusCode >= 500
				? "An unexpected server error occurred."
				: err.message,
	});
}

module.exports = errorHandler;