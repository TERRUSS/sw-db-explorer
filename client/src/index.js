import React from 'react';
import ReactDOM from 'react-dom';
import { 
	ThemeProvider, Arwes, createTheme,
	Header, Footer, Link
 } from 'arwes';

import App from './App'

import GithubLogo from './components/misc/GithubLogo'

import "./index.css"

ReactDOM.render(
	<ThemeProvider theme={createTheme()}>
		<Arwes>
        <div style={{ padding: 20 }}>
	        <Header animate style={{ marginBottom: "50px" }}>
				<h1 style={{ margin: 0 }}>SW_database_Explorer</h1>
			</Header>
            
            <App/>

            <Footer animate>
			<p>
				<Link href="https://olivier.benaben.space">Olivier Benaben</Link> &nbsp;&nbsp; · &nbsp;&nbsp;
				<Link href="https://github.com/TERRUSS/SW_database_Explorer"><GithubLogo/></Link> &nbsp;&nbsp; · &nbsp;&nbsp;
				<small style={{fontSize: '0.8em'}}>Credits &nbsp;
					<Link href="https://swapi.dev">SWAPI</Link>, &nbsp;
					<Link href="https://arwes.dev">Arwes</Link>
				</small>
			</p>
		</Footer>
        </div>
    </Arwes>
	</ThemeProvider>
	,
	document.getElementById('root')
);