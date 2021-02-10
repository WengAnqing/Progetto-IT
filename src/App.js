import './App.css';
import HomeScreen from './HomeScreen';
import ContactScreen from './ContactScreen';
import CartScreen from './CartScreen';
import SignInScreen from './SignInScreen';
import RegisterScreen from './RegisterScreen';
import MyOrderScreen from './MyOrderScreen';
import AdminSignInScreen from './AdminSignInScreen';
import AddAdminScreen from './AddAdminScreen';
import ManageOrderScreen from './ManageOrderScreen'
import AddProductScreen from './AddProductScreen'
import { BrowserRouter, Route } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>   
      <Route exact path="/" component={HomeScreen} />
      <Route exact path="/cart" component={CartScreen} />
      <Route exact path="/myorder" component={MyOrderScreen} />
      <Route exact path="/contact" component={ContactScreen} />
      <Route exact path="/signin" component={SignInScreen} />
      <Route exact path="/register" component={RegisterScreen} />
      <Route exact path="/adminsignin" component={AdminSignInScreen} />
      <Route exact path="/addadmin" component={AddAdminScreen} />
      <Route exact path="/manageorder" component={ManageOrderScreen} />
      <Route exact path="/addproduct" component={AddProductScreen} />
    </BrowserRouter>
  );
}

export default App;

