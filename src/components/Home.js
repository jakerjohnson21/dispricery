import React, { Component } from 'react';
import StoreCompare from './StoreCompare';
import '../styles/home.css';

import { Button, Container } from 'reactstrap';
import axios from 'axios';
import UserModel from '../models/user';

const publicIp = require('public-ip');
const ipLocation = require('iplocation');


class Home extends Component {
    state = {
        ip: '',
        lat: '',
        lng: '',
        stores: null,
        viewedStores: [],
        storeOne: null,
        storeTwo: null,
        city: '',
        dataLoaded: false,
        locationSearchDone: false
    }

    componentDidMount() {
        this.getLocation()
        console.log('Store listings call made...')
        
    }

    componentDidUpdate() {
        if (!this.state.locationSearchDone && this.state.lat != '') {
            axios.get(`https://api-g.weedmaps.com/discovery/v1/listings?filter%5Bany_retailer_services%5D%5B%5D=storefront&latlng=${this.state.lat}%2C${this.state.lng}&page_size=100`)
            .then((res) => {
            console.log(res)
            this.setState({
                stores: res.data.data.listings,
                dataLoaded: true,
                locationSearchDone: true,
                storeOne: res.data.data.listings[3],
                storeTwo: res.data.data.listings[8]
            })
        })
        }
    }

    getLocation = async() => {
        let userIp = await publicIp.v4()
        this.setState({
            ip: userIp
        })

        let userLocation = await ipLocation(userIp)
        this.setState({
            lat: userLocation.latitude,
            lng: userLocation.longitude,
            city: `${userLocation.city}, ${userLocation.region.code}`
        })
    }

    updateStoreOne = async() => {
        let stores = await this.state.stores
        let randIndex = Math.floor(Math.random() * stores.length)
        let newStore = stores[randIndex]
        this.setState({
            storeOne: newStore
        })
    }

    updateStoreTwo = async() => {
        let stores = await this.state.stores
        let randIndex = Math.floor(Math.random() * stores.length)
        let newStore = stores[randIndex]
        this.setState({
            storeTwo: newStore
        })
    }

    updateFavorites = (newFav) => {
        UserModel.addFavorite(this.props.currentUserId, newFav)
        .then((res) => {
            console.log('yay')
            console.log(res)
        })
        .catch((err) => {console.log(err)})
    }

    render() {
        return (
            <>
                <Container className="store-compare">
                    <br />
                    <div style={{color: 'grey'}}>
                        Showing results for: {this.state.city}
                    </div>
                    {this.state.dataLoaded ?
                        <div>
                            <StoreCompare updateFavorites={this.updateFavorites} updateStoreOne={this.updateStoreOne} updateStoreTwo={this.updateStoreTwo} storeOne={this.state.storeOne} storeTwo={this.state.storeTwo}/>
                        </div>
                    :
                        <div></div>
                    }
                </Container>
            </>
        );
    }
}

export default Home;