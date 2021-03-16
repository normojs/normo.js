const { createServer } = require('vite')

;(async () => {
  const server = await createServer({
    // any valid user config options, plus `mode` and `configFile`
    configFile: false,
    root: process.cwd(),
    server: {
      port: 1337
    }
  })
  await server.listen()
})()
