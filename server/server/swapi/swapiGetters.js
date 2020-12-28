'use strict'

const boom = require('@hapi/boom')
const httpStatus = require('http-status')

const swapiCtrl = require('./swapiCtrl')


const getAllPeople = {
  ressource: 'People',
  endpoint: '/getAllPeople',
  handler: (request, h) => swapiCtrl.getRessourceList('people')
}

const getAllFilms = {
  ressource: 'Films',
  endpoint: '/getAllFilms', 
  handler: (request, h) => swapiCtrl.getRessourceList('films')
}
const getAllSpecies = {
  ressource: 'Species',
  endpoint: '/getAllSpecies', 
  handler: (request, h) => swapiCtrl.getRessourceList('species')
}
const getAllStarships = {
  ressource: 'Starships',
  endpoint: '/getAllStarships', 
  handler: (request, h) => swapiCtrl.getRessourceList('starships')
}
const getAllPlanets = {
  ressource: 'Planets',
  endpoint: '/getAllPlanets', 
  handler: (request, h) => swapiCtrl.getRessourceList('planets')
}
const getAllVehicles = {
  ressource: 'Vehicles',
  endpoint: '/getAllVehicles', 
  handler: (request, h) => swapiCtrl.getRessourceList('vehicles')
}


const getElement = {
  ressource: false,
  endpoint: '/getElement',
  handler: (request, h) => swapiCtrl.getElement(request.query.ressource, request.query.id)
}

module.exports = [
  getAllPeople,
  getAllFilms,
  getAllSpecies,
  getAllStarships,
  getAllPlanets,
  getAllVehicles,

  getElement
]
