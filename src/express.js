import connectRedis from 'connect-redis'
import Redis from 'ioredis'
import compression from 'compression'
import session from 'express-session'
import httpAuth from 'http-auth'
import expressStatus from 'express-status-monitor'
import bodyParser from 'body-parser'
import Express from 'express'
import path from 'path'
import config from './config'
import errorLog from './common/errorLog'
import commonConfig from './config/common'
import { getLocalIp } from './lib/utils'
// router
import routerComponents from './components'

const app = new Express()
const monitor = expressStatus({
  path: '',
})
const host = process.env.NODE_HOST || '0.0.0.0'
const port = process.env.NODE_PORT || 6012

// compress response
app.use(compression())

// disabled x-powered-by
app.disable('x-powered-by')

// set common response headers
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*') // TODO 生产环境仅允许白名单的域可调用

  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Auth-Token, x-token, Content-Type, Authorization, X-Requested-With',
  )
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Max-Age', 86400)
  next()
})
app.enable('trust proxy')

// set session
const RedisStore = connectRedis(session)
app.use(
  session({
    name: 'rok.sid',
    resave: true,
    secret: commonConfig.secret.salt,
    proxy: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30,
    },
    saveUninitialized: true,
    store: new RedisStore({
      client: new Redis(config.redis.session),
      prefix: config.redis.prefix,
    }),
  }),
)

// http auto for express status and logs
const basicAuth = httpAuth.basic(
  {
    realm: 'Monitor Area',
  },
  (user, pass, callback) => {
    const authUser = commonConfig.authUser
    const isAuthUser = user === authUser.user && pass === authUser.pass
    callback(isAuthUser)
  },
)

// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
)

// parse application/json
app.use(bodyParser.json())

// status monitor
app.use(monitor.middleware)

// static files
app.use('/static/image', Express.static(path.resolve(__dirname, './static/uploadImages'))) // server status router

app.get('/status', httpAuth.connect(basicAuth), monitor.pageRoute) // server error logs router

app.get('/logs', httpAuth.connect(basicAuth), errorLog) // router middleware

app.use('/api', (req, res, next) => {
  req.body = req.body || {}
  req.query = req.query || {}
  next()
})

app.use('/', routerComponents)

app.on('error', (err, ctx) => {
  logger.error('❌ ❌ ❌ ops server error, error info is', err, ctx)
})

app.listen(port, host, function() {
  logger.info(`Server listening on http://${getLocalIp()}:${port}, Env is ${env}`)

  process.send = process.send || function() {}

  process.send('ready')
})
