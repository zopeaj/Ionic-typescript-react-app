export interface User {
  id: number;
  name: string;
  username: string;
  profilePic: string;
  age: number;
  email: string;
  phonenumber: number;
  password: string;
}

export interface IUserCreate {
  name: string;
  profilePic: string;
  age: number;
  email: string;
  phonenumber: number;
  password: string;
  gender: string;
}

export interface IUserProfileUpdate {
  profilePic: string;
  username: string;
}

export interface IUserUpdate {
  username: string;
  email: string;
  phonenumber: number;
  password: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface UserLogout {
  username: string;
}
