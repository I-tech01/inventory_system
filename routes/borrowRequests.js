import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticateToken, authorizeRole } from '../middleware/auth.js'

const router = express.Router()
const prisma = new PrismaClient()

// Staff & Admin: view all requests
router.get('/', authenticateToken, async (req, res) => {
  try {
    const requests = await prisma.borrowRequest.findMany({
      include: { item: true, user: true }
    })
    res.json(requests)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Staff: create a borrow request
router.post('/', authenticateToken, authorizeRole('staff'), async (req, res) => {
  const { item_id } = req.body
  try {
    const request = await prisma.borrowRequest.create({
      data: {
        item_id,
        user_id: req.user.id, // taken from JWT payload
        status: 'pending'
      }
    })
    res.json(request)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Admin: approve/reject/mark returned
router.put('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const { status } = req.body
  try {
    const updated = await prisma.borrowRequest.update({
      where: { id: parseInt(req.params.id) },
      data: { status }
    })
    res.json(updated)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export default router
