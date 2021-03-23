// import SignUp from './comp/auth/signUp'
import Home from './comp/shops/home';
import LogIn from './comp/auth/logIn';
import SignUp from './comp/auth/signUp';   
import User from './comp/users/user';     
import Product from './comp/users/product'
import Store from "./comp/users/store"
import OTP from "./comp/auth/otp"
import Cart from "./comp/users/cart"
import Categories from "./comp/admin/categories"
import AddCat from "./comp/admin/addCat"
import AddSubCat from "./comp/admin/addSubCat"
import './App.css';


import { BrowserRouter, Switch, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
            <Route path= '/signup' component = {SignUp}></Route>
            <Route path= '/login' component = {LogIn}></Route>
            <Route path= '/home' component = {Home}></Route>
            <Route path= '/user' component = {User}></Route>
            <Route path= '/product/:id' component = {Product}></Route>
            <Route path= '/store/:id' component = {Store}></Route>   
            <Route path= '/pwdverification' component = {OTP}></Route>   
            <Route path= '/cart' component = {Cart}></Route> 
            <Route path= '/admin/categories' component = {Categories}></Route>
            <Route path= '/admin/addsubcategories' component = {AddSubCat}></Route>
            <Route path= '/admin/addcategories' component = {AddCat}></Route>

                   
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
