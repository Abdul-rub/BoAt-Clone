const dc = require("../models/dc")


// GET ALL 

const getDcData = async(req,res)=>{
    try {
        let dcData = await dc.find()
        res.json(dcData)
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports = getDcData