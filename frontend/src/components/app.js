import React, { Component } from "react";
import { render } from "react-dom";
import Notifications from "./NotificationPage";
import Ebookslist from "./Ebooks";
import Reports from "./ReportPage";
import HomePage from "./HomePage";
import {
  BrowserRouter,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import '../../static/css/index.css';
import PhysicsList from "../pages/Physics";
import SignIn from "../pages/SingIn";
import EbooksList from "./Ebooks";



export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignIn/>} />
        <Route path="*" element={<>
          <div className="navbar">
        <div className="app-logo">Caspian Classroom</div>
        <div className="nav-items">
          <NavLink className="nav-link" to="/" exact>
            Home
          </NavLink>
          <NavLink className="nav-link" to="/notifications">
            Noticeboard
          </NavLink>
          <NavLink className="nav-link" to="/ebooks">
            Ebooks
          </NavLink>
          <NavLink className="nav-link" to="/reportpage">
            Reportpage
          </NavLink>
        </div>


        <div className="profile-logo">Profile</div>

      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/ebooks" element={<EbooksList />} />
        <Route path="/reportpage" element={<Reports />} />
        <Route path="/subject/1" element={<PhysicsList />} />

      </Routes>
        </>} />
      
      </Routes>
    </BrowserRouter>
    
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);