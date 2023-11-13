const bestSeller = require("../models/bestSeller")


// GET ALL 
const getBestSeller = async(req,res)=>{
    try {
     let bestSellerdata =   await bestSeller.find()
     res.json(bestSellerdata)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = getBestSeller