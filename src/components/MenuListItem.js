import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap'
import '../styles/menu-item.css'

class MenuListItem extends Component {
    render() {
        return (
            <Container>
                <Row className='list-item-container'>
                    <Col md={3} className='list-item'>
                        <img src={this.props.item.avatar_image.original_url} />
                    </Col>
                    <Col md={6} className='list-item'>
                        {this.props.item.name}
                    </Col>
                    <Col md={3} className='list-item'>
                        <div>${this.props.item.price_stats.min} (1/8)</div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default MenuListItem;