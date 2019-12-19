global.development = 'development'
global.test = 'test'
global.production = 'production'

global.isDev = !process.env.NODE_ENV || process.env.NODE_ENV === development
global.isTest = process.env.NODE_ENV === test
global.isProd = process.env.NODE_ENV === production

global.env = process.env.NODE_ENV || development

global.NORMAL_STATUS = 1
global.DELETE_STATUS = 0
