import { Provider } from "react-redux";
import AddShop from "./components/AddShop";
import Shops from "./components/Shops";
import store from './store'

function App() {
  return (
    <div className="App">
      <Provider store = { store } >
        <AddShop />
        <Shops />
      </Provider>
    </div>
  );
}

export default App;
