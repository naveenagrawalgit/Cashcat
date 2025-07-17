import express from 'express'
import dotenv from 'dotenv'

dotenv.config();


const app = express()


async function initDB(){


    try {
        await gg
    } catch (error) {
        
    }


}






app.get("/", (req,res)=>{
    res.send("server is running at :--")
})
 
app.listen(process.env.PORT,()=>{
    console.log("server is running at :-- ", process.env.PORT)
})

