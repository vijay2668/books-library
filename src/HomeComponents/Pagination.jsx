import React from 'react'

const Pagination = ({booksPerPage, totalBooks, paginate}) => {
  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++){
    pageNumbers.push(i);
  }

  return (
    <div className="btn-group absolute right-6 bottom-10">
      {pageNumbers.map(number => (
        <button onClick={() => paginate(number)} key={number} className="btn bg-primary border-warning text-neutral hover:text-base-100 hover:bg-warning">{number}</button>
      ))}
    </div>
  )
}

export default Pagination