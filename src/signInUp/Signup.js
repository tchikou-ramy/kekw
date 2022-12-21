import React, { Component } from "react";
import LoginHeader from './loginheader';
import axios from 'axios';

const validEmailRegex = RegExp("^[a-zA-Z0-9]+@[a-zA-Z]+\\.[a-z]+$");
const ValidNameRegex =RegExp( /^[A-Za-z ]+$/);
const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

export default class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      password: null,
      errors: {
        name: '',
        email: '',
        password: '',
      }
    };
  }
  handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    let errors = this.state.errors;
    
    switch (name) {
      case 'name': 
        errors.name = ValidNameRegex.test(value) ? '': 'Name should be in letter';
      break;
      case 'email': 
        errors.email = validEmailRegex.test(value) ? '' : 'Email is not valid!';
      break;
      case 'password': 
        errors.password =  value.length < 8 ? 'Password must be at least 8 characters long!' : '';
      break;
      default:
      break;
    }
    this.setState({
      errors: errors, 
      [name]: value
    });
  }
  

  handleSubmit = (event) => {
    event.preventDefault();
    if(validateForm(this.state.errors)) {
      const {name, email, password} = this.state;
      const  signupdata = {
        name,
        email,
        password,
      };
      axios
        .post('http://localhost:3001/users/signup', signupdata)
        .then(res => {
          alert(res.data.message);
        })
        .catch(err => {
          console.error(err);
        });
      this.props.history.push('/sign-in')
    }else{
      alert('Invalid Form');
    }
  };

  render() {
    
    const {errors} = this.state;
    return (
      <>
        
        <LoginHeader/>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form onSubmit={this.handleSubmit}>
              <h3>Sign Up</h3>
              <div className="form-group">
                <label htmlFor="Name">Full Name</label>
                <input type='text' name='name'className="form-control" placeholder="Enter Name"  onChange={this.handleChange}  required  />
                {errors.name.length > 0 && 
                <span className='error'>{errors.name}</span>}
              </div>
              <div className="form-group">
                <label>Email address</label>
                <input type="email" name='email' className="form-control"  placeholder="Enter email"  onChange={this.handleChange}  required />
                {errors.email.length > 0 && 
                <span className='error'>{errors.email}</span>}
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" name='password' className="form-control"  placeholder="Enter password" onChange={this.handleChange} required/>
                {errors.password.length > 0 && 
                <span className='error'>{errors.password}</span>}
              </div>
              <button type="submit" className="btn btn-primary btn-block" >Sign Up</button>
              <p className="new-user text-right">
                Already registered <a href="./">sign in</a>
              </p>
            </form>
          </div>
        </div>
      </>
    );
  }
}
