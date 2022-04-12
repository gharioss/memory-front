import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Component } from "react";
import axios from "axios";
import Cards from "./game/Cards";
import MyProfile from "./components/MyProfile";

export default class App extends Component {
  state = {};

  componentDidMount() {
    axios
      .post("user.php", localStorage.getItem("token"))
      .then((res) => {
        this.setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setUser = (user) => {
    this.setState({
      user: user,
    });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar user={this.state.user} setUser={this.setUser} />
          <div className="auth-wrapper">
            {/* <div className="auth-inner"> */}
            <Routes>
              {/* <Route exact path="/" element={<Home user={this.state.user} />} /> */}
              <Route
                exact
                path="/login"
                element={<Login setUser={this.setUser} />}
              />
              <Route
                exact
                path="/signup"
                element={<Signup setUser={this.setUser} />}
              />
              <Route exact path="/" element={<Cards />} />
              <Route exact path="/myProfile" element={<MyProfile />} />
            </Routes>
          </div>
          {/* </div> */}
        </div>
      </BrowserRouter>
    );
  }
}
