import {Navbar, Nav, Button} from 'react-bootstrap'

function LoginHeader() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="white" variant="light" fixed="top">
        <Navbar.Brand href="/">
            <img alt="" src="/assets.svg" width="30" height="30" className="d-inline-block align-top"/>
            {' '}
            Asset Management System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
            <div className="mb-2">
            <Button href="/sign-in" variant="primary" size="sm">SignIn</Button>
            {' '}
            <Button href="/sign-up" variant="primary" size="sm">SignUp</Button>
            </div>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    );
}
export default LoginHeader