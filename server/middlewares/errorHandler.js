export function notFound (req, res, next) {
    res.status(404).json({
            ok: false,
            message: 'Route not found'
    });
};

export function errorHandler(err, req, res, next) {
    console.error("❌ Error:", err);

    const status = err.status || 500;
    res.status(status).json({
        ok:false,
        message: err.message || "Internal server error",
        contact: {
            "telegram": "@sohumelivar",
            "email": "sohumelivar@gmail.com"
        }
    });
};