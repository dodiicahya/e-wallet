const basePath = "/users"
const userSvc = require("../services/users")
module.exports = (app) => {
    app.post(basePath+'/login',(req,res,next)=>{
        return userSvc.signUser(req.body)
        .then(result => res.status(result.status).send(result))
		.catch(err => next(err))
    })

    app.post(basePath+'/logout',(req,res,next)=>{
        return userSvc.logout(req.body)
        .then(result => res.status(200).send('logout success'))
		.catch(err => next(err))
    })

    app.get(basePath+'/profile',(req,res,next)=>{
        return userSvc.getUser(req.user)
        .then(result => res.send(result))
		.catch(err => next(err))  
    })

    app.post(basePath+'/add',(req,res,next)=>{
        return userSvc.register(req.body,req.user)
		.then(result => res.status(result.status).send(result))
		.catch(err => next(err))  
    })
    
    app.get(basePath+'/balance/history',(req,res,next)=>{
        return userSvc.userBalanceHistory(req.user)
		.then(result => res.send(result))
		.catch(err => next(err))  
    })
    app.get(basePath+'/balance',(req,res,next)=>{
        return userSvc.userBalance(req.user)
		.then(result => res.status(result.status).send(result))
		.catch(err => next(err))  
    })
}