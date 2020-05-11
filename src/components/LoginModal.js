import React, { Component } from 'react';
import { Redirect } from "react-router-dom"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import UserModel from '../models/user'

class LoginModal extends Component {
    state = {
        email: '',
        password: '',
        redirect: null
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        UserModel.login(this.state)
          .then((res) => {
            console.log('res')
            console.log(res.data)
            this.props.setCurrentUser(res.data.data._id, res.data.data.name)
            this.setState({ redirect: "/" });

          })
          .catch((err) => console.log(err))
    }

    render() {
        return (
            <Modal centered={true} isOpen={this.props.toggleState} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>Login</ModalHeader>

                <ModalBody>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Email</label>
                            <input onChange={this.handleChange} className="form-control form-control-lg" 
                            type="email" id="email" name="email" value={this.state.email} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input onChange={this.handleChange} className="form-control form-control-lg" 
                            type="password" id="password" name="password" value={this.state.password} />
                        </div>
                        <button className="btn btn-primary float-right" type="submit" onClick={this.props.toggle}>Login</button>
                    </form>
                </ModalBody>
            </Modal>
        );
    }
}

export default LoginModal;