const {Router} = require("express")
const { registerUser, loginUser, UserAddressDetails, paymentDetail, getUserAddress } = require("../controller/UserController")


const userrouter = Router()

userrouter.post('/signup', registerUser)
userrouter.post('/login', loginUser)
userrouter.post("/:userId/address", UserAddressDetails)
userrouter.get("/:userId/getAddress", getUserAddress)
userrouter.post("/paymentDetails", paymentDetail)



module.exports= userrouter