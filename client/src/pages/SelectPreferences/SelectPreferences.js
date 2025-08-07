import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePreferences } from "../../redux/actions";
import Layout from "../../components/Layout/Layout";

const SelectPreferences = () => {
  const dispatch = useDispatch();

  // Get user details from Redux state
  const user = useSelector((state) => state.user); // Adjust path based on your store structure

  const [preferences, setPreferences] = useState({
    age: "",
    location: "",
    religion: "",
    caste: "",
    education: "",
    profession: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || !user.id) {
      console.error("User ID is missing. Cannot save preferences.");
      return;
    }
    console.log("Preferences Submitted:", preferences);

    // Dispatch action to save preferences with user ID
    dispatch(savePreferences(user.id, preferences));
  };

  return (
    <Layout>
      <div className="container mt-4">
        <h2>Select Your Preferences</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              type="number"
              name="age"
              className="form-control"
              value={preferences.age}
              onChange={handleChange}
              min="18"
              max="100"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Location</label>
            <input
              type="text"
              name="location"
              className="form-control"
              value={preferences.location}
              onChange={handleChange}
              placeholder="Enter preferred location"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Religion</label>
            <select
              name="religion"
              className="form-control"
              value={preferences.religion}
              onChange={handleChange}
            >
              <option value="">Select Religion</option>
              <option value="Hindu">Hindu</option>
              <option value="Muslim">Muslim</option>
              <option value="Christian">Christian</option>
              <option value="Sikh">Sikh</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Caste</label>
            <select
              name="caste"
              className="form-control"
              value={preferences.caste}
              onChange={handleChange}
            >
              <option value="">Select Caste</option>
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Education</label>
            <input
              type="text"
              name="education"
              className="form-control"
              value={preferences.education}
              onChange={handleChange}
              placeholder="Enter education qualification"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Profession</label>
            <select
              name="profession"
              className="form-control"
              value={preferences.profession}
              onChange={handleChange}
            >
              <option value="">Select Profession</option>
              <option value="Engineer">Engineer</option>
              <option value="Doctor">Doctor</option>
              <option value="Teacher">Teacher</option>
              <option value="Artist">Artist</option>
              <option value="Lawyer">Lawyer</option>
              <option value="Entrepreneur">Entrepreneur</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Gender</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="MALE"
                  checked={preferences.gender === "MALE"}
                  onChange={handleChange}
                />{" "}
                MALE
              </label>
              <label className="ms-3">
                <input
                  type="radio"
                  name="gender"
                  value="FEMALE"
                  checked={preferences.gender === "FEMALE"}
                  onChange={handleChange}
                />{" "}
                FEMALE
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Save Preferences
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default SelectPreferences;
