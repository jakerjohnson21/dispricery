import React, { Component } from 'react';
import Navigation from './Navigation';
import { withRouter } from 'react-router-dom';
import Routes from '../config/routes';
import UserModel from '../models/user';
import '../styles/app.css'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUserID: localStorage.getItem('uid'),
            currentUserName: null,
            dbId: "1"
        }
    }

    setCurrentUser = (userId, userName) => {

        console.log('setCurrentUser called, ' + userName)
        this.setState({
            currentUserID: userId,
            currentUserName: userName
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
                    currentUserID: null,
                    currentUserName: null,
                    dbId: ""
                })
                this.props.history.push('/')
            })
            .catch(err => console.log(err))
    }


    render() {
        return (
            <div className='main-section'>
                <Navigation setCurrentUser={this.setCurrentUser} currentUserID={this.state.currentUserID} currentUserName={this.state.currentUserName} logout={this.logout}/>
                <div>
                    <Routes currentUserId={this.state.currentUserID}/>
                </div>
            </div>
        );
    }
}

export default withRouter(App); 