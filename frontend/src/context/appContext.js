import React, { useReducer, useContext } from "react";
import reducer from "./reducer";
import { DISPLAY_ALERT, CONFIGUIRE_USER, LOG_OUT } from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
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

  const setUserIDandToken = (jwtToken, user, location) => {
    // console.log(jwtToken, user);

    dispatch({ type: CONFIGUIRE_USER, payload: { jwtToken, user } });
    addUserToLocalStorage({ user, jwtToken, location });
  };

  const logout = () => {
    dispatch({ type: LOG_OUT });
    removeUserFromLocalStorage();
  };

  return (
    <AppContext.Provider
      value={{ ...state, clearAlert, setUserIDandToken, logout }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { useAppContext, intialState, AppProvider };
