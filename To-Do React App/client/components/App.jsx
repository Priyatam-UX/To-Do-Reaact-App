import React from 'react'
import Todo from './Todo'
import Header from './Header'

class App extends React.Component {
	constructor(props) {
			super(props)
	}


	render() { 
		return (  
			<React.Fragment>
				<Header />
				<Todo />
			</React.Fragment>
		);
	}
}
 
export default App;