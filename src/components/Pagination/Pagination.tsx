import React from 'react';
import './css/Pagination.min.css';

interface PaginationProps {
  usersPerPage: number;
  totalUsers: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
  valueInput: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  usersPerPage,
  totalUsers,
  paginate,
  currentPage,
  valueInput,
}: PaginationProps): React.ReactElement => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.floor(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="page__buttons">
      {pageNumbers.map((number, index) => {
        return (
          <button
            key={index}
            className={currentPage === number ? 'page__link page__active' : 'page__link'}
            onClick={() => paginate(number)}
            disabled={valueInput === '' ? false : true}>
            {number}
          </button>
        );
      })}
    </div>
  );
};
