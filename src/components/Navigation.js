import React, { useState } from 'react';
import { Nav, Navbar, NavbarBrand, NavItem, NavLink, NavbarToggler, Collapse, NavbarText } from 'reactstrap';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import '../styles/nav.css';

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

                    { props.currentUserID ?
                        <>
                            <NavItem>
                                <NavLink className='NavLink' href="/profile">Profile</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='NavLink' href='/' onClick={props.logout}>Logout</NavLink>
                            </NavItem>
                        </>
                    :
                        <>
                            <NavItem>
                                <NavLink className='NavLink' onClick={toggleRegisterModal}>Register</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='NavLink' onClick={toggleLoginModal}>Login</NavLink>
                            </NavItem>
                        </>
                    }
                </Nav>
                { props.currentUserName ?
                    <>
                        <NavbarText> Hello {props.currentUserName}!</NavbarText>
                    </>
                :
                    <>  
                    </>
                }
            </Collapse>

            <RegisterModal setCurrentUser={props.setCurrentUser} toggle={toggleRegisterModal} toggleState={registerModal} /> 
            <LoginModal setCurrentUser={props.setCurrentUser} toggle={toggleLoginModal} toggleState={loginModal} />
        </Navbar>
    );
}

export default Navigation;