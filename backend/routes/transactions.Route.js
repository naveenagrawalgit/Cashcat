import express from 'express'
import { sql } from '../confiq/db.js'
import { CreateTransaction, deleteTrasactionById, getSummaryByUserId, getTransactionByUserId } from '../controller/transactions.controller.js'

const router = express.Router()




router.get("/:userId",getTransactionByUserId )
 
router.delete("/:id", deleteTrasactionById )

router.get('/summary/:userId', getSummaryByUserId )

router.post("/", CreateTransaction )





export default  router;