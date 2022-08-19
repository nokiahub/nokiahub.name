import * as React from 'react';
import { Link } from 'gatsby';
import * as style from './index.module.css';

const Pagination = ({ totalPages, currentPage }) => {
  const items = Array.from(Array(totalPages).keys());

  return (
    <ul className={style.list}>
      {items.map((_, index) => (
        <Link className={`${style.item} ${index+1 === currentPage && style.current}`}
        key={index} to={index === 0 ? '/' : `/${index + 1}`}>
          {index + 1}
        </Link>
      ))}
    </ul>
  );
};

export default Pagination;
