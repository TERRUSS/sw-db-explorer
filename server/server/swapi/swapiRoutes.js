'use strict'

const config = require('config')

const getters = require('./swapiGetters')

const API_PATH = '/' + config.get('app.name')

const routes = []

require('./cache.js').init() // init cache for more speeeeeed

// GET all ressources avaliable : eg. ["Films", "People", "Starships"...] // TODO: dynamize https://swapi.dev/api/ (=> wookiee compat)
routes.push({
	path: API_PATH + '/getRessources',
	method: 'GET',
	handler: (request, h) => getters.filter(f => {if (f.ressource) return f.ressource}).map(f => f.ressource),
	options: {
		tags: ['api'],
	}
})

// GETTERS for all ressources list : getAllFilms, getAllPeople,...
for (let getter of getters){
	routes.push({
		path: API_PATH + getter.endpoint,
		method: 'GET',
		handler: getter.handler,
		options: {
			tags: ['api'],
		}
	})
}

module.exports = routes
