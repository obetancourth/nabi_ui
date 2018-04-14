import { AnyAction } from 'redux';
import { UserState, IState, Role } from './model';
import { RegistrationActions } from './constants/ActionTypes';

const initialState: UserState[] = [];

export default function usersReducer(state: IState = initialState, action: AnyAction): IState {
  switch (action.type) {
    case RegistrationActions.CREATE_USER:
      return [...state, action.user];
    case RegistrationActions.CHANGE_AVATAR:
      if (state.length === 0) {
        let nuser: UserState = Object.assign(
          {},
          {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            zipCode: '',
            role: Role.instructor,
            hearAboutUs: '',
            avatar: ''},
          {avatar: action.avatar}
        );
        return [...state, nuser];
      }
      let newState = state.map((obj, i) => {
        if (obj.email === action.email) {
          obj.avatar = action.avatar;
        }
        return obj;
      });
      return [...newState];
    default:
      return state;
  }
}
