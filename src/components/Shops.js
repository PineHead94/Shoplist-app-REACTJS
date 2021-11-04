import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Filter from './Filter'
import {  deleteShop } from '../redux/ShopAction'


function Shops(props) {
    const [ rawShops,setRawShops ] = useState(props.shopData.shops)
    const [ newShops,setNewShops ] = useState(props.shopData.shops)

    useEffect(() => {
        setRawShops(props.shopData.shops)
        setNewShops(props.shopData.shops)
    },[props.shopData.shops])


    const filterShops = (status,filter,query) => {
        let filterShops = []
        if (status === 'open'){
            filterShops = rawShops.filter( shop => shop.closingdate === 'In Business')
            if(filter === 'area'){
                filterShops = filterShops.filter( shop => shop.area.toLowerCase().includes(query) )
            } else {
                filterShops = filterShops.filter( shop => shop.category.toLowerCase().includes(query))
            }
        } else if ( status==='closed' ){
            filterShops = rawShops.filter( shop => shop.closingdate !== 'In Business')
            if(filter === 'area'){
                filterShops = filterShops.filter( shop => shop.area.toLowerCase().includes(query) )
            } else {
                filterShops = filterShops.filter( shop => shop.category.toLowerCase().includes(query))
            }
        }

        setNewShops(filterShops)
    }

    const handleReset = () => {
        setNewShops(rawShops)
    }

    const handleDelete = (e,name) => {
        e.preventDefault()
        props.deleteShop(name)
        setNewShops( prevState => prevState.filter( shop => shop.name !== name ))
    }   

    return (

        <div className='shops'>
            { newShops.length === 0 ? <h1>No Shops</h1> : null}
            { newShops.map((shop) => {
                return (
                <div key={shop.name}>
                <h3>Shop Name: {shop.name} </h3>
                <h6>Area : {shop.area}</h6>
                <h6>Category : {shop.category}</h6>
                <h6>Opening Date : {shop.openingdate}</h6>
                <h6>Closing Date : {shop.closingdate}</h6>
                <button id='deleteBtn' onClick={(e) => handleDelete(e,shop.name)}>Delete this shop</button>
                </div>
            )
            } ) }
            <Filter filterShops={filterShops} handleReset={handleReset}/>
            <div className='footer'></div>
        </div>
    )
}

const mapStateToProps = state => {
    return {shopData : state}
}

const mapDispatchToProps = dispatch => {
    return {
        deleteShop : (name) => dispatch(deleteShop(name))
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(Shops)
