import {format} from "date-fns";
import ColumnFilter from './ColumnFilter';
import NumberRangeColumnFilter from './NumberRangeColumnFilter'

export const COLUMNS=[
    
        {
            Header: 'Bank Name',
            Footer: 'Bank Name',
            accessor: 'body.bankName',

          },
          {
            Header: 'Bank BIC',
            Footer: 'Bank BIC',
            accessor: 'body.bankBIC[0]',
          },
          {
              Header:"Report Score",
              Footer:"Report Score",
              accessor: 'body.reportScore',
              Filter: NumberRangeColumnFilter,
              filter: 'between',
          },
          {
           Header:"Type of Report",
           Footer:"Type of Report",
           accessor: 'body.type',
          
       },
       {
           Header:"Created At",
           Footer:"Created At",
           accessor: 'createdAt',
           Cell: ({value})=> {return format(new Date(value),'yyyy-MM-dd')},
           disableFilters:true       
       },
       {
           Header:"Published At",
           Footer:"Published At",
           accessor: 'publishedAt',
           Cell: ({value})=> {return format(new Date(value),'yyyy-MM-dd')},
        //    disableFilters:true  
       }
    
]