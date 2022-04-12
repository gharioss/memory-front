import React, { Component } from "react";

export default class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.user) {
      return (
        <div className="auth-inner">
          <h2>
            Hi {this.props.user.first_name} {this.props.user.last_name}
          </h2>
        </div>
      );
    }
    return (
      <div className="auth-inner">
        <h2>Vous n'êtes pas connecté.</h2>
      </div>
    );
  }
}
