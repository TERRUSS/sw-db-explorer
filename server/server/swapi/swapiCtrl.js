'use strict'

const swapiService = require('./swapiService')

const boom = require('@hapi/boom')
const httpStatus = require('http-status')

const getRessourceList = async function (ressource, page) {
	try {
		return await swapiService.getRessourceList(ressource, page)
	} catch (error) {
		const errorMessage = `Failed to fetch swapi for ${ressource} ${page ? '?page='+page : ''}`
		!error.logged && console.error(error, errorMessage)
		return { statusCode: httpStatus.INTERNAL_SERVER_ERROR, message: errorMessage }
	}
}

const getElement = async (ressource, id) => {
	console.log(`GET Element : ${ressource} ${id}`)

	if (ressource && id) {
		try {
			return swapiService.getElement(ressource, id)
		} catch (error) {
			const errorMessage = `Failed to fetch swapi for ${ressource}:${id}`
			!error.logged && console.error(error, errorMessage)
			return boom.boomify(error, { statusCode: httpStatus.INTERNAL_SERVER_ERROR, message: errorMessage })
		}
	}
	else {
		return { statusCode: httpStatus.BAD_REQUEST, message: "Missing arguments" }
	}

}

const search = async (ressource, research) => {
	console.log(`GET Search : ${ressource}/${research}`)

	if (research) {
		try {
			return swapiService.search(ressource, research)
		} catch (error) {
			const errorMessage = `Failed to fetch swapi for ${ressource}/${research}`
			!error.logged && console.error(error, errorMessage)
			return boom.boomify(error, { statusCode: httpStatus.INTERNAL_SERVER_ERROR, message: errorMessage })
		}
	}
	else {
		return { statusCode: httpStatus.BAD_REQUEST, message: "Missing arguments" }
	}

}

module.exports = {
  getRessourceList, getElement, search
}