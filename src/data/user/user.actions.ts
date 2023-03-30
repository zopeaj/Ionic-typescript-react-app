import React from "react";
import { createUserData, updateUserData, deleteUserData, getUserDatas, logoutUser, loginUser } from "./api/userApi";
import { ActionType } from '../../util/types';
import { UserState } from './user.state';
import { IUserCreate, IUserUpdate, UserLogin, UserLogout } from "../../models/User";

export const loadUsersData = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true));
  const data = await getUserDatas();
  dispatch(setUsersData(data));
  dispatch(setLoading(false));
}

export const createUser = (data: IUserCreate) => async(dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true));
  const userCreateddata = await createUserData(data);
  if(userCreateddata.result !== null) {
    dispatch(setUserCreatedData(userCreateddata.result));
    dispatch(setLoading(false));
  }
  dispatch(setUserCreatedDataError(userCreateddata.error));
  dispatch(setLoading(false));
}


export const updateUser = (data: IUserUpdate, id: number) => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true));
  const userUpdatedata = await updateUserData(data, id);
  if(userUpdatedata.result !== null) {
    dispatch(setUserUpdatedData(userUpdatedata.result));
    dispatch(setLoading(false));
  }
  dispatch(setUserCreatedDataError(userUpdatedata.error));
  dispatch(setLoading(false));
}


export const logUserOut = (data: UserLogout) => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true));
  const userLogoutdata = await logoutUser(data);
  if(userLogoutdata.result !== null) {
    dispatch(setUserLogoutData(userLogoutdata.result));
    dispatch(setLoading(false));
  }
}


export const logUserIn = (data: UserLogin) => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true));
  const userLogindata = await loginUser(data);
  if(userLogindata.result !== null){
    dispatch(setUserLoginData(userLogindata.result));
    dispatch(setLoading(false));
  }
  dispatch(setUserLoginDataError(userLogindata.error));
  dispatch(setLoading(false));
}


export const setLoading = (isLoading: boolean) => ({
  type: 'set-user-loading',
  isLoading
} as const);


export const setUserCreatedData = (data: Partial<UserState>) => ({
  type: 'set-user-created-data',
  data
} as const);

export const setUserCreatedDataError = (data: any) => ({
  type: 'set-user-created-data-error',
  data
} as const);

export const setUserUpdatedData = (data: Partial<UserState>) => ({
  type: 'set-user-updated-data',
  data
} as const);


export const setUserUpdatedDataError = (data: any) => ({
  type: 'set-user-updated-data-error',
  data
} as const);

export const setUsersData = (data: Partial<UserState[]>) => ({
  type: 'set-users-data',
  data
} as const);

export const setUserLogoutData = (data: Partial<UserState>) => ({
  type: 'set-user-logout',
  data,
} as const);

export const setUserLoginData = (data: Partial<UserState>) => ({
  type: 'set-user-login',
  data,
} as const);

export const setUserLoginDataError = (data: Partial<UserState>) => ({
  type: 'set-user-login-error',
  data,
} as const);

export type UserActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setUserCreatedData>
  | ActionType<typeof setUserCreatedDataError>
  | ActionType<typeof setUserUpdatedData>
  | ActionType<typeof setUserUpdatedDataError>
  | ActionType<typeof setUsersData>
