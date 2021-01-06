'use strict'

const boom = require('@hapi/boom')
const httpStatus = require('http-status')

const swapiCtrl = require('./swapiCtrl')


const getAllPeople = {
  ressource: 'People',
  endpoint: '/getAllPeople',
  handler: (request, h) => swapiCtrl.getRessourceList('people', request.query.page)
}

const getAllFilms = {
  ressource: 'Films',
  endpoint: '/getAllFilms', 
  handler: (request, h) => swapiCtrl.getRessourceList('films', request.query.page)
}
const getAllSpecies = {
  ressource: 'Species',
  endpoint: '/getAllSpecies', 
  handler: (request, h) => swapiCtrl.getRessourceList('species', request.query.page)
}
const getAllStarships = {
  ressource: 'Starships',
  endpoint: '/getAllStarships', 
  handler: (request, h) => swapiCtrl.getRessourceList('starships', request.query.page)
}
const getAllPlanets = {
  ressource: 'Planets',
  endpoint: '/getAllPlanets', 
  handler: (request, h) => swapiCtrl.getRessourceList('planets', request.query.page)
}
const getAllVehicles = {
  ressource: 'Vehicles',
  endpoint: '/getAllVehicles', 
  handler: (request, h) => swapiCtrl.getRessourceList('vehicles', request.query.page)
}


const getElement = {
  ressource: false,
  endpoint: '/getElement',
  handler: (request, h) => swapiCtrl.getElement(request.query.ressource, request.query.id)
}

const search = {
  ressource: false,
  endpoint: '/search',
  handler: (request, h) => swapiCtrl.search(request.query.ressource, request.query.research)
}

module.exports = [
  getAllPeople,
  getAllFilms,
  getAllSpecies,
  getAllStarships,
  getAllPlanets,
  getAllVehicles,

  getElement,
  search
]
