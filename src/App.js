import React, {Component} from 'react';
import dgi_logo from './dgi_logo.png'
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
                    <img src={dgi_logo} className="logo" alt="logo" />
                </header>

                <Gallery elements={this.state.data}/>
            </div>
        );
    }
}

export default App;
