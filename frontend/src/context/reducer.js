import axios from "axios";
import { useEffect } from "react";
import {
  DISPLAY_ALERT,
  CONFIGUIRE_USER,
  LOG_OUT,
  ADD_GENRE,
  UNFOLLLOW_USER,
  FOLLLOW_USER,
} from "./actions";



const reducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_ALERT: {
      return { ...state, isLoading: true };
    }
    case CONFIGUIRE_USER: {
      return {
        ...state,
        userToken: action.payload.jwtToken,
        userId: action.payload.user._id,
        user: action.payload.user,
      };
    }
    case LOG_OUT: {
      return {
        ...state,
        user: null,
        userId: null,
        userToken: null,
      };
    }
    case ADD_GENRE: {
      const newUser = { ...state.user, genre: action.payload.genre };
      console.log("my state:", newUser);
      return {
        ...state,
        user: newUser,
      };
    }

    case UNFOLLLOW_USER: {
      const { user, frinedUserId } = action.payload;
      const newfollowing = state.user.following.filter(
        (uId) => uId !== frinedUserId
      );
      const newUser = { ...state, following: newfollowing };

      return {
        ...state,
        user: newUser,
      };
    }

    case FOLLLOW_USER: {
      const { user, frinedUserId } = action.payload;
      state.user.following.push(frinedUserId);

      return {
        ...state,
      };
    }

    default:
      throw new Error(`no such action : ${action.type}`);
  }
};

export default reducer;
