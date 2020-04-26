const models = require('../models')
const Promise = require('bluebird')
const saveTransaction = (data,type)=>{
    return models.sequelize.transaction(trans=> models.user_balance.build(data, {transaction: trans}).save()
    .then(dt =>{
        const saveHistory = models.user_balance_histories.build({
            user_balance_id:dt.id,
            balance_before:data.currentBalance,
            balance_after:data.afterBalance,
            activity:type,
            ip:data.ip,
            location:data.loc,
            user_agent:data.userAgent,
            author:data.author,
            type:data.type
        }, {transaction: trans}).save()
        return Promise.all([saveHistory])
        .then(()=>getTransaction(dt.id))
    }))
    .catch(ex=>{
        console.log(ex);
        return false
    })
}

const getTransaction = (id)=>{
    return models.user_balance.findAll({
        where : { id },
		include: [{
			model: models.user_balance_histories,
			required: true,
			as: 'history'
        }]
    }).then(data=> JSON.parse(JSON.stringify(data)))
    .catch(ex=>{
        console.log(ex)
        return false
    })
}

const updateBalanceUser = async(data,id)=>{
    return await models.user.update(data,
        {where:{id}})
    .catch(ex=>{
        console.log(ex);
        return false
    })
}

const bulkCreate = async(data)=>{
    return models.sequelize.transaction(trans=> models.user_balance.build(data, {transaction: trans}).save()
    .then(dt =>{
        const saveHistory = models.user_balance_histories.build({
            user_balance_id:dt.id,
            balance_before:data.currentBalance,
            balance_after:data.afterBalance,
            activity:'transfer',
            ip:data.ip,
            location:data.loc,
            user_agent:data.userAgent,
            author:data.author,
            type:data.type
        }, {transaction: trans}).save()
        // return Promise.all([saveHistory])
        // .then(()=>getTransaction(dt.id))
    }))
    .catch(ex=>{
        console.log(ex);
        return false
    })
}
module.exports = {
    saveTransaction,
    getTransaction,
    updateBalanceUser,
    bulkCreate
}