const basePath = "/users/transactions"
const transSvc = require("../services/transactions")
module.exports = (app) => {
    app.post(basePath+'/topup',(req,res,next)=>{
        req.body.userAgent = req.get('User-Agent');
        req.body.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
        return transSvc.transactions(req.body,req.user)
        .then(result => res.status(result.status).send(result))
		.catch(err => next(err))  
    })
    app.put(basePath+'/transfer',(req,res,next)=>{
        req.body.userAgent = req.get('User-Agent');
        req.body.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
        return transSvc.transferTransaction(req.body,req.user)
        .then(result => res.status(result.status).send(result))
		.catch(err => next(err))  
    })
}
