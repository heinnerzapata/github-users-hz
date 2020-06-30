import { userActionType } from "./types";
import { IGitHubUser } from "models";

export interface ISetUserInfo {
  type: userActionType.SET_USER_INFO;
  userInfo: IGitHubUser | null;
}

export type IAction = ISetUserInfo;

export const setUserInfo = (userInfo: IGitHubUser | null): ISetUserInfo => ({
  type: userActionType.SET_USER_INFO,
  userInfo,
});
