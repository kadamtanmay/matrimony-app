import axios from 'axios';
import { SET_USER, LOGOUT, SET_LOADING, SET_ERROR, UPDATE_USER, SAVE_PREFERENCES, SET_MATCHES } from './actionTypes';

const BASE_URL = 'http://localhost:8080'; // Your backend API URL

// Action creators
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const logout = () => ({
  type: LOGOUT,
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const setMatches = (matches) => ({
  type: SET_MATCHES,
  payload: matches,
});
// Thunk action for login
export const login = (email, password, navigate) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const response = await axios.post(`${BASE_URL}/user/login`, {
      email,
      password,
    });

    if (response.data) {
      const { user, token } = response.data;

      // Store the token in localStorage
      localStorage.setItem('token', token);

      // Store the user in Redux state
      dispatch(setUser(user));

      // Navigate to the dashboard
      navigate('/dashboard');
    } else {
      dispatch(setError('Login failed! Invalid credentials.'));
    }
  } catch (error) {
    dispatch(setError('An error occurred during login.'));
  }
};

// Thunk action for registering a new user
export const register = (userData) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));

  try {
    const response = await axios.post(
      `${BASE_URL}/user/signup`,
      JSON.stringify(userData),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data) {
      window.location.href = '/login';
    } else {
      dispatch(setError('Registration failed! Please try again.'));
    }
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Registration failed due to a server issue.'));
  } finally {
    dispatch(setLoading(false));
  }
};

// Thunk action to update user details
export const updateUser = (userData) => async (dispatch) => {
  dispatch(setLoading(true));
  const userId = userData.id;
  console.log(userId)
  try {
    const token = localStorage.getItem('token');
    console.log(token)
    const response = await axios.put(
      `${BASE_URL}/user/update/${userId}`,
      userData
    );

    if (response.data) {
      dispatch({
        type: UPDATE_USER,
        payload: response.data,
      });
      return response.data;
    } else {
      dispatch(setError('Failed to update user information.'));
    }
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to update user information.'));
  } finally {
    dispatch(setLoading(false));
  }
};

// Save user preferences
export const savePreferences = (userId, preferences) => async (dispatch) => {
  dispatch(setLoading(true));
  console.log(preferences);
  
  try {
    const response = await axios.post(`${BASE_URL}/user/preferences/save/${userId}`, preferences);

    if (response.data) {
      dispatch({
        type: SAVE_PREFERENCES,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch(setError('Failed to save preferences.'));
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch matches
export const fetchMatches = (userId) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const response = await axios.post(`${BASE_URL}/user/matches/find/${userId}`);
    console.log(response.data)
    dispatch(setMatches(response.data));
  } catch (error) {
    dispatch(setError('Error fetching matches. Please try again later.'));
  } finally {
    dispatch(setLoading(false));
  }
};