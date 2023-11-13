const Marvel = require("../models/marvel")


// GET ALL 

const getMarvelData = async(req,res)=>{
    try {
        let dcData = await Marvel.find()
        res.json(dcData)
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports = getMarvelData