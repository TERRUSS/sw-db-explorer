
const get = (ressource, id) => {
	return new Promise(async (resolve, reject) => {
		let res = global.cache.get(`${ressource}#${id}`)
		res = JSON.parse(res)

		resolve(res)
	})
}

const push = function (ressource, id, object) {
	return global.cache.put(`${ressource}#${id}`, JSON.stringify(object))
}

const init = () => { 
	global.cache = require('memory-cache')
}

module.exports = {
  push, get, init
}