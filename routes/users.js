import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

// Get all users
router.get('/', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

// Register new user
router.post('/', async (req, res) => {
  const { name, email, password, role } = req.body
  const newUser = await prisma.user.create({
    data: { name, email, password, role }
  })
  res.json(newUser)
})

export default router
