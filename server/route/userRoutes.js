const {Router} = require("express")
const { registerUser, loginUser, UserAddressDetails, paymentDetail } = require("../controller/UserController")


const userrouter = Router()

userrouter.post('/signup', registerUser)
userrouter.post('/login', loginUser)
userrouter.post("/address", UserAddressDetails)
userrouter.post("/paymentDetails", paymentDetail)



module.exports= userrouter