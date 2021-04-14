// import SignUp from './comp/auth/signUp'
import Peofile from './comp/shops/peofile';
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
import EditCat from "./comp/admin/editCat"
import EditSubCat from "./comp/admin/editSubcat"
import Orders from "./comp/users/orders"
import OrdersList from './comp/shops/ordersList';
import Home from './comp/auth/home';

import './App.css';


import { BrowserRouter, Switch, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Switch>
          <Route path='/home' component={Home}></Route>
          <Route path='/signup' component={SignUp}></Route>
          <Route path='/login' component={LogIn}></Route>
          <Route path='/peofile' component={Peofile}></Route>
          <Route path='/user' component={User}></Route>
          <Route path='/product/:id' component={Product}></Route>
          <Route path='/store/:id' component={Store}></Route>
          <Route path='/pwdverification' component={OTP}></Route>
          <Route path='/cart' component={Cart}></Route>
          <Route path='/admin/categories' component={Categories}></Route>
          <Route path='/admin/addsubcategories' component={AddSubCat}></Route>
          <Route path='/admin/addcategories' component={AddCat}></Route>
          <Route path='/admin/editsubcategories/:id' component={EditSubCat}></Route>
          <Route path='/admin/editcategories/:id' component={EditCat}></Route>
          <Route path='/orders/:id' component={Orders}></Route>
          <Route path='/orders/:id' component={Orders}></Route>
          <Route path='/shop/orders/:id' component={OrdersList}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
