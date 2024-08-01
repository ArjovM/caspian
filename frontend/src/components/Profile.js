import React, { Component } from "react";
import { logout } from "../pages/auth";


export default class Profile extends Component {
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

    if (!user) {
      return <div className="profile-container">User not found</div>;
    }

    return (
      <div className="profile-container">
        <div className="profile-card">
          <img
            src={user.profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
            className="profile-picture"
          />
          <h1 className="profile-name">{user.first_name} {user.last_name}</h1>
          <h2 className="profile-role">
            {user.user_type === "2" ? "Teacher" : "Student"}
          </h2>
          <h3 className="profile-username">Username: {user.username}</h3>
          <p className="profile-email">Email: {user.email}</p>
          <button class="add-button" onClick={logout}>Logout</button>
        </div>
      </div>
    );
  }
}
