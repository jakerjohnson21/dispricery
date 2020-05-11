import React, { Component, useState } from 'react';
import { Container, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Button } from 'reactstrap';
import classnames from 'classnames';
import '../styles/home.css';
import axios from 'axios';
import MenuListItem from './MenuListItem';

class StoreCompareCard extends Component {

        state = {
            activeTab: '1',
            storeData: null,
            dataLoaded: false,
            passedData: null,
            storeName: '',
            menuItems: null
        }

        updateActiveTab(tabChoice) {
            this.setState({
                activeTab: tabChoice
            })
        }

        componentDidMount() {
            axios.get(`https://api-g.weedmaps.com/discovery/v1/listings/dispensaries/${this.props.storeData.slug}/`)
            .then(res => {
                this.setState({
                    storeData: res.data.data.listing,
                    storeName: res.data.data.listing.name,
                    dataLoaded: true
                })
            })

            axios.get(`https://api-g.weedmaps.com/discovery/v1/listings/dispensaries/${this.props.storeData.slug}/menu_items?page_size=25`)
            .then(res => {
                this.setState({
                    menuItems: res.data.data.menu_items
                })
            })
        }
    

        componentDidUpdate() {
            if (this.state.storeName != this.props.storeData.name) {
                axios.get(`https://api-g.weedmaps.com/discovery/v1/listings/dispensaries/${this.props.storeData.slug}/`)
                .then(res => {
                this.setState({
                    storeData: res.data.data.listing,
                    storeName: res.data.data.listing.name,
                    dataLoaded: true
                })

                axios.get(`https://api-g.weedmaps.com/discovery/v1/listings/dispensaries/${this.props.storeData.slug}/menu_items?page_size=25`)
                .then(res => {
                    this.setState({
                        menuItems: res.data.data.menu_items
                        })
                    })
                })
            }
        }

        render() {
            if (this.state.dataLoaded) {
                return (
                    <Container fluid={true} className="store-card">
                        <Row className='card-top-section'>
                            <Col className='card-image-container' md={4}>
                                <img src={this.state.storeData.avatar_image.small_url}/>
                            </Col>
                            <Col md={8} style={{height: "100%"}} className='card-store-info-section'>
                                <Row style={{"padding-top": "1rem", "padding-bottom": "1rem", "padding-left": "2rem"}}>
                                    {this.state.storeData.name}
                                </Row>
                                <Row style={{"padding-left": "2rem"}}>
                                    {this.state.storeData.address}, {this.state.storeData.city}
                                </Row>
                                <Row style={{"padding-left": "2rem"}}>
                                    {this.state.storeData.phone_number}
                                </Row>
                                <Row style={{"padding-left": "2rem", "text-overflow": 'ellipsis'}}>
                                    <a href={this.state.storeData.web_url}>Website</a>
                                </Row>
                                <Row style={{"padding-left": "2rem"}}>
                                    Rating: {this.state.storeData.rating.toFixed(1)} <span style={{color: 'lightgray', paddingLeft: '1rem'}}> (Review Count: {this.state.storeData.reviews_count})</span>
                                </Row>
                            </Col>
                        </Row>
                        <Row className='card-middle-section'>
                            <div>
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '1' })}
                                            onClick={() => { this.updateActiveTab('1') }}
                                        >
                                            Store Description
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '2' })}
                                            onClick={() => { this.updateActiveTab('2') }}
                                        >
                                            Store Items
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1" className='card-tab-container'>
                                            {this.state.storeData.intro_body ?
                                                <div style={{padding: '1rem'}} dangerouslySetInnerHTML={{__html: this.state.storeData.intro_body}}></div>
                                            :
                                                <div> Store has not added a description</div>
                                            }
                                    </TabPane>
                                    <TabPane tabId="2" className='card-tab-container'>
                                        {this.state.menuItems ?
                                            <>
                                                {this.state.menuItems.map(function(item, i) {
                                                    return <MenuListItem item={item}/>
                                                })}
                                            </>
                                        :
                                            <div>Store does not have menu items listed</div>
                                        }
                                    </TabPane>
                                </TabContent>
                            </div>
                        </Row>
                        <Row className='card-bottom-section'>
                            <Col md={6} className="center-items">
                                <Button color='success' onClick={() => this.props.updateFavorites({name: this.state.storeData.name, slug: this.state.storeData.slug, website: this.state.storeData.web_url, image: this.state.storeData.avatar_image.small_url})}>
                                    Favorite
                                </Button>
                            </Col>
                            <Col md={6} className="center-items"> 
                                <Button color='secondary' onClick={this.props.replaceStore}>
                                    Replace
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                );
            } else {
                return (
                    <div> Loading...</div>
                );
            }}
}

export default StoreCompareCard;