import { DISPLAY_ALERT, CONFIGUIRE_USER } from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_ALERT:
      return { ...state, isLoading: true };
    case CONFIGUIRE_USER:
      return {
        ...state,
        userToken: action.payload.jwtToken,
        userId: action.payload.user._id,
        user: action.payload.user,
      };

    default:
      throw new Error(`no such action : ${action.type}`);
  }
};

export default reducer;
