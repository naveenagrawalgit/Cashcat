import express from 'express'
import dotenv from 'dotenv'
import { initDB } from './confiq/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import transactionsRoute from './routes/transactions.Route.js';
import job from './confiq/cron.js';
dotenv.config();

const app = express()

if(process.env.NODE_ENV === 'production') job.start()

app.use(express.json())

app.use(rateLimiter)

app.get('/api/health',(req,res)=>{
    res.status(200).json({status: "ok"});
})

app.use("/api/transactions", transactionsRoute)


initDB().then(()=>{


    app.listen(process.env.PORT,()=>{
    console.log("server is running at :-- ", process.env.PORT)
})

})






