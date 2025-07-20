import express from 'express'
import { sql } from '../confiq/db.js'
import { CreateTransaction, deleteTrasactionById, getSummaryByUserId, getTransactionByUserId } from '../controller/transactions.controller.js'

const router = express.Router()




router.get("/transaction/:userId",getTransactionByUserId )
 
router.delete("/transaction/:id", deleteTrasactionById )

router.get('/transaction/summary/:userId', getSummaryByUserId )

router.post("/transactions", CreateTransaction )





export default  router;