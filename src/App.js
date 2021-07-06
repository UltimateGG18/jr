/*import React from 'react'
import Home1 from './Home1'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Registernew from './Registernew'
import Logged from './Logged'
import Login from './Login'
import Productdetail from './components/Productdetail'
import Productdetail1 from './components/Productdetail1'
import Productdetail2 from './components/Productdetail2'
import Productdetail3 from './components/Productdetail3'
import Cart from './components/Cart'
import ViewMore from './ViewMore';


const App = () => {
  return (
    <>
    <BrowserRouter>
    
      
      <Route exact path = '/' component={Home1}/>
      <Route exact path = '/Registernew' component={Registernew}/>
      <Route exact path = '/Logged' component={Logged}/>
      <Route exact path = '/Login' component={Login}/>
      <Route exact path = '/productdetails' component={Productdetail}/>
      <Route exact path = '/Productdetail1' component={Productdetail1}/>
      <Route exact path = '/Productdetail2' component={Productdetail2}/>
      <Route exact path = '/Productdetail3' component={Productdetail3}/>
      <Route exact path = '/cart' component={Cart}/>
      <Route exact path = '/viewmore' component={ViewMore}/>


      
     
    </BrowserRouter>
    </>
  )
}

export default App*/

// import React from 'react';
import './App.css';
import jwtDecode from 'jwt-decode';
import {Provider} from 'react-redux';
import PrivateCustomer from "./components/Reusable/privateCustomer";
import PrivateShop from './components/Reusable/privateShop';
import PrivateAdmin from './components/Reusable/privateAdmin';
import Public from './components/Reusable/public';
import {userLoginSuccess,shopKeeperLogin,adminLogin} from './components/Redux/Auth/authAction';
import store from './store';
import Home from './components/Home';
import Login from './Login';
//import Registration from './components/Registration';
import { BrowserRouter as Router, Route, Switch,withRouter,Redirect} from 'react-router-dom';
import Maincat from './components/MainCat';
import ShopKeeperSetting from './components/shopKeeperSetting';
import UserProfile from './components/userProfile';
import CusNav from './components/NavBars/cusNav';
import ShopNav from './components/NavBars/shopNav';
import AdminNav from './components/NavBars/adminNav';
import Product from './components/product';
import Pagenotfound from './components/Pagenotfound'
import orderlist from './components/orderlist';
import wishlist from './components/wishlist'
import Cart from './components/Cart';
import Home1 from './Home1'
import Productdetail from './components/Productdetail'

function App() {

  // ---------user start------
  const usertokan=localStorage.getItem("user"); 
  if(usertokan){
    const decodedUser=jwtDecode(usertokan);
    store.dispatch(userLoginSuccess(decodedUser))  
  }
  // ---------user end------

  // ---------Shopkeeper start------------
  const shoptokan=localStorage.getItem("shopkeeper"); 
  if(shoptokan){
    const decodedShop=jwtDecode(shoptokan);
    store.dispatch(shopKeeperLogin(decodedShop))  
  }
  // ---------Shopkeeper end------------
  
  // --------Admin start----------
  const admintokan=localStorage.getItem("admin"); 
  if(admintokan){
    const decodedAdmin=jwtDecode(admintokan);
    store.dispatch(adminLogin(decodedAdmin))  
  }
  // -----------Admin end--------

  const Main=withRouter(({location})=>{

  return (
    <>
    {(location.pathname.toLowerCase()=="/dashboard"|| location.pathname.toLowerCase() == "/category" || location.pathname.toLowerCase() == "/userprofile" || location.pathname.toLowerCase() == "/wishlist" || location.pathname.toLowerCase() == "/cart" ) && <CusNav/>}
    {(location.pathname.toLowerCase()=="/shopdashboard"|| location.pathname.toLowerCase()=="/product" || location.pathname.toLowerCase()=="/shopkeepersetting"|| location.pathname.toLowerCase()=="/orderlist") && <ShopNav/>}
    {(location.pathname.toLowerCase()=="/admdashboard"|| location.pathname.toLowerCase()=="/admcategory" ) && <AdminNav/>}
    
  
      <Switch>
        <PrivateCustomer exact path = '/dashboard' component={Home}/>
        <PrivateCustomer exact path = '/Category' component={Maincat}/>
        <PrivateCustomer exact path = '/UserProfile' component={UserProfile}/>
        <PrivateShop exact path = '/ShopDashboard' component={Home}/>
        <PrivateShop exact path = '/Product' component={Product}/>
        <PrivateShop exact path = '/shopkeepersetting' component={ShopKeeperSetting}/>
        <PrivateAdmin exact path = '/AdmDashboard' component={Home}/>
        <PrivateAdmin exact path = '/admCategory' component={Maincat}/>
        <Public exact path = '/' component={Home1} />
        <Public exact path = '/login' component={Login} />
        <Public exact path = '/productdetails' component={Productdetail} />
        <Route exact path = '/404' component={Pagenotfound}/>
        <PrivateShop exact path = '/orderlist' component={orderlist}/>
        <PrivateCustomer exact path = '/wishlist' component={wishlist}/>
        <PrivateCustomer exact path ='/Cart' component={Cart}/>
       

    
        <Redirect to="/404"/>

      </Switch>
    </>
  )})
  return (
    <Provider store={store}>
    <Router>
      <Main></Main>
    </Router>
    </Provider>
  );
}

export default App;

