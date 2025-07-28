import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Sidebar.css";

const Sidebar = () => {
  const [messageCount, setMessageCount] = useState(0);
  const user = useSelector((state) => state.user); // Getting user data from Redux store

  // Fetch unread messages from backend when the component mounts or user changes
  useEffect(() => {
    const fetchUnreadMessages = async () => {
      if (!user || !user.id) return; // Check if user exists and has an ID

      try {
        const response = await axios.get(
          `http://localhost:8080/messages/unreadCount/${user.id}` // API endpoint to get unread messages count
        );
        console.log(response.data)
        setMessageCount(response.data); // Set unread message count
      } catch (error) {
        console.error("Error fetching unread messages:", error);
        setMessageCount(0); // Default to 0 if error occurs
      }
    };

    fetchUnreadMessages();
  }, [user]); // Run the effect when the user state changes

  return (
    <div className="sidebar d-flex flex-column bg-dark text-light p-4 shadow">
      <h3 className="text-center text-white mb-4">💍 Matrimony</h3>
      <ul className="list-unstyled">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center ${isActive ? "active" : ""}`
            }
          >
            <i className="fa fa-home me-3 sidebar-icon"></i> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/matches"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center ${isActive ? "active" : ""}`
            }
          >
            <i className="fa fa-heart me-3 sidebar-icon text-danger"></i> Matches
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/message"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center position-relative ${isActive ? "active" : ""}`
            }
          >
            <i className="fa fa-envelope me-3 sidebar-icon text-info"></i> Messages
            {messageCount > 0 && (
              <span className="badge rounded-circle bg-danger text-white position-absolute top-0 start-100 translate-middle">
                {messageCount}
              </span>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center ${isActive ? "active" : ""}`
            }
          >
            <i className="fa fa-user me-3 sidebar-icon text-primary"></i> Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center ${isActive ? "active" : ""}`
            }
          >
            <i className="fa fa-cog me-3 sidebar-icon text-success"></i> Settings
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/SelectPreferences"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center ${isActive ? "active" : ""}`
            }
          >
            <i className="fa fa-list me-3 sidebar-icon text-warning"></i> Select Preferences
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/subscription"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center ${isActive ? "active" : ""}`
            }
          >
            <i className="fa fa-list me-3 sidebar-icon text-warning"></i> Subscription
          </NavLink>
        </li>
        <li className="mt-4">
          <NavLink
            to="/login"
            className="nav-link text-danger d-flex align-items-center"
          >
            <i className="fa fa-sign-out me-3 sidebar-icon"></i> Logout
          </NavLink>
        </li>
        
      </ul>
    </div>
  );
};

export default Sidebar;
