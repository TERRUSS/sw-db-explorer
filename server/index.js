'use strict'

const config = require('config')

const Hapi = require('@hapi/hapi')

const routes = require('./routes')
const plugins = require('./plugins')


// const gracefulStopServer = function () {
//   // Wait 10 secs for existing connection to close and then exit.
//   server.stop({timeout: 10 * 1000}, () => {
//     console.info('Shutting down server')
//     process.exit(0)
//   })
// }

// process.on('uncaughtException', err => {
//   console.error(err, 'Uncaught exception')
//   process.exit(1)
// })

// process.on('unhandledRejection', (reason, promise) => {
//   console.error({
//     promise: promise,
//     reason: reason
//   }, 'unhandledRejection')
//   process.exit(1)
// })

// process.on('SIGINT', gracefulStopServer)
// process.on('SIGTERM', gracefulStopServer)

/**
 * Starts the server
 * @returns {Promise.<void>}
 */
const start = async () => {

  const server = new Hapi.server({
    port: config.get('app.port'),
    host: 'localhost',
    routes: {
        cors: {
            origin: ["*"],
            headers: ["Accept", "Content-Type"],
            additionalHeaders: ["X-Requested-With"]
        }
    }
  })

  // attach routes here
  server.route(routes)
  await server.register(plugins)
  

  try {
    // add things here before the app starts, like database connection check etc
    await server.start()
    console.info(`Server started at port: ${config.get('app.port')}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

start()