import { Action } from 'redux';
import { RegistrationActions } from './constants/ActionTypes';
import { UserState } from './model';

interface CreateUser extends Action {
  user: UserState;
}

interface ChangeAvatar extends Action {
  email: string;
  avatar: string;
}
// Create user
export function createUser(user: UserState): CreateUser {
  return {
    user,
    type: RegistrationActions.CREATE_USER
  };
}

export function changeAvatar(email: string, avatar: string): ChangeAvatar {
  return {
            email: email,
            avatar: avatar ,
            type: RegistrationActions.CHANGE_AVATAR
          };
}
