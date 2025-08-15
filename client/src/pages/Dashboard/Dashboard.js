import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { fetchMatches } from '../../redux/actions';

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const matches = useSelector((state) => state.matches);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMatches, setFilteredMatches] = useState(matches || []);
  const [filters, setFilters] = useState({
    age: '',
    caste: '',
    religion: '',
    profession: '',
  });

  const [profileImages, setProfileImages] = useState({});

  useEffect(() => {
    if (user) {
      dispatch(fetchMatches(user.id)); // Fetch matches for the logged-in user
    }
  }, [user, dispatch]);

  useEffect(() => {
    setFilteredMatches(matches);
  }, [matches]);

  useEffect(() => {
    const fetchProfileImages = async () => {
      const newProfileImages = {};
      for (const match of matches) {
        try {
          const response = await axios.get('http://localhost:8080/profile-picture', { params: { userId: match.id } });
          newProfileImages[match.id] = response.data;
        } catch (error) {
          console.error("Error fetching profile image", error);
          newProfileImages[match.id] = 'https://media.istockphoto.com/id/1681388313/vector/cute-baby-panda-cartoon-on-white-background.jpg?s=612x612&w=0&k=20&c=qFrzn8TqONiSfwevvkYhys1z80NAmDfw3o-HRdwX0d8='; // Default image
        }
      }
      setProfileImages(newProfileImages);
    };

    if (matches.length > 0) {
      fetchProfileImages();
    }
  }, [matches]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    filterMatches(event.target.value, filters);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    filterMatches(searchTerm, updatedFilters);
  };

  const filterMatches = (search, appliedFilters) => {
    let results = matches;

    if (search) {
      results = results.filter((match) =>
        match.firstName.toLowerCase().includes(search.toLowerCase()) 
      );
    }

    Object.keys(appliedFilters).forEach((key) => {
      if (appliedFilters[key]) {
        results = results.filter((match) =>
          match[key].toLowerCase().includes(appliedFilters[key].toLowerCase())
        );
      }
    });

    setFilteredMatches(results);
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  const stats = [
    { label: 'Total Matches', value: 123 },
    { label: 'New Messages', value: 34 },
    { label: 'Pending Requests', value: 8 },
    { label: 'Profile Views', value: 567 },
  ];

  const actions = [
    { label: 'View Matches', icon: 'fa-heart', color: 'text-danger', path: '/matches' },
    { label: 'Messages', icon: 'fa-envelope', color: 'text-primary', path: '/message' },
    { label: 'Settings', icon: 'fa-cog', color: 'text-success', path: '/settings' },
    { label: 'Profile', icon: 'fa-user', color: 'text-warning', path: '/profile' },
  ];

  const notifications = [
    { message: 'You have a new match request!', time: '5 mins ago' },
    { message: 'Anushka viewed your profile', time: '30 mins ago' },
    { message: 'Your profile was updated successfully', time: '1 hour ago' },
  ];

  const profileCompletion = 85;

  const handleViewProfile = (match) => {
    navigate(`/view-profile/${match.name}`, { state: { match } });
  };

  // Limit matches to the top 3
  const topMatches = filteredMatches.slice(0, 3);

  return (
    <Layout>
      <div className="container-fluid p-4">
        <h1>Welcome, {user.firstName}</h1>
        <p>{user.bio}</p>

        <div className="mt-4">
          <h4>Profile Completion</h4>
          <div className="progress" style={{ height: '25px' }}>
            <div className="progress-bar bg-success" style={{ width: `${profileCompletion}%` }}>
              {profileCompletion}%
            </div>
          </div>
        </div>

        <div className="row g-4 mt-5">
          {stats.map((stat, index) => (
            <div className="col-lg-3 col-md-6 col-sm-12" key={index}>
              <div className="card shadow-lg border-0 h-100">
                <div className="card-body text-center">
                  <h3 className="mb-2">{stat.value}</h3>
                  <p className="text-muted">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4 mt-5 justify-content-center">
          {actions.map((action, index) => (
            <div className="col-md-3 col-sm-6" key={index}>
              <Link to={action.path} className="text-decoration-none">
                <div className="card text-center shadow-lg border-0 h-100">
                  <div className={`card-body ${action.color}`}>
                    <i className={`fa ${action.icon} fa-3x mb-3`} />
                    <h5>{action.label}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <h4>Recent Notifications</h4>
          <ul className="list-group">
            {notifications.map((notification, index) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                {notification.message}
                <span className="badge bg-primary rounded-pill">{notification.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5">
          <h4>Top Matches</h4>
          <div className="row g-4">
            {loading ? (
              <p>Loading matches...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : topMatches.length > 0 ? (
              topMatches.map((match, index) => (
                <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
                  <div className="card shadow-lg border-0 h-100">
                    <div className="card-body text-center">
                      <img
                        src={profileImages[match.id] || 'https://media.istockphoto.com/id/1681388313/vector/cute-baby-panda-cartoon-on-white-background.jpg?s=612x612&w=0&k=20&c=qFrzn8TqONiSfwevvkYhys1z80NAmDfw3o-HRdwX0d8='}
                        className="card-img-top rounded-circle mx-auto mb-3"
                        alt={match.firstName}
                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                      />
                      <h3 className="card-title mb-2">{match.firstName}</h3>
                      <p className="text-muted">Profession: {match.profession}</p>
                      <p className="text-muted">Marital Status: {match.maritalStatus}</p>
                      <p className="text-muted">Date of Birth: {match.dateOfBirth}</p>
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/view-profile/${match.firstName}`, { state: { match } })}
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No matches found.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
