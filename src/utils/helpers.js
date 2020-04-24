'use strict'
const uuidv1 = require('uuid/v1')
const uuidv4 = require('uuid/v4')
var bcryptjs = require('bcryptjs')

const getRandomStringUUID = (count) => {
	if(count<32) count=32
	if(count>64) count=64
	const data = (uuidv1()+uuidv4()).replace(/[^a-zA-Z0-9]/g, '')
	return data.substr(0, count)
}

const formatPageLimit = (data) => {
	data.offset = (data.page<=1)?0:((data.page-1)*data.count)
	data.limit = data.count 
	return data
}

const generateEpochTime = () => (new Date).getTime()

const bcryptGenerate = (plaintext) => {
	var salt = bcryptjs.genSaltSync(10)
	return bcryptjs.hashSync(plaintext, salt)
}

const compareBcrypt = (plaintext, chipertext) => bcryptjs.compareSync(plaintext, chipertext)

module.exports = {
	getRandomStringUUID,
	formatPageLimit,
	generateEpochTime,
	bcryptGenerate,
	compareBcrypt
}