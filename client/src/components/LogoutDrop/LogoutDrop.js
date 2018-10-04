import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logout from "../Logout/Logout";
import "./LogoutDrop.css";

class LogoutDrop extends Component {
  state = {
    isOpen: false
  };

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
    return (
      <div className="dropdown" onClick={this.toggleOpen}>
        <button
          className="btn btn-secondary dropdown-toggle btn-sm"
          type="button"
          id="dropdownMenuButton2"
          data-toggle="dropdown"
          aria-haspopup="true"
        >
          {this.props.name}
        </button>
        <div className={menuClass} aria-labelledby="dropdownMenuButton">
          <div className="dropdown-item" type="editProfile">
            <Link
              to="/editProfile"
              id="editProfile"
              className={
                window.location.pathname === "/editProfile"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Edit profile
            </Link>
          </div>
          <div className="dropdown-item" id="logoutDrop" type="logout">
            <Logout />
          </div>
        </div>
      </div>
    );
  }
}

export default LogoutDrop;
