import { DISPLAY_ALERT } from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_ALERT:
      return { ...state, isLoading: true };

    default:
      throw new Error(`no such action : ${action.type}`);
  }
};

export default reducer;
