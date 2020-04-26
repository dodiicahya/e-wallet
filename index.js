const express = require('express')
const passport = require('passport')
const bodyParser = require('body-parser')
const fs = require('fs')
const useragent = require('express-useragent');
const routePath = './src/routes/'
const auth = require('./src/utils/jwt_middleware')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const app = express()
const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'SECRET_KEY';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
	if (err) {
		return done(err, false);
	}else{
		return done(null,jwt_payload);
	}
}));

const findFileRoute = dir => {
	let results = []
	const list = fs.readdirSync(dir)
	list.forEach(file => {
		file = dir + '/' + file
		let stat = fs.statSync(file)
		if (stat && stat.isDirectory()) results = results.concat(findFileRoute(file))
		else results.push(file)
	})
	return results
}
const swaggerOption = {
	swaggerDefinition: {
		info: {
			title: 'Mini E-Wallet',
			version: '1.0.0',
			description: 'Specification for Mini E-Wallet API typcially used for transactions',
			contact: {
				name: 'dodi cahya',
				email: 'dodi.cahya@gmail.com'
			},
			license: {
				name: 'Apache 2.0',
				url: 'https://www.apache.org/licenses/LICENSE-2.0'
			},
		},
		basePath: '/',
		securityDefinitions: {
			Bearer: {
				type: 'apiKey',
				in: 'header',
				name: 'Authorization'
			}
		}
	},
	apis: ['./src/routes/**/**.js']
}
const swaggerSpec = swaggerJSDoc(swaggerOption)
app.use('/api-docs/', swaggerUi.serveFiles(swaggerSpec, swaggerOption), swaggerUi.setup(swaggerSpec, false, {}, '.topbar { display: none }'))
app.get('/api-docs/', (req, res) => { res.send(swaggerUi.generateHTML(swaggerSpec, swaggerOption)) })
app.use(auth.authenticate)
app.use(useragent.express());
app.use(passport.initialize());
app.use(bodyParser.json())

passport.serializeUser(function(user, done) {
	done(null, user);
});
  
passport.deserializeUser(function(user, done) {
	done(null, user);
});

const server = require('http').createServer(app) 
findFileRoute(routePath).forEach(absolutePath => require(absolutePath)(app))
let arr = []
app._router.stack.forEach(function (middleware) {
	if (middleware.route) { // routes registered directly on the app
		Object.keys(middleware.route.methods).forEach(function (method) {
			arr.push({
				path: middleware.route.path,
				method: method
			})
		})
	}
})
const PORT = 3001
if (!module.parent) {
	server.listen(PORT, () => {
		console.log('Express Server Now Running. port:'+PORT)
	})
}
module.exports = app