const env = process.env
const config = {
  winston: {
    consoleLevel: 'info',
    fileLevel: 'error',
    filename: 'web-service.log',
  },
  rokDB: {
    host: env.MYSQL_HOST,
    port: env.MYSQL_PORT,
    user: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
  },
  redis: {
    session: env.REDIS_URL,
    prefix: env.REDIS_PREFIX,
  },
}

export default config
