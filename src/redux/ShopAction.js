import { ADD_SHOP, DELETE_SHOP } from "./ShopType"


// shop has to be an object
export const addShop = (shop) => {
    return {
        type : ADD_SHOP,
        payload : shop
    }
}
// 
export const deleteShop = (shopName) => {
    return {
        type : DELETE_SHOP,
        payload : shopName
    }
}