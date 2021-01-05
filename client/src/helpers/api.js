
const ENDPOINT = 'http://localhost:8080/swapi-wrapper'
// const ENDPOINT = 'https://swexplorer-api.benaben.space/swapi-wrapper'


export default {

	ENDPOINT: ENDPOINT,

	API: (route, options) => {
		return fetch(`${ENDPOINT}${route}`, {
			...options,
			headers: {
				//'x-access-token': window.localStorage.getItem('token')
			}
		})
		.then(response => response.json())
		.catch((e) => {
			console.error(e);
			throw e
		});
	}

}