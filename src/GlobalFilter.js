import React,{useState} from 'react'
import { useAsyncDebounce } from 'react-table';

function GlobalFilter( {filter, setFilter}) {
    const [value, setValue]=useState(filter)

    const onChange = useAsyncDebounce(value=>{
        setFilter(value || undefined)
    },300)
    return (
        <span>
            
            <form action="" className="search-bar">
            
                <input type="search" name="search" pattern=".*\S.*" placeholder='Global Search' required onChange={(e) => {
                setValue(e.target.value)
                onChange(e.target.value)
                }} />
                <button className="search-btn" type="submit">
                    <span>Search</span>
                </button>
            </form>
            {/* <button className="" type="submit"><span>Search</span></button>
            <input 
            type='text'
            className='input'
            value={value || ""} 
            onChange={(e) => {
                setValue(e.target.value)
                onChange(e.target.value)
                }} 
                /> */}
        </span>
    )
    
}

export default GlobalFilter
