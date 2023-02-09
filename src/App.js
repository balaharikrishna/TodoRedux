import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/home";
import store from '../src/Redux/store'
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter basename='/TodoRedux'> 
      <Routes>
      
        <Route path="/" element={<Home />}></Route>
        
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
