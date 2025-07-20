import { sql } from "../confiq/db.js";




export async function getTransactionByUserId (req,res) {
    try {
        const {userId} = req.params

      const transaction =  await sql`
        SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC`

        res.status(200).json(transaction)

    } catch (error) {

        console.log("Error in getting the transactions",error);
        res.status(500).json({message: "Internal error during fetching"})
        
    }

}


export async function deleteTrasactionById (req,res)  {

    const {id} = req.params

    if(isNaN(parseInt(id))){
        return  res.status(400).json({message: "Invalid transaction id"})
    }

    const result =await sql`
    DELETE FROM transactions WHERE id =${id} RETURNING *`;

    if(result.length === 0){
        return res.status(404).json({message: "Transaction not found"})
    }

    res.status(200).json({message: "Transaction has been deleted"})
}

export async function getSummaryByUserId (req,res) {
    
    try {

        const {userId} = req.params

       const summary = await sql`SELECT
        SUM(amount) AS balance,
        COALESCE(SUM(CASE WHEN category = 'income' THEN amount ELSE 0 END),0) AS income,
        COALESCE(SUM(CASE WHEN category = 'expense' THEN amount ELSE 0 END),0) AS expense
        FROM transactions WHERE user_id = ${userId}
       `
        
       res.status(200).json(
        {
            balance : summary[0].balance,
            income: summary[0].income,
            expense: summary[0].expense
            
        }
       )
    } catch (error) {
        
        console.log("Error in getting summary of the transaction", error)
        res.status(500).json({message: "Internal server error"})
    }
}


export async function CreateTransaction (req,res)  {
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
}






