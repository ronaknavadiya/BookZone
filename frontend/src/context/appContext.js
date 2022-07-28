import React, { useReducer, useContext, useEffect, useState } from "react";
import reducer from "./reducer";
import {
  DISPLAY_ALERT,
  CONFIGUIRE_USER,
  LOG_OUT,
  ADD_GENRE,
  UNFOLLLOW_USER,
  FOLLLOW_USER,
  CONFIGUIRE_LATEST_USER,
} from "./actions";
import axios from "axios";

const token = localStorage.getItem("token");
let user = localStorage.getItem("user");
user = JSON.parse(user);
const userLocation = localStorage.getItem("location");

const intialState = {
  isLoading: false,
  token: token,
  user: user || undefined,
  userLocation: userLocation || "",
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState);

  const [latestUser, setLatestUser] = useState({});

  useEffect(() => {
    fetchUser();
  }, []);

  const clearAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
  };

  const addUserToLocalStorage = ({ user, jwtToken, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", jwtToken);
    localStorage.setItem("location", location);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("location");
  };

  const addFavGenreInStorage = (genre) => {
    dispatch({ type: ADD_GENRE, payload: { genre } });
  };
  const setUserIDandToken = (jwtToken, user, location) => {
    // console.log(jwtToken, user);

    dispatch({ type: CONFIGUIRE_USER, payload: { jwtToken, user } });
    addUserToLocalStorage({ user, jwtToken, location });
  };

  const ModifyUser = (user) => {
    dispatch({ type: CONFIGUIRE_LATEST_USER, payload: { user } });
  };

  const logout = () => {
    dispatch({ type: LOG_OUT });
    removeUserFromLocalStorage();
  };

  const followUnfollowUser = (frinedUserId) => {
    if (user?.following?.includes(frinedUserId)) {
      dispatch({ type: UNFOLLLOW_USER, payload: { user, frinedUserId } });
    } else {
      dispatch({ type: FOLLLOW_USER, payload: { user, frinedUserId } });
    }
    console.log("user....", user);
  };

  const fetchUser = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/frienduser",
        {
          userId: user._id,
        }
      );
      console.log("app context user", res.data);
      setLatestUser(res.data);
      ModifyUser(res.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearAlert,
        setUserIDandToken,
        logout,
        addFavGenreInStorage,
        followUnfollowUser,
        latestUser,
        setLatestUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { useAppContext, intialState, AppProvider };
