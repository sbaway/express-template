import express from 'express'

const router = express.Router()

// 用户注册
const handler = {
  @routerWrap('getUserInfo')
  async getUserInfo(req, res, next) {
    const random = Math.random()
    if (random < 0.3) {
      return {
        clientError: '用户不存在',
      }
    } else if (random > 0.3 && random < 0.6) {
      throw new Error('服务异常')
    } else {
      return { name: 1 }
    }
  },
}

router.get('/info', handler.getUserInfo)

export default router
