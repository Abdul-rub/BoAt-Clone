const newlaunch = require("../models/newLaunches")


// GET ALL 

const getNewLaunch = async(req,res)=>{
    try {
        let dcData = await newlaunch.find()
        res.json(dcData)
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports = getNewLaunch