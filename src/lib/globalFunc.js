import logger from './logger'

global.logger = logger

// utils中会用到logger方法
import { boom, pong, routerWrap } from './utils'

global.boom = boom // 错误响应
global.pong = pong // 正常响应
global.routerWrap = routerWrap // 路由方法只处理业务逻辑，正常响应和错误响应都交给routerWrap处理
