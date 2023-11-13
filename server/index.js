const express = require('express')
const connection = require("./connection/db")
const cors = require("cors")
const productrouter = require("./route/productsRoutes")
const userrouter = require("./route/userRoutes")



const app = express()
app.use(express.json())
app.use(cors())


//routes
app.use("/product", productrouter)
app.use("/auth",userrouter)



// const postProductsToDatabase = async () => {
//     try {
//       await dc.insertMany(SailWithBoat);
//       console.log('Data posted to the database successfully');
//     } catch (error) {
//       console.error('Error posting data to the database:', error);
//     } finally {
//       // Close the database connection if needed
//       // mongoose.connection.close();
//     }
//   };

  // postProductsToDatabase()

//Connection

app.listen(process.env.PORT || 8080,async(req,res)=>{
    try {
        await connection;
        console.log("Connection Successfull")
    } catch (error) {
        console.log("connect to db failed")
        console.log(error)
    }
    console.log(`listening to PORT ${process.env.PORT}`)
})


