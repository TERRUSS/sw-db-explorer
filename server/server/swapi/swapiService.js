
'use strict'

const axios = require('axios')
const config = require('config')
const { cleanResult } = require('./utils.js')

const format = ''
// const format = '/?format=wookiee' // TODO : edit cleanResult & routing system to make it wookiee compatible

const getRessourceList = async function (ressource, page) {
  const options = {
    method: 'get',
    url: `https://swapi.dev/api/${ressource+format}${page ? '?page='+page : ''}`,
    params: {}
  }

  try {
    const response = await axios(options)
    if (response.data.next) response.data.next = response.data.next.match(/\?page=\d$/)[0]
    if (response.data.previous) response.data.previous = response.data.previous.match(/\?page=\d$/)[0]
    return response.data
  } catch (error) {
    error.logged = true
    console.error('GetRessList', error, `Failed to fetch swapi for ${ressource} ${page ? '?page='+page : ''}`)
    throw error
  }
}


const getElement = async function (ressource, id) {
  const options = {
    method: 'get',
    url: `https://swapi.dev/api/${ressource}/${id}${format}`,
    params: {}
  }

  try {
    const response = await axios(options)
    return cleanResult(response.data)
  } catch (error) {
    error.logged = true
    console.error('GetEl', error, `Failed to fetch swapi for ${options.url}`)
    throw error
  }
}

const search = async function (resource, research) {
  const options = {
    method: 'get',
    url: `https://swapi.dev/api/${resource}/?search=${research}${format}`,
    params: {}
  }

  try {
    const response = await axios(options)
    console.log(response.data)
    if (response.data.next) response.data.next = response.data.next.match(/\&page=\d$/)[0]
    if (response.data.previous) response.data.previous = response.data.previous.match(/\&page=\d$/)[0]
    return response.data
  } catch (error) {
    error.logged = true
    console.error('GetEl', error, `Failed to fetch swapi for ${options.url}`)
    throw error
  }
}

const getElementName = async function (ressource, id) {

  const cache = require('./cache.js')

  return new Promise(async (resolve, reject) => {

      // chech if el is already in the cache
    let element = await cache.get(ressource,id)
    if (element){
      console.log(element)
      resolve( element.name ? element.name : element.title )
    }

    else {
      getElement_base(ressource, id)
        // push el in cache for next time
      .then(res => {console.log("Cashing", res.name ? res.name : res.title); cache.push(ressource, id, res); return res})
      .then(res => {resolve( res.name ? res.name : res.title )})
    }
  })
}

const getElement_base = async function (ressource, id) {
  const options = {
    method: 'get',
    url: `https://swapi.dev/api/${ressource}/${id}${format}`,
    params: {}
  }

  try {
    const response = await axios(options)
    return response.data
  } catch (error) {
    error.logged = true
    console.error('GetEl_base', error, `Failed to fetch swapi for ${options.url}`)
    throw error
  }
}


module.exports = {
  getRessourceList, getElement, getElementName, search
}
