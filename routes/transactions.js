import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

// Get all transactions
router.get('/', async (req, res) => {
  const transactions = await prisma.transaction.findMany({ include: { item: true, user: true } })
  res.json(transactions)
})

// Log a transaction
router.post('/', async (req, res) => {
  const { item_id, user_id, type, quantity } = req.body
  const transaction = await prisma.transaction.create({
    data: { item_id, user_id, type, quantity }
  })
  res.json(transaction)
})

export default router
