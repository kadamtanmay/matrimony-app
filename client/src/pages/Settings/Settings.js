import React, { useState } from 'react';
import { useDarkMode } from '../../components/Context/DarkModeContext';
import Layout from '../../components/Layout/Layout';

const Settings = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState('public');

  const handlePrivacyChange = (e) => {
    setPrivacy(e.target.value);
  };

  return (
    <Layout>
      <div className="container mt-4">
        <h2>Settings</h2>

        <div className="card mt-4 shadow-lg">
          <div className="card-body">
            <h4 className="card-title">Appearance</h4>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="darkModeToggle"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <label className="form-check-label" htmlFor="darkModeToggle">
                Dark Mode
              </label>
            </div>
          </div>
        </div>

        <div className="card mt-4 shadow-lg">
          <div className="card-body">
            <h4 className="card-title">Notifications</h4>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="notificationsToggle"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
              <label className="form-check-label" htmlFor="notificationsToggle">
                Enable Notifications
              </label>
            </div>
          </div>
        </div>

        <div className="card mt-4 shadow-lg">
          <div className="card-body">
            <h4 className="card-title">Privacy Settings</h4>
            <div className="form-group">
              <label htmlFor="privacySelect">Profile Visibility</label>
              <select
                className="form-select mt-2"
                id="privacySelect"
                value={privacy}
                onChange={handlePrivacyChange}
              >
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
