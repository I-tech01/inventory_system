import express from 'express'
import authRouter from './routes/auth.js'
import itemsRouter from './routes/items.js'
import usersRouter from './routes/users.js'
import borrowRequestsRouter from './routes/borrowRequests.js'
import transactionsRouter from './routes/transactions.js'

const app = express()
app.use(express.json())

// Authentication routes
app.use('/auth', authRouter)

// Core models
app.use('/items', itemsRouter)
app.use('/users', usersRouter)
app.use('/borrow-requests', borrowRequestsRouter)
app.use('/transactions', transactionsRouter)

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
