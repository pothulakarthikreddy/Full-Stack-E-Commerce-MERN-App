const addToCartModel = require("../../models/cartProduct");

const updateAddToCartProduct = async (req, res) => {
  try {
    const currentUserId = req.userId; // Ensure this comes from middleware
    const addToCartProductId = req.body._id;
    const qty = req.body.quantity;

    // Validate input
    if (!addToCartProductId) {
      return res.status(400).json({
        message: "Product ID is required.",
        error: true,
        success: false,
      });
    }

    if (typeof qty !== "number" || qty <= 0) {
      return res.status(400).json({
        message: "Quantity must be a positive number.",
        error: true,
        success: false,
      });
    }

    if (!currentUserId) {
      return res.status(401).json({
        message: "Unauthorized. Please log in.",
        error: true,
        success: false,
      });
    }

    // Update the product
    const updatedCartProduct = await addToCartModel.findOneAndUpdate(
      { _id: addToCartProductId, userId: currentUserId }, // Filter
      { quantity: qty }, // Update
      { new: true } // Return the updated document
    );

    if (!updatedCartProduct) {
      return res.status(404).json({
        message: "Product not found or not authorized to update.",
        error: true,
        success: false,
      });
    }

    res.json({
      message: "Product updated successfully.",
      data: updatedCartProduct,
      error: false,
      success: true,
    });
  } catch (err) {
    console.error("Error updating product:", err); // Log the error for debugging
    res.status(500).json({
      message: err.message || "An error occurred while updating the product.",
      error: true,
      success: false,
    });
  }
};

module.exports = updateAddToCartProduct;
