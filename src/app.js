// inject global properties
require('./lib/globalProp')

// call babel-register
if (isDev) {
  require('@babel/register')
}

require('./lib/globalFunc')

// start app
require('./express')

// handle uncaughtException
process.on('uncaughtException', err => {
  logger.error(`Uncaught error in uncaughtException event:, error info is ${err.stack}`)
})

// handle unhandledRejection
process.on('unhandledRejection', (reason, p) => {
  logger.error('UnhandledRejection at:', p, 'reason:', reason)
})
