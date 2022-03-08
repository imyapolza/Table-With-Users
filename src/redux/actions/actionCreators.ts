export const setUsers = (items: Array<object>) => ({
  type: 'SET_USERS',
  payload: items,
});

export const deleteUser = (id: string) => ({
  type: 'DELETE_USER',
  payload: id,
});

export const setSortItems = (type: string, sortOpt: string) => ({
  type: 'SET_SORT',
  payload: { type: type, sortOpt: sortOpt },
});

export const setSortClear = () => ({
  type: 'SET_SORT_CLEAR',
});
