import { createStore } from 'redux'
import shopReducer from './redux/ShopReducer'

const store = createStore( shopReducer )

export default store