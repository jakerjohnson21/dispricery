import React, { Component } from 'react';
import UserModel from '../models/user'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'

class RegisterModal extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        uid: ''
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        UserModel.register(this.state)
            .then(res => {
                console.log('res: ')
                console.log(res);
                this.props.setCurrentUser(res.data.userId)
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Modal centered={true} isOpen={this.props.toggleState} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>Register</ModalHeader>

                    <ModalBody>
                    <form onSubmit={this.handleSubmit}>

                        <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input onChange={this.handleInput} className="form-control form-control-lg" 
                            type="text" id="name" name="name" value={this.state.name}/>
                        </div>

                        <div className="form-group">
                        <label htmlFor="name">Email</label>
                        <input onChange={this.handleInput} className="form-control form-control-lg" type="email" id="email" name="email" value={this.state.email} />
                        </div>

                        <div className="form-group">
                        <label htmlFor="name">Password</label>
                        <input onChange={this.handleInput} className="form-control form-control-lg" type="password" id="password" name="password" value={this.state.password} />
                        </div>

                        <button className="btn btn-primary float-right" type="submit" data-dismiss="modal" onClick={this.props.toggle}>Register</button>
                    </form>

                    </ModalBody>
            </Modal>
        );
    }
}

export default RegisterModal;