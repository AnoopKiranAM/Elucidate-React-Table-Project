import React, {useMemo} from 'react'
// import { useState, useEffect } from 'react';
import { useTable,useSortBy, useGlobalFilter,useFilters,usePagination , useBlockLayout} from 'react-table'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import {COLUMNS} from "./columns";
import "./table.css"
import GlobalFilter from "./GlobalFilter"
import reportsData from "./reports.json";
import ColumnFilter from './ColumnFilter';
import {Checkbox} from "./Checkbox.js"
// import {useSticky} from 'react-table-sticky';


function TableCode() {

    // const [data , setData] = useState([]);
    // useEffect(() => {
    //     fetch("./reports.json")
    //     .then(function(res){return res.json()})
    //     .then(function(data){setData(data)})
    //     .catch(function(err){console.log(err, ' error')})
    //   });


    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => reportsData, [])

    const defaultColumn = useMemo(()=>{
      return {
        Filter:ColumnFilter
      }
    },[])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        // footerGroups,
        // rows,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        gotoPage,
        pageCount,
        setPageSize,
        prepareRow,
        allColumns,
        getToggleHideAllColumnsProps,
        setGlobalFilter
      } = useTable({
        columns,
        data,
        defaultColumn,
        //If we want to start with a specific page by default in pagination
        // initialState:{pageIndex : 2}
      },
      useFilters,
      useGlobalFilter,
      useSortBy,
      usePagination,
      // useSticky,
      // useBlockLayout


      )

      const {pageIndex, pageSize} =state
      const {globalFilter}  = state
    return (
      <>
        
        {/* <div className='flex-container'>
       <div className='flex-item-left'>
        <span>Hide columns : </span>
            <div>
              <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle All
            </div>
                {allColumns.map((column) => (
                  <div key={column.id}>
                    <label>
                      <input type="checkbox" {...column.getToggleHiddenProps()} />
                      {column.Header}
                    </label>
                  </div>
                ))}
            </div>
            <div class="flex-item-right">
        

    </div>
        </div> */}


        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <div className='table'>
        <Table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th
                    {...column
                      .getHeaderProps

                      // If we need siorting in descending or ascending order
                      // column.getSortByToggleProps()
                      ()}
                  >
                    {column.render("Header")}
                    <div>
                      {" "}
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                    {/* <span>
                 {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span> */}
                  </Th>
                ))}
              </Tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          {/* <tfoot>
          {footerGroups.map(footerGroup => (
             <Tr {...footerGroup.getFooterGroupProps()}>
               {footerGroup.headers.map(column => (
                 <Td {...column.getFooterProps()}>{column.render('Footer')}</Td>
               ))}
             </Tr>
           ))}
         </tfoot> */}
        </Table>
        </div>

        {/* Pagination Code */}
        <div className='pagination'>

          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {" "}
            {" << "}
          </button>
          <button className='' onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </button>

          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>


          <span>
            | Goto to Page :{" "}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const pageNumber = e.target.value
                    ? Number(e.target.value) - 1
                    : 0;
                  gotoPage(pageNumber);
                }}
                style={{ width: "50px" }}
              />
               {"    "} |
          </span>

          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}>
            {[10, 25, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>



          <button className='next' onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </button>
          <button
          className='next round'
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}>
            {" "}
            {" >> "}
          </button>
        </div>
      </>
    );
}

export default TableCode
