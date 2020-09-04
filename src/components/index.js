import express from 'express'
import userRouter from './user/router'

const router = express.Router()

router.use('/:name?', (req, res) => {
  const params = req.params
  const query = req.query
  res.json({
    data: 'hello world',
    params: JSON.stringify(params),
    query: JSON.stringify(query),
  })
})

router.use('/user', userRouter)

export default router
