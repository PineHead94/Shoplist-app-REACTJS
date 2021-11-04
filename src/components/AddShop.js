import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addShop } from '../redux/ShopAction'

function AddShop(props) {
    const [ closed,setClosed ] = useState(false)
    const [ shopname,setShopname ] = useState('')
    const [ area,setArea ] = useState('Mumbai')
    const [ category,setCategory ] = useState('Grocery')
    const [ openingDate,setOpeningDate ] = useState(null)
    const [ closingDate,setClosingDate ] = useState('-')
    const [ errorShopName,setErrorShopName ] = useState(null)
    const [ errorDate,setErrorDate ] = useState(null)
    const [ sidebarToggle,setSidebarToggle ] = useState(false)



    const reShop = /^[a-zA-z ]+$/
    
    const handleAdd = (e) => {
        e.preventDefault()
 
        if(!reShop.test(shopname)){
            setErrorShopName('Invalid Shop Name')
        } else {
            if(closingDate !== '-'){
                let openingArr = openingDate.split('-')
                let closingArr = closingDate.split('-')
                if(closingArr[0]-openingArr[0]>=0){
                    if(closingArr[0]-openingArr[0]>0){
                        addShop()
                    }
                    else if( closingArr[0]-openingArr[0] === 0){
                        if(closingArr[1]-openingArr[1]>=0){
                            if(closingArr[1]-openingArr[1]>0){
                                addShop()
                            } else if (closingArr[1]-openingArr[1]===0) {
                                if(closingArr[2]-openingArr[2]>0){
                                    addShop()
                                } else {
                                    setErrorDate('Invalid date')
                                }
                            } else {
                                setErrorDate('Invalid date')
                            }
                        } else {
                            setErrorDate('Invalid date')
                        }
                    } else {
                        setErrorDate('Invalid Date')
                    }
                } else {
                    setErrorDate('Invalid date')
                }
            } else {
                addShop()
            }

        }

    }

    const addShop = () => {
        const shop = {
            name : shopname,
            area : area,
            category : category,
            openingdate : openingDate,
            closingdate : !closed ? 'In Business' : closingDate
        }
        props.addShop(shop)
        setErrorShopName(null)
        setErrorDate(null)
    }

    const handleSidebar = (e) => {
        e.preventDefault()
        setSidebarToggle(prevState => !prevState)
    }

    window.addEventListener('resize',()=>{
        if(window.innerWidth<900){
            setSidebarToggle(true)
        } else {
            setSidebarToggle(false)
        }
    })

    return (
        <div className='addshop'  style={{ transform : `translateX(${sidebarToggle ? '-86%' : '0%'})`}}>
            <div className='form-container'>
            <button id='sidebarBtn' onClick={(e)=>handleSidebar(e)}><i style={{pointerEvents:'none'}} className="fas fa-pen"></i></button>
            <div className='shopname'>
            <h3>Add a Shop</h3>
            <label htmlFor="shopname">Shop Name:</label>
            <input type="text" name='shopname' placeholder='Shop Name' onChange={(e) => setShopname(e.target.value)}/>
            </div>
            { errorShopName && <p>{errorShopName}</p> }
            <div className='area'>
            <label htmlFor="area">Area:</label>
            <select name="area" id="area" onClick={(e) => setArea(e.target.value)}>
                <option value="Mumbai" defaultValue>Mumbai</option>
                <option value="Pune">Pune</option>
                <option value="Thane">Thane</option>
                <option value="Nashik">Nashik</option>
                <option value="Nagpur">Nagpur</option>
                <option value="Ahemdabad">Ahemdabad</option>
                <option value="Solapur">Solapur</option>
            </select>
            </div>
            <div className='category'>
            <label htmlFor="category">Category:</label>
            <select name="category" id="category" onClick={(e) => setCategory(e.target.value)}>
                <option value="Grocery" defaultValue>Grocery</option>
                <option value="Bakery">Bakery</option>
                <option value="Butcher">Butcher</option>
                <option value="Stationery Shop">Stationery Shop</option>
                <option value="Chemist">Chemist</option>
            </select>
            </div>
            <div className='openedon'>
            <label htmlFor="openingdate">Opened On:</label>
            <input type="date" name='openingdate'  onChange={(e) => setOpeningDate(e.target.value)}/>
            </div>
            <div className='checkbox'>
                <input type="checkbox" id='checkbox' value='closed' onClick={() =>setClosed(prevState => !prevState)}/>
                <label htmlFor="checkbox">Closed</label>
            </div>
            { closed && <div className='closedon'>
                <label htmlFor="">Closed On:</label> <input type="date" name='closingdate' onChange={(e) => setClosingDate(e.target.value)} min={openingDate}/>
            </div> }
            { errorDate && <p>{errorDate}</p> }
            <button onClick={(e) => handleAdd(e)}>Add shop</button>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {shopData : state}
}

const mapDispatchToProps = dispatch => {
    return {
        addShop : (shop) => dispatch(addShop(shop)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddShop)
