export enum TasksActionTypes {
  SET_USERS = 'SET_USERS',
  DELETE_USER = 'DELETE_USER',
  SET_SORT = 'SET_SORT',
  SET_SORT_CLEAR = 'SET_SORT_CLEAR',
}

interface SetUsersAction {
  type: TasksActionTypes.SET_USERS;
  payload: Array<object>;
}
interface DeleteUserAction {
  type: TasksActionTypes.DELETE_USER;
  payload: string;
}
interface SetSortAction {
  type: TasksActionTypes.SET_SORT;
  payload: any;
}

interface SetSortClearAction {
  type: TasksActionTypes.SET_SORT_CLEAR;
}

export type TasksAction = SetUsersAction | DeleteUserAction | SetSortAction | SetSortClearAction;
