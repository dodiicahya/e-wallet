const models = require('../models')

const findUser = (body)=>{
    return models.user.findOne({
		where: body
	}).then(data=> JSON.parse(JSON.stringify(data)))
    .catch(ex=>{
        console.log(ex);
        return false
    })
}
const store = async(data)=>{
    return await models.user.build(data).save()
    .catch(ex=>{
        console.log(ex);
        return false
    })
}
const update = async(data,condition)=>{
    return await models.user.update(data,
        {where:condition})
    .catch(ex=>{
        console.log(ex);
        return false
    })
}
const getUserHistory = (id)=>{
    return models.user_balance_histories.findAll({
		include: [{
			model: models.user_balance,
			required: true,
            where : {user_id: id },
        }]
    }).then(data=> JSON.parse(JSON.stringify(data)))
    .catch(ex=>{
        console.log(ex)
        return false
    })
}
module.exports = {
    findUser,
    store,
    update,
    getUserHistory
}