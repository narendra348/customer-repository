const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        // Remove "Bearer " if present
        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

console.log("Decoded Token:", decoded);

req.user = decoded;

next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};

module.exports = auth;