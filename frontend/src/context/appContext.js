import React, { useReducer, useContext, useEffect } from "react";
import reducer from "./reducer";
import {
  DISPLAY_ALERT,
  CONFIGUIRE_USER,
  LOG_OUT,
  ADD_GENRE,
  UNFOLLLOW_USER,
  FOLLLOW_USER,
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

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearAlert,
        setUserIDandToken,
        logout,
        addFavGenreInStorage,
        followUnfollowUser,
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
