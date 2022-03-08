import { TasksAction, TasksActionTypes } from './types/users';

interface Item {
  id: string;
  username: string;
  email: string;
  registration_date: string;
  rating: number;
}

const initalState = {
  items: [],
};

const users = (state = initalState, action: TasksAction) => {
  switch (action.type) {
    case TasksActionTypes.SET_USERS:
      return {
        ...state,
        items: action.payload,
      };

    case TasksActionTypes.DELETE_USER:
      const newItems = state.items.filter((item: Item) => {
        return item.id !== action.payload;
      });

      return {
        ...state,
        items: newItems,
      };

    case TasksActionTypes.SET_SORT:
      if (action.payload.type === 'rating') {
        const users = state.items.slice();
        const sortedUsers = users.sort((a: Item, b: Item) => a.rating - b.rating);

        if (action.payload.sortOpt === 'desc') {
          sortedUsers.reverse();
        }

        return {
          ...state,
          items: sortedUsers,
        };
      } else if (action.payload.type === 'date') {
        const users = state.items.slice();
        const sortedUsers = users.sort(
          (a: Item, b: Item) =>
            new Date(a.registration_date.slice(0, -14)).getTime() -
            new Date(b.registration_date.slice(0, -14)).getTime(),
        );

        if (action.payload.sortOpt === 'desc') {
          sortedUsers.reverse();
        }

        return {
          ...state,
          items: sortedUsers,
        };
      }
      return state;

    case TasksActionTypes.SET_SORT_CLEAR:
      const users = state.items.slice();
      const sortedUsers = users.sort((a: Item, b: Item) => Number(a.id) - Number(b.id));

      return {
        ...state,
        items: sortedUsers,
      };
    default:
      return state;
  }
};

export default users;
