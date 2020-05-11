import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
class UserFavorites extends Component {

    makeFavoritesList = async() => {
        let favs = await this.props.favorites
        favs.map(function(favorite, key) {
            return (
            <div> {favorite.name} </div>
            );
        })
    } 

    render() {
        return (
            <>
            {this.props.favorites ?
                <Container>
                    {this.makeFavoritesList}
                    <div>test</div>
                </Container>
            :
                <div>Loading favorites</div>
            }
            </>
        );
    }
}

export default UserFavorites;