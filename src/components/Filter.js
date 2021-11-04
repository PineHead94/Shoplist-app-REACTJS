import React, { useState } from 'react'

function Filter({ filterShops,handleReset }) {
    const [ status,setStatus ] = useState('open')
    const [ category,setCategory ] = useState('area')
    const [ query,setQuery ] = useState('')
    const [ toggle,setToggle ] = useState(false)

    const handleClick = (e) => {
        e.preventDefault()
        filterShops(status,category,query)
    }
    const resetBtn = (e) => {
        e.preventDefault()
        handleReset()
    }

    return (
        <div className='filter' style={{top: toggle ? '65%' : '95%'}}>
            <div className='header' onClick={()=> setToggle(prev => !prev)}>
            <h4>Find Store</h4>
            </div>
            <form>
            <div className='radio-container'>
                <div>
                    <input type="radio" value='open' name='status' id='open' onClick={(e) => setStatus(e.target.value)} />
                    <label htmlFor="open">Open</label>
                </div>
                <div>
                    <input type="radio" value='closed' name='status' id='closed' onClick={(e) => setStatus(e.target.value)}/>
                    <label htmlFor="closed">Closed</label>
                </div>
            </div>
            <div>
                <label htmlFor="filter">Search By:</label>
                <select name="filter" id="filter" onChange={(e) => setCategory(e.target.value)}>
                    <option value="area">Area</option>
                    <option value="category">Category</option>
                </select>
            </div>
            <input type="text" placeholder={'Enter ' + category} onChange={(e) => setQuery(e.target.value)} id='query'/>
            <button className='go' onClick={(e)=>handleClick(e)}>Go</button>
            </form>
            <button className='reset' onClick={(e) => resetBtn(e)}>Reset</button>
        </div>
    )
}

export default Filter
