const userDB = require('../repository/user')
const utils = require('../utils/helpers')
const jwt = require('jsonwebtoken')

const register = async(data,users)=>{
    const dtUser = await userDB.findUser({username:users.username})
    if (dtUser.user_type == 'system') {
        let encryptPassword = utils.bcryptGenerate(data.password)
        const dataStore = {
            username:data.username,
            email:data.email,
            password:encryptPassword
        }
        let result = await userDB.store(dataStore)
        return {status:201,result}
    }else{
        return {status:401,message:'not authorized to created'}
    }
}

const signUser = async(data)=>{
    const users = await userDB.findUser({username:data.username})
    if(users!==null){
        const checkPass = await utils.compareBcrypt(data.password, users.password)
        if(checkPass){
            let token = await jwt.sign({data}, 'SECRET_KEY', { expiresIn: '5m'});
            await userDB.update({is_login:true},{id:users.id})
            return {status:200,token}
        }else{
            return {status:401,message:"invalid login credentials"}
        }
    }else{
        return {status:404,message:"user not found"}
    }
}
const getUser = async(data)=>{
    if(data){
        return await userDB.findUser({username:data.username})
    }
}
const logout = async(data)=>{
    return await userDB.update({is_login:false},{username:data.username})
}
module.exports = {
    register,
    signUser,
    getUser,
    logout
    
}