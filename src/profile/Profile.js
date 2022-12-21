
import React, { Component } from 'react';
import axios from 'axios';
import { Container, Alert } from 'react-bootstrap';
import ProfileView from './ProfileView';
import ProfileForm from './ProfileForm';
import Sidebar from "../NavSidebar/Sidebar";

class Profile extends Component {    
  constructor() {
    super();
    this.state = {
      isEditProfile: false,
      error: null,
      visible : false,
      response: {},
      user_info: {},
      
    }
  }

  editProfile = user_info_from_profileView => {
    this.setState({ 
      isEditProfile: true,
      user_info: user_info_from_profileView
    });
  }
  
  onCancel = () => {
    this.setState({
      isEditProfile: false,
      user_info: {}
    });
  }
  
  onShowAlert = () =>{
    this.setState({
      visible:true
      },()=>{
      setTimeout(()=>{
        this.setState({
          visible:false
        })
      },1000)
    });
  }

  onFormSubmit = formdata => {
    axios
      .post('http://localhost:3001/users/updateProfile',formdata)
      .then(result => {
        this.setState({
          response: result.data,
          isEditProfile: false,
        })
        this.onShowAlert()
      })
      .catch(error => {
        this.setState({ error });
      });
      sessionStorage.removeItem("username")
      sessionStorage.setItem("username", formdata.name)
  }

  render() {
    let profileForm_OR_profileView;
    if(this.state.isEditProfile) {
      profileForm_OR_profileView = <ProfileForm onFormSubmit={this.onFormSubmit} user_info={this.state.user_info} onCancel={this.onCancel}/>
    }else{
      profileForm_OR_profileView = <ProfileView editProfile={(user_info) => this.editProfile(user_info)} />
    }
    return (
      <>
      <Sidebar/>
      <div className="App">
        <Container>
          {this.state.response.status === 'success' && this.state.visible && <div><br /><Alert  variant="info" isOpen={this.state.visible}>{this.state.response.message}</Alert></div>}
          {profileForm_OR_profileView}
          {/* {this.state.error && <div>Error: {this.state.error.message}</div>} */}
        </Container>
      </div>
      </>
    );
  }
}
export default Profile;
