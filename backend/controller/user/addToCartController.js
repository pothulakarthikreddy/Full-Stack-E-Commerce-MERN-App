const addToCartModel = require("../../models/cartProduct");
const { isValidObjectId } = require("mongoose");

const addToCartController = async (req, res) => {
    try {
        const { productId } = req?.body; // Destructure productId from request body
        const currentUser = req?.userId; // Get UserId from the request

        // Log UserId for debugging
        console.log("User ID in request:", currentUser);

        // Validate inputs
        if (!productId || !isValidObjectId(productId)) {
            return res.status(400).json({
                message: "Invalid or missing Product ID",
                success: false,
                error: true,
            });
        }

        if (!currentUser) {
            console.error("User ID is missing in the request");
            return res.status(401).json({
                message: "Unauthorized. User ID is missing.",
                success: false,
                error: true,
            });
        }

        // Check if the product already exists in the user's cart
        const isProductAvailable = await addToCartModel.findOne({
            productId,
            userId: currentUser,
        });

        if (isProductAvailable) {
            // Increment quantity if the product already exists
            isProductAvailable.quantity += 1;
            const updatedProduct = await isProductAvailable.save();
            return res.status(200).json({
                data: updatedProduct,
                message: "Product quantity updated in cart",
                success: true,
                error: false,
            });
        }

        // Add new product to cart
        const newAddToCart = new addToCartModel({
            productId,
            quantity: 1,
            userId: currentUser,
        });
        const savedProduct = await newAddToCart.save();

        return res.status(201).json({
            data: savedProduct,
            message: "Product added to cart successfully",
            success: true,
            error: false,
        });
    } catch (err) {
        console.error("Error adding product to cart:", err);
        return res.status(500).json({
            message: "An unexpected error occurred",
            success: false,
            error: true,
        });
    }
};

module.exports = addToCartController;
