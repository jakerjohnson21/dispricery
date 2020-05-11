import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../components/Home';
import Profile from '../components/Profile';

export default (props) => (
    <Switch>
        
        <Route exact path="/" render={ (routeProps) => {
          return <Home 
                  {...routeProps}
                  currentUserId={props.currentUserId}
                  /> 
        }}/>
        <Route exact path="/profile" render={ (routeProps) => {
          return <Profile 
                  {...routeProps}
                  currentUserId={props.currentUserId}
                  /> 
        }}/>
        
    </Switch>
)