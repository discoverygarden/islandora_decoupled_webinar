import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import reactAppData from './utils/api'
import Gallery from './components/Masonry/masonry'

class App extends Component {

    constructor() {
        super()
        this.state = {
            data: []
        }
    }

    async componentDidMount() {
        const stateData = await reactAppData();

        this.setState({
            data: stateData
        })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>

                </header>

                <Gallery islandora_data={this.state.data}/>
            </div>
        );
    }
}

export default App;
