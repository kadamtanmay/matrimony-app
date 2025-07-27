import { SET_USER, LOGOUT, SET_LOADING, SET_ERROR, UPDATE_USER, SAVE_PREFERENCES, SET_MATCHES } from './actionTypes';

const initialState = {
  user: null,
  loading: false,
  error: null,
  preferences: {}, // Add preferences state to store user preferences
  matches: [], // State to store matches data
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case UPDATE_USER:
      return { ...state, user: action.payload }; // Update user after editing profile
    case LOGOUT:
      return { ...state, user: null, preferences: {}, matches: [] }; // Clear preferences and matches on logout
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SAVE_PREFERENCES:
      return { ...state, preferences: action.payload }; // Save preferences to state
    case SET_MATCHES:
      return { ...state, matches: action.payload }; // Set matches data
    default:
      return state;
  }
};

export default userReducer;
