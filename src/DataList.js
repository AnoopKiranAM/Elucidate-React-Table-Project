import React from 'react';

import {useState} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory,{textFilter} from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

function DataList(){
    const [userList , setUserList] = useState([]);
    const columns = [
        {dataField:'body.bankName', text:'Bank Name', sort:true, filter:textFilter()},
        {dataField:'body.bankBIC[0]', text:'Bank BIC' ,sort:true, filter:textFilter()},
        {dataField:'body.reportScore', text:'Report Score'},
        {dataField:'body.type', text:'Type of Report'},
        {dataField:'createdAt', text:'Created At'},
        {dataField:'publishedAt', text:'Published At'},
    ]

    const pagination = paginationFactory({
        page:1,
        sizePerPage:5,
        lastPageText:'>>',
        firstPageText:'<<',
        nextPageText:'>',
        prePageText:'<',
        showTotal:true,
        alwaysShowAllBtns:true,
        onPageChange : function(page,sizePerPage){
            console.log('page',page);
            console.log('sizeperpage',sizePerPage);
        },
        onSizePerPageChange:function(page,sizePerPage){
            console.log('page',page);
            console.log('sizePerPage',sizePerPage);
        }
    });
  fetch("./reports.json")
        .then(function(res){return res.json()})
        .then(function(userList){setUserList(userList)})
        .catch(function(err){console.log(err, ' error')})
    return <div>
    <BootstrapTable 
    bootstrap4 
    keyField='uuid' 
    columns={columns} 
    data={userList} 
    pagination={pagination}
    filter={filterFactory()}
    />
    </div>
}

export default DataList;