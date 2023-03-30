import { combineReducers } from "./combineReducers";
import { userReducer } from "./user/user.reducer";


export const initialState: AppState = {
  data: {
    loading: false,
    users: [],
    user: {
      isLoggedin: false,
      loading: false,
      isAdmin: false,
      id: null,
      name: '',
      profilePic: '',
      age: null,
      email: '',
      phonenumber: null,
    }
  }
};

export const reducers = combineReducers({
  user: userReducer,
});

export type AppState = ReturnType<typeof reducers>;
