import React, { Component } from "react";
import LoginHeader from './loginheader';
import axios from 'axios';

const validEmailRegex = RegExp("^[a-zA-Z0-9]+@[a-zA-Z]+\\.[a-z]+$");
const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      errors: {
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
      case 'email': 
        errors.email = validEmailRegex.test(value) ? '' : 'Email is not valid!';
      break;
      case 'password': 
        errors.password = value.length < 8 ? 'Password must be at least 8 characters long!' : '';
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
      const { email, password} = this.state;
      const  loginData = {
        email,
        password,
      };
      axios
        .post('http://localhost:3001/users/login', loginData)
        .then(res => {
              alert(res.data.message);
              if(res.data.error === false){
                sessionStorage.setItem("username", res.data.payload.name);
                sessionStorage.setItem("email", res.data.payload.email);
                sessionStorage.setItem("role", res.data.payload.role);
                sessionStorage.setItem("id", res.data.payload.id);
                this.props.history.push('/dashboard')
              }
        })
        .catch(err => {
          console.error(err);
        });
    }else{ 
      alert('Invalid Form')
    }
    
  }
  render() {
    const {errors} = this.state;
    return (
      <>
        <LoginHeader/>
        <div className="auth-wrapper">
          <div className="auth-inner">
            {/* login form  */}
            <form onSubmit={this.handleSubmit} >
              <h3>Sign In</h3>
              <div className="form-group">
                <label>Email address</label>
                <input type="email" name='email' className="form-control" placeholder="Enter email" onChange={this.handleChange}  required />
                {errors.email.length > 0 && 
                <span className='error'>{errors.email}</span>}
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" name='password' className="form-control" placeholder="Enter password"  onChange={this.handleChange}  required />
                {errors.password.length > 0 && 
                <span className='error'>{errors.password}</span>}
              </div>
              <button type="submit" className="btn btn-primary btn-block" >Submit</button>
              <p className="new-user text-right">
                New user <a href="./sign-up">register</a>
              </p>
            </form>
          </div>
        </div>
      </>
    );
  }
}

