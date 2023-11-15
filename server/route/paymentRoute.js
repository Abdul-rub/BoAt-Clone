const { VerifyPayment, checkout, getPaymentHistory } = require("../controller/paymentController")

const {Router} = require("express")




const paymentRouter = Router()


paymentRouter.post('/checkout',checkout)
paymentRouter.post('/verifypayment',VerifyPayment)
paymentRouter.get('/paymenthistory',getPaymentHistory)


module.exports = paymentRouter
// export default paymentRouter;