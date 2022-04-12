import React, { Component } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      password: this.password,
    };
    axios
      .post("register.php", JSON.stringify(data))
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        this.setState({
          redirect: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Navigate to="/" />;
    }
    return (
      <div className="auth-inner">
        <form onSubmit={this.handleSubmit}>
          <h3>Sign Up</h3>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              onChange={(e) => (this.firstName = e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              onChange={(e) => (this.lastName = e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              onChange={(e) => (this.email = e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => (this.password = e.target.value)}
            />
          </div>
          <button className="btn btn-primary btn-block">Sign Up</button>
        </form>
      </div>
    );
  }
}
