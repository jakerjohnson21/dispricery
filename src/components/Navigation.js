import React, { useState } from 'react';
import { Nav, Navbar, NavbarBrand, NavItem, NavLink, NavbarToggler, Collapse } from 'reactstrap';
import RegisterModal from './RegisterModal';

const Navigation = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggleNav = () => setIsOpen(!isOpen);

    const [loginModal, setLoginModal] = useState(false);
    const toggleLoginModal = () => setLoginModal(!loginModal)

    const [registerModal, setRegisterModal] = useState(false);
    const toggleRegisterModal = () => setRegisterModal(!registerModal);

    return (
        <Navbar className='Navbar' light expand='md'>
            <NavbarBrand href='/'>Dispricery</NavbarBrand>
            <NavbarToggler onClick={toggleNav} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink href='/'>Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={toggleRegisterModal}>Register</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>

            <RegisterModal setCurrentUser={props.setCurrentUser} toggle={toggleRegisterModal} toggleState={registerModal} /> 
        </Navbar>
    );
}

export default Navigation;