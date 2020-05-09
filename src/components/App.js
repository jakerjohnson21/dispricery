import React, { Component } from 'react';
import Navigation from './Navigation';
import { withRouter } from 'react-router-dom';
import Routes from '../config/routes';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: ""
        }
    }


    render() {
        return (
            <>
                <Navigation />
                <div>
                    <Routes />
                </div>
            </>
        );
    }
}

export default withRouter(App); 