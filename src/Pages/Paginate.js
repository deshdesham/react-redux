import React from 'react'
import ReactPaginate from 'react-paginate';

const Paginate = ({handlePageChange,pageCount}) => {
  return (
    <ReactPaginate 
            previousLabel={'Previous'}
            previousClassName={'mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105'}
            nextLabel={'Next'}
            nextClassName='mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105'
            breakLabel={'...'}
            breakClassName='mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105'
            className='flex justify-center '
            pageCount={pageCount}
            pageClassName='mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105'
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={handlePageChange}
            activeClassName={'active'}
          />
  )
}

export default Paginate;