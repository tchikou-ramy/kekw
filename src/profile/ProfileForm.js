import React from 'react';

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.user_info
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onFormSubmit(this.state);
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit} >
    <div class="rounded bg-white mt-4">
      <div class="row">
          <div class="col-md-3 border-right">
              <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                <img class="rounded-circle mt-5" alt='Profile Pic' src="https://am.techjockey.com/assets/img/demo/profile-pics/anonymous.png" width="90" />
                <span class="font-weight-bold">{this.state.name}</span>
                <span class="text-black-50">{this.state.email}</span>
              </div>
          </div>
      

          <div class="col-md-9">
              <div class="p-3 py-5">
                  <div class="d-flex justify-content-between align-items-center mb-3">
                      <div class="d-flex flex-row align-items-center back"></div>
                      <h6 onClick={() => this.props.onCancel()} class=" d-flex flex-row align-items-center back text-right"><i class="fas fa-user-edit mr-1 mb-1"></i></h6>
                  </div>
                  <div class="row mt-2">
                      <div class="col-md-4"><span>Name</span></div>
                      <div class="col-md-8"><input type="text" name="name" class="form-control" onChange={this.handleChange} value={this.state.name} /></div>
                  </div>
                  <div class="row mt-3">
                      <div class="col-md-4"><span>Phone Number</span></div>
                      <div class="col-md-8"><input type="number" name="number" class="form-control" onChange={this.handleChange} value={this.state.number} /></div>
                  </div>
                  <div class="row mt-3">
                      <div class="col-md-4"><span>Address</span></div>
                      <div class="col-md-8"><input type="text" name="address" class="form-control" onChange={this.handleChange} value={this.state.address}/></div>
                  </div>
                  <div class="row mt-3">
                      <div class="col-md-4"><span>Country</span></div>
                      <div class="col-md-8"><input type="text"  name="country" class="form-control" onChange={this.handleChange}  value={this.state.country} /></div>
                  </div>
                  <div class="row mt-3">
                      <div class="col-md-4"><span>State</span></div>
                      <div class="col-md-8"><input type="text" name="state" class="form-control" onChange={this.handleChange}  value={this.state.state} /></div>
                  </div>
                  <div class="row pull-right">
                    <div class="mt-5 text-right mr-2"><button class="btn btn-primary" type="submit">Save</button></div>{' '}
                    <div class="mt-5 text-right"><button onClick={() => this.props.onCancel()} class="btn btn-secondary" type="button">Cancel</button></div>
                  </div>
              </div>
          </div>
      </div>
     
  </div>
  </form>
    )
  }
}
export default ProfileForm;
