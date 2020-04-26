const trans = require('../repository/transactions')
const userDB = require('../repository/user')
const Promise = require('bluebird')
const transactions = async(data,users)=>{
    try {
        const dataStore = {}
        const dtUser = await userDB.findUser({username:users.username})
        const updatedBalance = Number(dtUser.balance) + Number(data.amount)
            if(data.type!=='topup'){return{status:404,message:'plesae check your request'}}
            dataStore.user_id = dtUser.id
            dataStore.balance = data.amount
            dataStore.type = "debit"
            dataStore.author = dtUser.username
            dataStore.userAgent = data.userAgent
            dataStore.ip = data.ip
            dataStore.currentBalance = dtUser.balance
            dataStore.afterBalance = updatedBalance
            await userDB.update({balance:updatedBalance},{id:dtUser.id})
            const saveTrans = await trans.saveTransaction(dataStore,data.type)
            return {status:201,data:saveTrans}
    } catch (error) {
        console.log(error);
        console.log("Error");
        
        return false
    }
}

const transferTransaction = async(data,users)=>{
    try {
        const arrStore = []
        const dataStore1 = {}
        const dataStore = {}
        if(!data.hasOwnProperty('username')){return {status:404,message:'please check your request'}}
        const dtUserTarget = await userDB.findUser({username:data.username})
        if(dtUserTarget == null || dtUserTarget == undefined){return {status:404,message:'cannot process transfer, user not found'}}
        const dtUser = await userDB.findUser({username:users.username})
        if(dtUser.balance >= data.amount){
            const updatedBalance = Number(dtUser.balance) - Number(data.amount)
            dataStore.user_id = dtUser.id
            dataStore.balance = data.amount
            dataStore.type = "credit"
            dataStore.author = dtUser.username
            dataStore.userAgent = data.userAgent
            dataStore.ip = data.ip
            dataStore.currentBalance = dtUser.balance
            dataStore.afterBalance = updatedBalance
            arrStore.push(dataStore)
            await userDB.update({balance:updatedBalance},{id:dtUser.id})
            const updatedBalanceTarget = Number(dtUserTarget.balance) + Number(data.amount)
            arrStore.map(val =>{
                dataStore1.user_id = dtUserTarget.id
                dataStore1.balance_achieve = data.amount
                dataStore1.type = "debit"
                dataStore1.author = dtUser.username
                dataStore1.userAgent = data.userAgent
                dataStore1.ip = data.ip
                dataStore1.currentBalance = dtUserTarget.balance
                dataStore1.afterBalance = updatedBalanceTarget
                arrStore.push(dataStore1)
            })
            await userDB.update({balance:updatedBalanceTarget},{id:dtUserTarget.id})
            for (const val of arrStore) {
                const typeTrans = 'transfer'
                await trans.saveTransaction(val,typeTrans)
            }
        }else{
            return {status:422,message:'insuficient balance'}
        }

        return {status:201,message:'created'}
    } catch (error) {
        console.log(error);
        return false
    }
}

module.exports = {
    transactions,
    transferTransaction
}