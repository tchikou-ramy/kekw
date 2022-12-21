import {Navbar, Nav} from 'react-bootstrap'

function NavHeader() {
    return (
        <Navbar collapseOnSelect expand="lg" variant="dark" fixed="top" style={{backgroundColor: "#1e1f20"}}>
        <Navbar.Brand><img alt="" src="/assets.svg" width="30" height="30" className="d-inline-block align-top"/>
        {' '}
        Asset Management System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">

            </Nav>
            <Nav>
                <div>
                    {sessionStorage.getItem("role") === "admin"?
                        <img alt='Profile Pic' src='./anonymous.png' className='left_user_img'/>
                    :
                        <img alt='Profile Pic' src='./anonymous.png' className='left_user_img1'/>
                    }
                    <font className='left_user_info'>
                        {sessionStorage.getItem("username")}
                        {sessionStorage.getItem("role") === "admin" ? <br/>: null}
                        {sessionStorage.getItem("role") === "admin" ? <span>Admin</span> : null}
                    </font>
                </div>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    );
}
export default NavHeader