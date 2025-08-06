import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import { updateUser } from '../../redux/actions';
import axios from 'axios';

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user && user.id) {
      setFormData({ ...user });
    }
  }, [user]);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/profile-picture`, { params: { userId: user.id } });
        if (response.data) {
          setImageUrl(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch profile picture");
      }
    };
    fetchProfilePicture();
  }, [user.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", user.id);
    try {
      await axios.post("http://localhost:8080/profile-picture/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImageUrl(URL.createObjectURL(file));
    } catch (error) {
      console.error("Failed to upload image");
    }
  };

  const handleSaveClick = () => {
    dispatch(updateUser(formData));
    setIsEditing(false);
  };

  return (
    <Layout>
      <div className="container d-flex justify-content-center align-items-center mt-0" style={{ minHeight: "100vh", overflowY: "auto" }}>
        <div className="card shadow-lg p-3" style={{ width: '28rem', maxHeight: "80vh", overflowY: "auto" }}>
          <div className="text-center">
            <img
              src={imageUrl || "https://i.pinimg.com/736x/7f/e7/cb/7fe7cb4ed3b692b581957a95f0f9774a.jpg"}
              className="card-img-top rounded-circle mx-auto mt-3"
              alt="Profile"
              style={{ width: '120px', height: '120px', objectFit: 'cover' }}
            />
            <input type="file" onChange={handleFileChange} accept="image/*" className="form-control mt-2 w-75 mx-auto" />
            <button onClick={handleUpload} className="btn btn-primary mt-2">Upload</button>
          </div>
          <div className="card-body text-center">
            <h3 className="card-title mb-3">{user.firstName || "Not available"}</h3>
            <ul className="list-group text-start" style={{ maxHeight: "200px", overflowY: "auto" }}>
              {Object.keys(formData).map((key) => (
                key !== "id" && (
                  <li key={key} className="list-group-item">
                    <strong>{key.replace(/_/g, ' ')}:</strong> {user[key] || "Not available"}
                  </li>
                )
              ))}
            </ul>
            <button className="btn btn-primary mt-3" onClick={() => setIsEditing(true)}>Edit Profile</button>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="modal fade show d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog" style={{ maxHeight: "90vh", overflowY: "auto" }}>
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Edit Profile</h5>
                <button type="button" className="btn-close" onClick={() => setIsEditing(false)}></button>
              </div>
              <div className="modal-body" style={{ maxHeight: "70vh", overflowY: "auto" }}>
                <form>
                  {Object.keys(formData).filter(key => key !== 'id').map((key) => (
                    <div className="mb-3" key={key}>
                      <label className="form-label">{key.replace(/_/g, ' ')}</label>
                      <input
                        type="text"
                        className="form-control"
                        name={key}
                        value={formData[key] || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                  ))}
                </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSaveClick}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Profile;
