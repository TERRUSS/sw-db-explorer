
// import { Button } from 'arwes'
import { useState, useEffect } from 'react';
import { 
	useRouteMatch,
	Link,
} from "react-router-dom";

import  helper from '../helpers/api.js'

import Element from './Element'

import {Loading, Link as L} from 'arwes'

const capitalize = r => r.charAt(0).toUpperCase() + r.slice(1)

const getRessourceID = (url)=>{
	return url.match(/[0-9]\/$/)
}

const Ressource = (props) => {
	let { url, path } = useRouteMatch();
	let ressource = path.slice(1);
	const [elements, setElements] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [isListView, setIsListView] = useState(true);

	useEffect(()=>{
		helper.API(`/getAll${capitalize(ressource)}`, {
			method: 'GET'
		})
		.then(async (result) => {
			setElements([...result.results]);
			setIsLoaded(true);
		})
	}, [isLoaded])

	useEffect(()=>{
		if (path.match(new RegExp(ressource+'$')))
			setIsListView(true)
		else
			setIsListView(false)

		setIsLoaded(false);
	}, [ressource, path])

	return (
		<div>
			<L href={`/${ressource}`}><h2 style={{marginBottom: 0}}>{ ressource }</h2> (click for a detailed report)</L>

			{isListView &&
				<div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItem: 'baseline'}}>
					{isLoaded && elements && elements.map((e, index) => (
							<div key={index} style={{padding: '10px', maxWidth: '500px'}}>
								<Link to={`${url}/${getRessourceID(e.url)}`} style={{color: 'inherit'}}>
									<Element ressource={ressource} data={e} abstract={true}/>
								</Link>
							</div>
					))}
					{!isLoaded &&
						<Loading animate />
					}
				</div>
			}
		
		</div>
	)
}

export default Ressource