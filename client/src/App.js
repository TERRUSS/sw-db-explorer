
import {
	Row, Col,
	Button,
	Loading,
	Line
} from 'arwes'

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect
} from "react-router-dom";

import { useState, useEffect } from 'react';

import ScrollToTop from './plugins/ScrollToTop'

import  helper from './helpers/api.js'

import Element from './components/Element'
import Ressource from './components/Ressource'

const App = () => {

	const [ressources, setRessources] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(()=>{
		helper.API(`/getRessources`, {
			method: 'GET'
		})
		.then(async (result) => {
			setRessources(result);
			setIsLoaded(true);
		})
	}, [isLoaded])

	return (
		<Router>
			<Row>
				<Col s={12}>
					<Row nested>
						<Col s={12} m={3} style={{border: "solid 2px #029dbb", padding: "20px", marginBottom: '50px' }}>
							<h3>Explore Ressource :</h3>
							<div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', alignItem: 'baseline'}}>
								{isLoaded && ressources.map(r=>(
									<Link key={r} style={{marginBottom: "20px"}} to={`/${r}`}>
										<Button animate>
											<h2 style={{margin: 0}}>{r}</h2>
										</Button>
									</Link>
								))}
								{!isLoaded &&
									<Loading animate />
								}
							</div>
						</Col>

						<Col s={12} m={9} id="content">
							<ScrollToTop />
								<Switch>

									{isLoaded && ressources.map((route, i) => (
										<Route 
											key={i} 
											path={`/${route}`}
										>
											<Route 
												key={i}
												ressource={route}
												path={`/${route}/:id`}
											>
												<Element ressource={route} abstract={false}/>

												<Line animate />
												<center><h3>---</h3></center>
											</Route>

											<Ressource/>
										</Route>

									))}

									<Route exact path="/">
										<Redirect to="/Films" />
									</Route>
									
									
								</Switch>

						</Col>
					</Row>
				</Col>
			</Row>
		</Router>
	)
}

export default App