import React from "react";
import { useState, useEffect } from 'react';
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import { Table, thead, tbody, tr, th, td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
 
 function ReactTable() {
    const [data , setData] = useState([]);

    useEffect(() => {
        fetch("./reports.json")
        .then(function(res){return res.json()})
        .then(function(data){setData(data)})
        .catch(function(err){console.log(err, ' error')})
      });

   const columns = React.useMemo(
     () => [
       {
         Header: 'Bank Name',
         accessor: 'body.bankName',
       },
       {
         Header: 'Bank BIC',
         accessor: 'body.bankBIC[0]',
       },
       {
           Header:"Report Score",
           accessor: 'body.reportScore',
       },
       {
        Header:"Type of Report",
        accessor: 'body.type',
    },
    {
        Header:"Created At",
        accessor: 'createdAt',
    },
    {
        Header:"Published At",
        accessor: 'publishedAt',
    }
     ],
     []
   )
 
   const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
   } = useTable(
       { 
           columns, 
           data },
           useFilters,
           useGlobalFilter )
 
   return (
     <Table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 style={{
                   borderBottom: 'solid 3px red',
                   background: 'aliceblue',
                   color: 'black',
                   fontWeight: 'bold',
                 }}
               >
                 {column.render('Header')}
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                     style={{
                       padding: '10px',
                       border: 'solid 1px gray',
                       background: 'papayawhip',
                     }}
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </Table>
   )
 }

 export default ReactTable;