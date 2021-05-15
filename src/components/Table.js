import React from 'react';
import '../styles/Table.scss';

// countries arg from app api as prop-drilling
function Table({ countries }) {
  return (
    <div className="table">
      {
        countries.map(country => (
          <tr>
            <td></td>
            <td></td>
          </tr>
        ))
      }
    </div>
  )
}

export default Table
