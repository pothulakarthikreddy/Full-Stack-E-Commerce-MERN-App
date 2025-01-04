const addToCartModel = require("../../models/cartProduct")

const deleteAddToCartProduct = async(req,res)=>{
    try {
        const currentUserId = req.currentUserId
        const addToCartProductId = req.body._id
        const deleteProduct = await addToCartModel.deleteOne({_id:addToCartProductId})
        res.json({
            message:"Product Deleted From Cart ",
            error:false,
            success:true,
            data:deleteProduct
        })
    } catch (err) {
        res.status(400).json({
            message:err.message||err,
            error:true,
            success :false
        })
        
    }
}
module.exports =deleteAddToCartProduct