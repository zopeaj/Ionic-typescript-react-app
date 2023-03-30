export interface UserState {
  isLoggedIn: boolean;
  username?: string;
  id: number;
  name: string;
  profilePic: string;
  age: number;
  email: string;
  phonenumber: number;
  isAdmin: boolean;
  loading: boolean;
}
