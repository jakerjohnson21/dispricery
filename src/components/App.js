import React, { Component } from 'react';
import Navigation from './Navigation';
import { withRouter } from 'react-router-dom';
import Routes from '../config/routes';
import UserModel from '../models/user';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: localStorage.getItem('uid'),
            dbId: "1"
        }
    }

    setCurrentUser = (userId) => {
        this.setState({
            currentUser: userId
        })

        localStorage.setItem('uid', userId)
    }

    logout = (event) => {
        event.preventDefault();
        localStorage.removeItem('uid');
        UserModel.logout()
            .then(res => {
                console.log(res)
                this.setState({
                    currentUser: null,
                    dbId: ""
                })
                this.props.history.push('/')
            })
            .catch(err => console.log(err))
    }


    render() {
        return (
            <>
                <Navigation setCurrentUser={this.setCurrentUser} currentUser={this.state.currentUser} logout={this.logout}/>
                <div>
                    <Routes />
                </div>
            </>
        );
    }
}

export default withRouter(App); 