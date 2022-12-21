import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import NavHeader from './navheader';

export default class Sidebar extends Component {
    KillSession = () => {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('role');
        sessionStorage.clear();
    };

    render() {
        return (
            <>
                <NavHeader/>
                <div class="sidebar">
                    <Link to="/dashboard"><i class="fas fa-home"></i><span>Dashboard</span></Link>
                    <Link to="/asset"><i class="fas fa-cart-plus"></i><span>Assets</span></Link>
                    <Link to="/status"><i class="fas fa-question-circle"></i><span>Status</span></Link>
                    <Link to="/setting"><i class='fas fa-user'></i><span>Profile</span></Link>
                    <Link to="/sign-in" onClick={this.KillSession}><i class="fas fa-sign-out-alt"></i><span>Logout</span></Link>
                </div>
            </>
        )
    }
}
