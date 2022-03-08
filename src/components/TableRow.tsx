import React from 'react';
import cancel from '../icons/cancel.png';
import { Modal } from './Modal/Modal';

interface Item {
  id: string;
  username: string;
  email: string;
  registration_date: string;
  rating: number;
}

interface TableRowProps {
  user: Item;
}

export const TableRow: React.FC<TableRowProps> = ({ user }: TableRowProps): React.ReactElement => {
  const [modal, setModal] = React.useState(false);

  function handleItems() {
    setModal(true);
  }

  return (
    <>
      <tr>
        <td className="main__selection">{user.username}</td>
        <td>{user.email}</td>
        <td>{user.registration_date}</td>
        <td>{user.rating}</td>
        <td>
          <button onClick={handleItems} className="main__cancel">
            <img src={cancel} alt="cancel" />
          </button>
        </td>
        <td>{modal && <Modal user={user} setModal={setModal} />}</td>
      </tr>
    </>
  );
};
