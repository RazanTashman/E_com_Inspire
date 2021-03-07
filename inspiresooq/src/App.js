// import SignUp from './comp/auth/signUp'
import Home from './comp/shops/home';
import LogIn from './comp/auth/logIn';
import SignUp from './comp/auth/signUp';   
import User from './comp/users/user';     
import Product from './comp/users/product'
import Store from "./comp/users/store"
import './App.css';

import { BrowserRouter, Switch, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
            <Route path= '/SignUp' component = {SignUp}></Route>
            <Route path= '/login' component = {LogIn}></Route>
            <Route path= '/home' component = {Home}></Route>
            <Route path= '/user' component = {User}></Route>
            <Route path= '/product/:id' component = {Product}></Route>
            <Route path= '/store/:id' component = {Store}></Route>           
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;