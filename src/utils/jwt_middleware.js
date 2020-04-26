let UrlPattern = require('url-pattern')
const jwt = require('jsonwebtoken')
const userDB = require('../repository/user')

const urlRoutes = [
    {path:'/users/profile',auth:true},
    {path:'/users/add',auth:true},
    {path:'/users/balance',auth:true},
    {path:'/users/balance/history',auth:true},
    {path:'/users/transactions/topup',auth:true},
    {path:'/users/transactions/transfer',auth:true},
    {path:'/users/password/change',auth:true},
]
const authenticate = async (req,res,next)=>{
    const filterUrl=matcherUrl(req._parsedUrl.pathname, urlRoutes)
    if(filterUrl[0]!== undefined && filterUrl[0].auth){
        const headers = req.headers.authorization;
        let token = headers.split(' ')
        const decoder = jwt.decode(token[1],{complete:false});
        const users = await userDB.findUser({username:decoder.data.username})
        if(users.is_login){
            jwt.verify(token[1], "SECRET_KEY", async(err, result) => { 
                if (err) { 
                    res.status(401).send({
                        authorization:false,
                        message:err.message
                    }) 
                    await userDB.update({is_login:false},{id:users.id})
                }else{
                    req.user = result.data
                }
            });
        }else{
            res.status(401).send({
                authorization:false,
                message:'not authorized'
            }) 
        }
        next();
    }else{
        next();
    }
}
const matcherUrl = (url, expression) => {
	return expression.filter(urlPattern=>{
		let pattern = new UrlPattern(urlPattern.path)
		return pattern.match(url)
	})
}
module.exports={
    matcherUrl,
    authenticate
}