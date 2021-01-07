import { useState } from 'react';

import {Frame} from 'arwes';

const Input = (props) => {

	const [value, setValue] = useState('');

	const handleChange = (event) => {
		setValue(event.target.value)
		props.onChange(event.target.value)
	}

	return (
		<Frame animate level={1} corners={3}>
			<input
				value={value}
				onChange={handleChange}
				placeholder={props.placeholder}
				style={styles.input}
			/>
		</Frame>
	)
}

const styles = {
	input: {
		backgroundColor: 'transparent',
		width: '100%',
		heigth: '100%',
		border: 'none',
		fontSize: '1em',
		color: '#26dafd',

		paddingLeft: '10px',
	}
}

export default Input
