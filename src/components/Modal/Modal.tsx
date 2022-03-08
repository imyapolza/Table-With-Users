import React from 'react';
import { deleteUser } from '../../redux/actions/actionCreators';
import { useDispatch } from 'react-redux';
import './css/Modal.min.css';

interface Item {
  id: string;
  username: string;
  email: string;
  registration_date: string;
  rating: number;
}

interface ModalProps {
  setModal: (bool: boolean) => void;
  user: Item;
}

export const Modal: React.FC<ModalProps> = ({ setModal, user }: ModalProps): React.ReactElement => {
  const dispatch = useDispatch();

  function handleItemsNo() {
    setModal(false);
  }

  function handleItemsYes() {
    dispatch(deleteUser(user.id));
    setModal(false);
  }
  return (
    <div className="modal__wrapper">
      <div className="modal">
        <p className="modal__text">Вы уверены, что хотите удалить пользователя?</p>
        <div className="modal__buttons">
          <button onClick={handleItemsYes} className="modal__yes">
            Да
          </button>
          <button onClick={handleItemsNo} className="modal__no">
            Нет
          </button>
        </div>
      </div>
    </div>
  );
};
