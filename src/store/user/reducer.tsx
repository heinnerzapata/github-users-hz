import { userActionType } from "./types";
import { IAction } from "./actions";
import { IGitHubUser } from "models";

export interface IUserState {
  userInfo: IGitHubUser | null;
}

const initState: IUserState = {
  userInfo: null,
};

const userReducer = (
  state: IUserState = initState,
  action: IAction
): IUserState => {
  switch (action.type) {
    case userActionType.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    default:
      return state;
  }
};

export default userReducer;
