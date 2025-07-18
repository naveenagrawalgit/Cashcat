import express from 'express'
import dotenv from 'dotenv'
import { sql } from './confiq/db.js';

dotenv.config();


const app = express()

app.use(express.json())

async function initDB(){
    try {
        await sql`CREATE TABLE IF NOT EXISTS transactions(
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;

        console.log('database initialized')

    } catch (error) {

        console.log("Error initializing DB", error)
        
    }
}




app.get("/", (req,res)=>{
    res.send("server is running at :--")
})
 
app.get("/api/transaction",async(req,res) => {
    try{
        const {title, amount, category,user_id} = req.body;

        if(!title || !user_id || !category || amount=== undefined){
            return res.status(400).json({message: "All fields are required"});
        }

        const transaction = await sql`INSERT INTO transactions(user_id,title,amount,category)
        VALUES (${user_id},${title},${amount},${category})
        RETURNING *
        `;
        console.log(transaction)
        res.status(201).json(transaction[0])


    }
    catch(err){

        console.log("error in form data submission", err)
    }
})


initDB().then(()=>{


    app.listen(process.env.PORT,()=>{
    console.log("server is running at :-- ", process.env.PORT)
})

})






