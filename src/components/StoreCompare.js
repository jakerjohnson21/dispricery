import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../styles/home.css';

import StoreCompareCard from './StoreCompareCard';

class StoreCompare extends Component {

    render() {
        return (
                <Row className="store-cards-container">
                    <Col md={6}>
                        <StoreCompareCard updateFavorites={this.props.updateFavorites} replaceStore={this.props.updateStoreOne} storeData={this.props.storeOne}/>
                    </Col>
                    <Col md={6}>
                        <StoreCompareCard updateFavorites={this.props.updateFavorites} replaceStore={this.props.updateStoreTwo} storeData={this.props.storeTwo}/>
                    </Col>
                </Row>
        );
    }
}

export default StoreCompare;