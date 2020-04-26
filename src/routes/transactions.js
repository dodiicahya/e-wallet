const basePath = "/users/transactions"
const transSvc = require("../services/transactions")
module.exports = (app) => {
    /**
   * @swagger
   * /users/transactions/topup:
   *   post:
   *     tags:
   *       - Transaction
   *     security:
   *      - Bearer: []
   *     description: create transaction topup
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: create transaction topup
   *         in: body
   *         schema: {
   *          "type": "object",
   *          "required": true,
   *          "properties": {
   *              "type": {
   *                  "type": "string",
   *                  "example": "topup"
   *              },
   *              "amount": {
   *                  "type": "decimal",
   *                  "example": 1000000.00
   *              }
   *           }
   *        }
   *     responses:
   *       201:
   *         description: Successfully create transaction topup
   */
    app.post(basePath+'/topup',(req,res,next)=>{
        req.body.userAgent = req.get('User-Agent');
        req.body.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
        return transSvc.transactions(req.body,req.user)
        .then(result => res.status(result.status).send(result))
		.catch(err => next(err))  
    })
    /**
   * @swagger
   * /users/transactions/transfer:
   *   post:
   *     tags:
   *       - Transaction
   *     security:
   *      - Bearer: []
   *     description: create transaction transfer
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: create transaction transfer
   *         in: body
   *         schema: {
   *          "type": "object",
   *          "required": true,
   *          "properties": {
   *              "type": {
   *                  "type": "string",
   *                  "example": "transfer"
   *              },
   *              "amount": {
   *                  "type": "decimal",
   *                  "example": 1000000
   *              },
   *              "username": {
   *                  "type": "string",
   *                  "example": "test"
   *              },
   *           }
   *        }
   *     responses:
   *       201:
   *         description: Successfully create transaction transfer
   */
    app.post(basePath+'/transfer',(req,res,next)=>{
        console.log(req.user);
        
        req.body.userAgent = req.get('User-Agent');
        req.body.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
        return transSvc.transferTransaction(req.body,req.user)
        .then(result => res.status(result.status).send(result))
		.catch(err => next(err))  
    })
}
