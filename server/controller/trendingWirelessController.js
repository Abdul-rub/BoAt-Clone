const trendingWireless = require("../models/trendingWireless")


// GET ALL 

const getTrendingWireless = async(req,res)=>{
    try {
        let dcData = await trendingWireless.find()
        res.json(dcData)
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports = getTrendingWireless