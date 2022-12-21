import React, { Component } from 'react';
import axios from 'axios';

class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: {}
    }
  }

  componentDidMount() {
    const apiUrl = `http://localhost:3001/users/getProfile/${sessionStorage.getItem("email")}`;
    axios
      .put(apiUrl)
      .then(result => {
        this.setState({
          response: result.data.profile[0]
        })
        // console.log(this.state.response)
      })
      .catch(error => {
        this.setState({ error });
      });
       
  }

  render() {
    return(
      <div class="rounded bg-white mt-4">
        <div class="row">
          <div class="col-md-3 border-right">
              <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                <img class="rounded-circle mt-5" alt='Profile Pic' src="https://am.techjockey.com/assets/img/demo/profile-pics/anonymous.png" width="90" />
                <span class="font-weight-bold">{this.state.response.name}</span>
                <span class="text-black-50">{this.state.response.email}</span>
              </div>
          </div>
          <div class="col-md-9">
            <div class="p-3 py-5">
              <div class="d-flex justify-content-between align-items-center mb-3">
                  <div class="d-flex flex-row align-items-center back"></div>
                  <h6 onClick={() => this.props.editProfile(this.state.response)} class=" d-flex flex-row align-items-center back text-right"><i class="fas fa-user-edit mr-1 mb-1"></i></h6>
              </div>
              <div class="row mt-2">
                  <div class="col-md-4"><span>Name</span></div>
                  <div class="col-md-8">{this.state.response.name}</div>
              </div>
              <div class="row mt-3">
                  <div class="col-md-4"><span>Phone Number</span></div>
                  <div class="col-md-8">{this.state.response.number}</div>
              </div>
              <div class="row mt-3">
                  <div class="col-md-4"><span>Address</span></div>
                  <div class="col-md-8">{this.state.response.address}</div>
              </div>
              <div class="row mt-3">
                  <div class="col-md-4"><span>Country</span></div>
                  <div class="col-md-8">{this.state.response.country}</div>
              </div>
              <div class="row mt-3">
                  <div class="col-md-4"><span>State</span></div>
                  <div class="col-md-8">{this.state.response.state}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default ProfileView;

