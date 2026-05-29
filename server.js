import express from 'express'
import itemsRouter from './routes/items.js'

const app = express()
app.use(express.json())

app.use('/items', itemsRouter)

app.listen(3000, () => {
  console.log('Server running on port 3000')
})


