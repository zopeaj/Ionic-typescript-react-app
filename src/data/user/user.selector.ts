import { createSelector } from 'reselect';
import { User } from "../../models/User";
import { AppState } from "../state";

const getUsers = (state: AppState) => {
  return state.data.users;
};

const getUserIdParam = (_state: AppState, props: any) => {
  return props.match.params['id'];
}

const getUser = createSelector(getUsers, getUserIdParam, (users: User[], id: number) => {
  return users.find((u: User) => u.id === id);
});

const getCurrentUserData = (state: AppState) => {
  return state.data.user;
}

export const getCurrentUsername = createSelector(getCurrentUserData, (user: User) => {
  return user.username;
});

export const getCurrentEmail = createSelector(getCurrentUserData, (user: User) => {
  return user.email;
});

export const getCurrentId = createSelector(getCurrentUserData, (user: User) => {
  return user.id;
});

export const getCurrentPhoneNumber = createSelector(getCurrentUserData, (user: User) => {
  return user.phonenumber;
});

export const getCurrentPassword = createSelector(getCurrentUserData, (user: User) => {
  return user.password;
})

const userRegistrationError = (state: AppState) => {
  return state.data.registrationError;
}

export const getUserRegistrationError = createSelector(userRegistrationError, (error: any) => {
  return error;
});

const userLoginError = (state: AppState) => {
  return state.data.loginError;
}

export const getUserLoginError = createSelector(
  userLoginError, (error: any) => {
    return error;
});
