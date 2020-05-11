import React, { Component } from 'react';
import { Row, Col } from 'reactstrap'
import '../styles/profile.css';

class UserInfoContainer extends Component {
    render() {
        return (
            <div className="user-info"> 
                <Row>
                    <Col md={2} className='center'>
                        {this.props.name}
                    </Col>
                    <Col md={2} className='center'>
                        {this.props.email}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default UserInfoContainer;