import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticateToken, authorizeRole } from '../middleware/auth.js'

const router = express.Router()
const prisma = new PrismaClient()

// Only authenticated users can view items
router.get('/', authenticateToken, async (req, res) => {
  const items = await prisma.item.findMany()
  res.json(items)
})

// Only admins can add items
router.post('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const { name, category, quantity } = req.body
  const newItem = await prisma.item.create({ data: { name, category, quantity } })
  res.json(newItem)
})

export default router
