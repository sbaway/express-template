import CryptoJS from 'crypto-js'
import config from '../config/common'

const key = CryptoJS.enc.Base64.parse(config.secret.salt)

const encrypted = function(str) {
  const encrypted = CryptoJS.AES.encrypt(str, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  })
  return encrypted.toString()
}

const decrypted = function(encrypted) {
  const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  })
  return CryptoJS.enc.Utf8.stringify(decrypted)
}

const catchError = apiName => {
  return (target, key, descriptor) => {
    const func = descriptor.value

    descriptor.value = async (req, res, next) => {
      try {
        await func(req, res, next)
      } catch (err) {
        logger.error(`${apiName}, error info is :%`, err.stack)
        res.status(200).json({
          errorMessage: err.message,
        })
      }
    }

    return descriptor
  }
}

const processPageInfo = search => {
  let { pageNum, pageSize } = search
  pageNum = isNaN(+pageNum) || +pageNum < 1 ? 1 : Math.ceil(pageNum)
  pageSize = isNaN(+pageSize) || +pageSize < 1 ? 10 : Math.ceil(pageSize)
  return {
    pageNum,
    pageSize,
    offset: (pageNum - 1) * pageSize,
  }
}

const boom = function({ isSuccess, code, data, msg }) {
  const GenerateResponse = function() {
    this.isSuccess = isSuccess || false
    this.code = code
    this.data = data || {}

    if (msg) {
      this.msg = msg
    }
  }

  return new GenerateResponse()
}

const pong = function(data) {
  const GenerateResponse = function() {
    this.isSuccess = true
    this.code = 200
    this.data = data ? { ...data } : {}
  }

  return new GenerateResponse()
} // 获取开发环境中局域网的地址

const getLocalIp = function() {
  const interfaces = require('os').networkInterfaces()

  let IPAddress = ''

  for (var devName in interfaces) {
    var iface = interfaces[devName]

    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i]

      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        IPAddress = alias.address
      }
    }
  }

  return IPAddress
}

export { encrypted, decrypted, catchError, processPageInfo, boom, pong, getLocalIp }
