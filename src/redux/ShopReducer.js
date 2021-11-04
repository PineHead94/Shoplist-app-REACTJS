import { ADD_SHOP, DELETE_SHOP } from "./ShopType"

const initialState = {
    shops : [
            {
                name : 'Reliance',
                area : 'Mumbai',
                category : 'Grocery',
                openingdate : '2018-05-12',
                closingdate : '2021-09-23',
            },
            {
                name : 'Regal Stationery',
                area : 'Pune',
                category : 'Stationery shop',
                openingdate : '2015-09-01',
                closingdate : 'In Business',
            },
    ]
}

const shopReducer = (state=initialState,action) => {
    switch(action.type){
        case ADD_SHOP : 
            return {
                shops : [ ...state.shops,action.payload ]
            }
        case DELETE_SHOP : 
            let newArr = state.shops.filter( shop => shop.name !== action.payload)
            console.log(newArr)
            return {
                shops : newArr
            }
        default : return state
    }
}

export default shopReducer