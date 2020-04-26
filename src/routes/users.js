const basePath = "/users"
const userSvc = require("../services/users")
module.exports = (app) => {
    /**
   * @swagger
   * /users/login:
   *   post:
   *     tags:
   *       - Users
   *     description: login
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: login
   *         in: body
   *         schema: {
   *          "type": "object",
   *          "required": true,
   *          "properties": {
   *              "username": {
   *                  "type": "string",
   *                  "example": "admin"
   *              },
   *              "password": {
   *                  "type": "string",
   *                  "example": "1234"
   *              }
   *           }
   *        }
   *     responses:
   *       200:
   *         description: Successfully login
   */
    app.post(basePath+'/login',(req,res,next)=>{
        return userSvc.signUser(req.body)
        .then(result => res.status(result.status).send(result))
		.catch(err => next(err))
    })

    /**
   * @swagger
   * /users/logout:
   *   post:
   *     tags:
   *       - Users
   *     description: logout
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: logout
   *         in: body
   *         schema: {
   *          "type": "object",
   *          "required": true,
   *          "properties": {
   *              "username": {
   *                  "type": "string",
   *                  "example": "admin"
   *              },
   *              "password": {
   *                  "type": "string",
   *                  "example": "1234"
   *              }
   *           }
   *        }
   *     responses:
   *       200:
   *         description: Successfully logout
   */
    app.post(basePath+'/logout',(req,res,next)=>{
        return userSvc.logout(req.body)
        .then(result => res.status(200).send('logout success'))
		.catch(err => next(err))
    })
    /**
   * @swagger
   * /users/profile:
   *   get:
   *     tags:
   *       - Users
   *     security:
   *      - Bearer: []
   *     description: get profile user
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Successfully get profile user
   */
    app.get(basePath+'/profile',(req,res,next)=>{
        return userSvc.getUser(req.user)
        .then(result => res.send(result))
		.catch(err => next(err))  
    })

    /**
   * @swagger
   * /users/add:
   *   get:
   *     tags:
   *       - Users
   *     security:
   *      - Bearer: []
   *     description: create users
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: create user payload
   *         in: body
   *         schema: {
   *          "type": "object",
   *          "required": true,
   *          "properties": {
   *              "username": {
   *                  "type": "string",
   *                  "example": "admin"
   *              },
   *              "password": {
   *                  "type": "string",
   *                  "example": "1234"
   *              }
   *           }
   *        }
   *     responses:
   *       201:
   *         description: Successfully create users
   *       422:
   *         description: user already registered
   *       401:
   *         description: not authorized to created user
   */
    app.post(basePath+'/add',(req,res,next)=>{
        return userSvc.register(req.body,req.user)
		.then(result => res.status(result.status).send(result))
		.catch(err => next(err))  
    })
    /**
   * @swagger
   * /users/balance/history:
   *   get:
   *     tags:
   *       - Users
   *     security:
   *      - Bearer: []
   *     description: get balance history user
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Successfully get balance history user
   */
    app.get(basePath+'/balance/history',(req,res,next)=>{
        return userSvc.userBalanceHistory(req.user)
		.then(result => res.send(result))
		.catch(err => next(err))  
    })
    /**
   * @swagger
   * /users/balance:
   *   get:
   *     tags:
   *       - Users
   *     security:
   *      - Bearer: []
   *     description: get balance user
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Successfully get balance user
   */
    app.get(basePath+'/balance',(req,res,next)=>{
        return userSvc.userBalance(req.user)
		.then(result => res.status(result.status).send(result))
		.catch(err => next(err))  
    })
        /**
   * @swagger
   * /users/password/change:
   *   put:
   *     tags:
   *       - Users
   *     description: update password
   *     produces:
   *       - application/json
   *     security:
   *      - Bearer: []
   *     parameters:
   *       - name: body
   *         description: update password
   *         in: body
   *         schema: {
   *          "type": "object",
   *          "required": true,
   *          "properties": {
   *              "old_password": {
   *                  "type": "string",
   *                  "example": "1234"
   *              },
   *              "new_password": {
   *                  "type": "string",
   *                  "example": "1234"
   *              }
   *           }
   *        }
   *     responses:
   *       200:
   *         description: Successfully update password
   */
    app.put(basePath+'/password/change',(req,res,next)=>{
        return userSvc.updatePassword(req.body,req.user)
		.then(result => res.status(result.status).send(result))
		.catch(err => next(err))  
    })
}