import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import '../../static/css/index.css';
import Notifications from "./NotificationPage";
import Reports from "./ReportPage";
import HomePage from "./HomePage";
import PhysicsList from "../pages/Physics";
import BookResources from "./Ebooks";
import LoginForm from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import { isLoggedIn, logout } from "../pages/auth";
import handleLogout from "../pages/Login";
import RegisterForm from "../pages/Register";
import Profile from "../components/Profile";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <BrowserRouter>
        {user && (
          <div className="navbar">
            <div className="app-logo">Caspian Classroom</div>
            <div className="nav-items">
              <NavLink className="nav-link" to="/" exact>
                Home
              </NavLink>
              <NavLink className="nav-link" to="/notifications">
                Noticeboard
              </NavLink>
              <NavLink className="nav-link" to="/bookresources">
                E-Books
              </NavLink>
              <NavLink className="nav-link" to="/reportpage">
                Report Page
              </NavLink>
              {user.user_type === "1" && <NavLink className="nav-link" to="/register">Register User</NavLink>}
            </div>
            <div>
              {isLoggedIn() ? (
                <NavLink className="nav-link" to="/profile">
                My Profile
              </NavLink>
              ) : (
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              )}
            </div>
          </div>
        )}
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
          <Route path="/notifications" element={<ProtectedRoute element={<Notifications />} />} />
          <Route path="/bookresources" element={<ProtectedRoute element={<BookResources />} />} />
          <Route path="/reportpage" element={<ProtectedRoute element={<Reports />} />} />
          <Route path="/subject" element={<ProtectedRoute element={<PhysicsList />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
