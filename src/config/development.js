const config = {
  winston: {
    consoleLevel: 'debug',
    fileLevel: 'error',
    filename: 'web-service.log',
  },
  rokDB: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'fuck084614',
    database: 'rok',
  },
  redis: {
    session: 'redis://localhost:6379/0',
    prefix: 'rok:session:',
  },
}

export default config
