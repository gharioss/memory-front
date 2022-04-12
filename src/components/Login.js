import axios from "axios";
import React, { Component } from "react";
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
      email: this.email,
      password: this.password,
    };

    axios
      .post("login.php", data, { withCredentials: true })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        this.setState({
          redirect: true,
        });
        axios
          .post("user.php", localStorage.getItem("token"), {
            withCredentials: true,
          })
          .then((res) => {
            this.props.setUser(res.data);
          })
          .catch((err) => {
            console.log(err);
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
          <h3>Login</h3>
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
          <button className="btn btn-primary btn-block">Login</button>
        </form>
      </div>
    );
  }
}
