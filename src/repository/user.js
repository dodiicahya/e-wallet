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
    return models.user.build(data).save()
    .catch(ex=>{
        console.log(ex);
        return false
    })
}
const update = async(data,condition)=>{
    return models.user.update(data,
        {where:condition})
    .catch(ex=>{
        console.log(ex);
        return false
    })
}
module.exports = {
    findUser,
    store,
    update
}