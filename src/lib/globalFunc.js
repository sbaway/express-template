import logger from './logger'
import { boom, pong } from './utils'

global.logger = logger
global.boom = boom // 错误响应
global.pong = pong // 正常响应
