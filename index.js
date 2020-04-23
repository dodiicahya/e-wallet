const express = require('express')
const app = express()

// app.use()
const server = require('http').createServer(app) 
const PORT = 3001
if (!module.parent) {
	server.listen(PORT, () => {
		console.log('Express Server Now Running. port:'+PORT)
	})
}
module.exports = app