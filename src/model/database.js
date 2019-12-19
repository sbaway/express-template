import config from '../config'
import moment from 'moment'
import knex from 'knex'

const rokDB = knex({
  client: 'mysql',
  connection: {
    ...config.rokDB,
    timezone: 'UTC',
    typeCast: function(field, next) {
      if (field.type === 'DATETIME') {
        return moment(field.string()).format('YYYY-MM-DD HH:mm:ss')
      }

      if (field.type === 'TINY') {
        return Boolean(+field.string())
      }

      return next()
    },
  },
  pool: {
    min: 20,
    max: 100,
    acquireConnectionTimeout: 5 * 1000,
    idleTimeoutMillis: 60 * 1000,
    syncInterval: 10 * 1000,
    acquireTimeout: 30 * 1000,
    disposeTimeout: 30 * 1000,
    maxRequests: Infinity,
    requestTimeout: 30 * 1000,
  },
})

async function pingDB() {
  return new Promise((resolve, reject) => {
    rokDB.client.pool.acquire((err, client) => {
      if (err) {
        logger.error(`error in connect mysql, error info is ${err}`)
        resolve(false)
      } else {
        rokDB.client.pool.release(client)
        resolve(true)
      }
    })
  })
}

export default {
  rokDB,
  pingDB,
}
