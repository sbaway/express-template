import express from 'express'

import { catchError } from '../../lib/utils'
const router = express.Router()

// 用户注册
const handler = {
  @catchError('getUserInfo')
  async getUserInfo() {
    console.e(1)
  },
}

router.get('/info', handler.getUserInfo)

export default router
