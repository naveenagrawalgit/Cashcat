import express from 'express'
import dotenv from 'dotenv'
import { initDB } from './confiq/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import transactionsRoute from './routes/transactions.Route.js';
dotenv.config();


const app = express()

app.use(express.json())

app.use(rateLimiter)



app.use("/api", transactionsRoute)


initDB().then(()=>{


    app.listen(process.env.PORT,()=>{
    console.log("server is running at :-- ", process.env.PORT)
})

})






