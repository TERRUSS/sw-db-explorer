import { useState, useEffect } from 'react';
import {Project, Words, Loading, Button} from 'arwes'

import { useParams, useRouteMatch } from "react-router-dom";

import helper from '../helpers/api.js'

import ElementTemplateParser from './ElementTemplateParser'

const Element = (props) => {
	let { url, path } = useRouteMatch();
	let {id} = useParams();

	const [element, setElement] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(()=>{
		console.log(id, props.ressource)

		if (props.data){
			setElement(props.data);
			setIsLoaded(true);
		}

		else if (id) {
			console.log(`Loading from ${path}/${id}`)

			helper.API(`/getElement?ressource=${props.ressource.toLowerCase()}&id=${id}`, {
				method: 'GET'
			})
			.then(async (result) => {
				setElement(result || {name: 'ERROR', content: 'ERROR'});
				setIsLoaded(true);
			})
			.catch(e => setElement({name: 'ERROR', films: [e+'']}))
		}
	}, [isLoaded, id])

	useEffect(() => {
	if (document.getElementById('extendedView'))
  		document.getElementById('extendedView').scrollIntoView({ behavior: 'smooth' })
	  console.log("scrolling")
	}, [isLoaded, id])


	return (
		<Project
			animate
			header={ element.name || element.title }
		>

			{isLoaded ? (
				<Words>
					<ElementTemplateParser abstract={!id} data={element} ressource={props.ressource}/>
				</Words>
			) : (
				<div style={{textAlign: 'center'}}>
					<div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItem: 'baseline'}}>
						<Loading animate />
					</div>
					<div style={{fontSize: '.7em'}}>
						<p>Fetching data...</p>
						<small>(Can take a moment the fist time)</small>
					</div>
				</div>
			)}
		</Project>
	)
}

export default Element