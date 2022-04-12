import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  handleLogout = () => {
    localStorage.clear();
    this.props.setUser(null);
  };

  render() {
    let buttons;
    if (localStorage.getItem("token")) {
      buttons = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to={"/myProfile"}>
              Mes scores
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/"} onClick={this.handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      );
    } else {
      buttons = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to={"/login"}>
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/signup"}>
              Sign Up
            </Link>
          </li>
        </ul>
      );
    }
    return (
      <nav className="navbar navbar-expand navbar-light fixed-top">
        <div className="container">
          <ul className="navbar-nav ml-auto">
            {/* <li className="nav-item">
              <Link className="navbar-brand" to={"/"}>
                Home
              </Link>
            </li> */}
            <li className="nav-item">
              <Link className="navbar-brand" to={"/"}>
                Memory
              </Link>
            </li>
          </ul>
          <div className="collapse navbar-collapse">{buttons}</div>
        </div>
      </nav>
    );
  }
}
