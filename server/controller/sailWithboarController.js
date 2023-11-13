const sailWithboat = require("../models/sailwithboat")


// GET ALL 

const getSaleWithBoat = async(req,res)=>{
    try {
        let dcData = await sailWithboat.find()
        res.json(dcData)
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports = getSaleWithBoat