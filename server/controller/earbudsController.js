const earBuds = require("../models/earbuds")


// GET ALL 

const getEarbuds = async(req,res)=>{
    try {
        let dcData = await earBuds.find()
        res.json(dcData)
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports = getEarbuds