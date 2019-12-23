import express from 'express'

const router = express.Router()

// 用户注册
const handler = {
  @routerWrap('getUserInfo')
  async getUserInfo(req, res, next) {
    const random = Math.random()
    if (random > 0.5) {
      throw new Error('用户不存在')
    } else {
      return { name: 1 }
    }
  },
}

router.get('/info', handler.getUserInfo)

export default router
