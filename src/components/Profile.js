import React, { Component } from 'react';
import UserInfoContainer from './UserInfoContainer';
import UserFavorites from './UserFavorites';
import UserModel from '../models/user';
import { Container, Card, CardBody, CardTitle, CardText } from 'reactstrap';


class Profile extends Component {

    state = {
        name: '',
        email: '',
        favorites: []
    }

    componentDidMount() {
        let dbid = this.props.currentUserId;
        UserModel.getUser(dbid)
        .then(res => {
            console.log(res.data.data);
            this.setState({
                name: res.data.data.name,
                email: res.data.data.email,
                favorites: res.data.data.favorites
            })
        })
        .catch((err) => {console.log(err)})
    }

    render() { 
        return (
            <>
                <UserInfoContainer name={this.state.name} email={this.state.email}/>
                <Container>
                    {this.state.favorites.map(function(fav, key) {
                        return (
                            <>
                                <Card>
                                        <CardBody>
                                            <CardTitle>{fav.name}</CardTitle>
                                            <CardText><a href={fav.website}>Website</a></CardText>
                                        </CardBody>
                                </Card>
                                <br/>
                            </>
                        )
                    })}
                </Container>
                
            </>
        );
    }
}

export default Profile;