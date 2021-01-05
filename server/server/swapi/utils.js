'use strict'


const cleanResult = (json) => {

  return new Promise(async (resolve, reject) => {

    await removeMeatadatas(json)
    await appropriateUrlRefs(json)

    console.log("</CLEAN RESULT>")

    console.log(json)
    resolve(json)
  })

}


const removeMeatadatas = function (json) {
  for (let i of ["created", "edited", "url"]){
    delete json[i]
  }
}

const appropriateUrlRefs = async function (json) {
  for (let i of Object.keys(json)) {
    if (Array.isArray(json[i]))
        // json[i] = json[i].map(async url => await cleanURL(url))
      for (let j in json[i])
        json[i][j] = await cleanURL(json[i][j])

    else
      json[i] = await cleanURL(json[i])
  }

  console.log("</CLEAN URLS>")

  return json
}



const cleanURL = async function (url) {

  return new Promise(async (resolve, reject) => {

    const { getElementName } = require('./swapiService.js')

    if (typeof url === "string" && url.match(/^http/)){

      const ressourceURL = url.match(/[a-zA-Z]+\/[0-9]+\/$/)[0].slice(0,-1)
      const ressource = ressourceURL.match(/[a-zA-Z]+\//)[0].slice(0,-1)
      const elementID = ressourceURL.match(/[0-9]+$/)[0]

      let name = `${ressource}#${elementID}`

      console.log("PARSING", name)

      getElementName(ressource, elementID)
      .then(name => resolve( {'name': name, 'url': ressourceURL} ))

    }

    else resolve( url ) // this is no url
  })
}

module.exports = {
  cleanResult, cleanURL
}