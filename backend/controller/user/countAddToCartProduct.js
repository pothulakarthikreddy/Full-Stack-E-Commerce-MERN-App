const addToCartModel = require("../../models/cartProduct");

const countAddToCartProduct = async (req, res) => {
    try {
        const userId = req.userId;

        // Log userId for debugging
        console.log("User ID in request:", userId);

        // Validate userId
        if (!userId) {
            console.warn("User ID is missing in the request");
            return res.status(400).json({
                message: "User ID is required",
                error: true,
                success: false,
            });
        }

        // Count documents for the user
        const Count = await addToCartModel.countDocuments({ userId });
        console.log("Count retrieved:", Count); // Debug the count value

        // Respond with the count
        return res.status(200).json({
            data: { count: Count },
            message: "Cart product count retrieved successfully",
            error: false,
            success: true,
        });
    } catch (err) {
        // Log error for debugging
        console.error("Error counting cart products:", err);

        // Respond with error message
        return res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false,
        });
    }
};

module.exports = countAddToCartProduct;
