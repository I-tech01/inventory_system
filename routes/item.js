import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await prisma.item.findMany()
    res.json(items)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Add a new item
router.post('/', async (req, res) => {
  const { name, category, quantity, location, image_url, min_quantity } = req.body
  try {
    const newItem = await prisma.item.create({
      data: { name, category, quantity, location, image_url, min_quantity }
    })
    res.json(newItem)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
