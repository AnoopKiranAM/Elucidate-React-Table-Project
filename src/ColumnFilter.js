import React from 'react'

function ColumnFilter( {column}) {
    const {filterValue , setFilter} = column
    return (
        <span>
        Search:{''}
        <input style={{
            width: '50%',
            // marginRight: '0.5rem',
          }} value={filterValue || ""} onChange={e=> setFilter(e.target.value)} />
            
        </span>
    )
}

export default ColumnFilter
