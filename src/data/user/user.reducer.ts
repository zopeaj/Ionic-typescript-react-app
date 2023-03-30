import { UserActions } from './user.actions';
import { UserState } from './user.state';

export function userReducer(state: UserState, action: UserActions): UserState {
  switch (action.type) {
    case 'set-user-loading':
      return { ...state, loading: action.isLoading };
    case 'set-user-created-data':
      return { ...state, ...action.data };
    case 'set-user-created-data':
      return { ...state, ...action.data };
    case 'set-user-created-data-error':
      return { ...state, ...action.data};
    case 'set-user-updated-data':
      return {  ...state, ...action.data };
    case 'set-user-updated-data-error':
      return { ...state, ...action.data };
    case 'set-users-data':
      return { ...state, ...action.data };
  }
}
