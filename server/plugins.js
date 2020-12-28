'use strict'

/**
 * Vendor modules
 */
const Vision = require('@hapi/vision')
const Inert = require('@hapi/inert');
const HapiSwagger = require('hapi-swagger')
const config = require('config')

/**
 * Internal modules
 */
const Package = require('./package.json')

const DEVELOPMENT = 'development'

/**
 * exports array of plugins with configuration.
 * @type {Array}
 */
let plugins = []

if (config.util.getEnv('NODE_ENV') === DEVELOPMENT) {

	// add hapi swagger integration
	plugins = plugins.concat(
		[
			Inert,
			Vision,
			{
				plugin: HapiSwagger,
				options: {
					info: {
						'title': Package.description,
						'version': Package.version
					},
				}
			},
			// {
			// 	plugin: require('hapi-cors'),
			// 	options: {
			// 		origins: ['http://localhost:3000']
			// 	}
			// }
		]
	)
}

module.exports = plugins
