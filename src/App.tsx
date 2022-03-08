import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TableRow } from './components/TableRow';

import './sass/css/styles.min.css';
import clean from './icons/clean.png';
import { setSortClear, setSortItems, setUsers } from './redux/actions/actionCreators';
import { Pagination } from './components/Pagination/Pagination';

interface Item {
  id: string;
  username: string;
  email: string;
  registration_date: string;
  rating: number;
}

function App(): React.ReactElement {
  const dispatch = useDispatch();
  const axios = require('axios').default;

  React.useEffect(() => {
    axios
      .get('https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users')
      .then(function (resp: { data: Array<Item> }) {
        dispatch(setUsers(resp.data));
      })
      .catch(function (error: Error) {
        console.log(error);
      });
  }, []);

  const items = useSelector(({ users }: any) => users.items);

  const [value, setValue] = useState('');
  const [sortedUsers, setSortedUsers] = useState([]);

  const [sort, setSort] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  const lastUserIndex = currentPage * usersPerPage;
  const firstUserIndex = lastUserIndex - usersPerPage;
  const currentUser: Array<Item> = items.slice(firstUserIndex, lastUserIndex);

  const [sortDate, setSortDate] = useState('');
  const [sortRating, setSortRating] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);

    const newItems: any = currentUser.filter((item, index) => {
      return (
        item.username.toLowerCase().includes(e.target.value) ||
        item.username.includes(e.target.value) ||
        item.email.toLowerCase().includes(e.target.value) ||
        item.email.includes(e.target.value)
      );
    });

    if (e.target.value === '') {
      setSortedUsers([]);
    } else {
      setSortedUsers(newItems);
    }
  }

  function handleFilter() {
    setSort('');
    setValue('');
    dispatch(setSortClear());
  }

  function handleSortRating() {
    if (sortRating === '') {
      setSortRating('desc');
      dispatch(setSortItems('rating', 'desc'));
    }
    if (sortRating === 'desc') {
      setSortRating('asc');
      dispatch(setSortItems('rating', 'asc'));
    }
    if (sortRating === 'asc') {
      dispatch(setSortItems('rating', ''));
      setSortRating('');
    }

    setSort('rating');
  }

  function handleSortDate() {
    if (sortDate === '') {
      setSortDate('desc');
      dispatch(setSortItems('date', 'desc'));
    }
    if (sortDate === 'desc') {
      setSortDate('asc');
      dispatch(setSortItems('date', 'asc'));
    }
    if (sortDate === 'asc') {
      dispatch(setSortItems('date', ''));
      setSortDate('');
    }

    setSort('date');
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <div className="wrapper">
      <header>
        <h1 className="header__topic">Список пользователей</h1>
      </header>
      <section className="main">
        <div className="main__search">
          <input
            onChange={handleChange}
            value={value}
            className="main__input"
            type="text"
            placeholder="Поиск по имени или e-mail"
          />

          {value !== '' || sort !== null ? (
            <div className="main__cleare">
              <img src={clean} alt="clean" />
              <button onClick={handleFilter} className="main__cleareBtn">
                Очистить фильтр
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="main__sortOptions">
          <span className="main__sort">Сортировка:</span>
          <button
            onClick={handleSortDate}
            className={
              sort === 'date'
                ? 'main__listItem main__listItem__1 main__active'
                : 'main__listItem main__listItem__1 '
            }>
            Дата регистрации
          </button>
          <button
            onClick={handleSortRating}
            className={
              sort === 'rating'
                ? 'main__listItem main__listItem__1 main__active'
                : 'main__listItem main__listItem__1 '
            }>
            Рейтинг
          </button>
        </div>

        <div className="main__users">
          <table>
            <thead>
              <tr>
                <th>Имя пользователя</th>
                <th>E-mail</th>
                <th>Дата регистрации</th>
                <th>Рейтинг</th>
              </tr>
            </thead>
            <tbody>
              {value.length > 0
                ? sortedUsers.map((user, index) => <TableRow user={user} key={index}></TableRow>)
                : currentUser.map((user, index) => <TableRow user={user} key={index}></TableRow>)}
            </tbody>
          </table>
        </div>
        <Pagination
          valueInput={value}
          paginate={paginate}
          usersPerPage={5}
          totalUsers={25}
          currentPage={currentPage}
        />
      </section>
    </div>
  );
}

export default App;
