
import {Line, Button, Link as L} from 'arwes'
import { Link } from "react-router-dom";

const abstractProps = {
	"films": ["release_date","director", "episode_id"],
	"starships": ["model", "manufacturer", "passengers", "cost_in_credits"],
	"planets": ["population", "gravity"],
	"vehicles": ["model", "manufacturer", "passengers", "cost_in_credits"],
	"species": ["classification", "language", "average_lifespan"],
	"people": ["gender", "homeworld", "birth_year"],
}

const renderInfo = (ressource, arr) => {
	if ( !Array.isArray(arr) )
		return arr

	else {

		return (
			<div>
				{arr.length ? (
					arr.map(el =>(
						<Link to={`/${el.url}`} style={{padding: "5px"}}>
							<Button style={{marginBottom: '10px'}}>{el.name}</Button>
						</Link>
					))
				) : ( 
					<p>[None]</p> 
				)}
			</div>
		)

	}
}

const RessourceTemplateParser = (props) => {
	return (
		<div style={{margin: 0}}>
			<span id="extendedView" style={{position: 'absolute', top: '-1000px'}}></span>
			{!props.abstract && Object.keys(props.data).map(key => (
				<div>
					<div><L>{key} : </L> {renderInfo(key, props.data[key])}</div>
					<Line />
				</div>
			))}

			{props.abstract && abstractProps[props.ressource.toLowerCase()].map(key => (
				<div>
					<div>
						<L>{key} : </L> {props.data[key]}
					</div>
					<Line />
				</div>
			))}
		</div>
	)
};

export default RessourceTemplateParser