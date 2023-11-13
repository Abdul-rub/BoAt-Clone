const trendingANC = require("../models/trendingANC")


// GET ALL 

const getTrendingANC = async(req,res)=>{
    try {
        let dcData = await trendingANC.find()
        res.json(dcData)
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports = getTrendingANC