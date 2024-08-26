import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import Header from './components/header'
import './App.css'
import LoginRegister from './components/loginRegister';
import ChangePassowrd from './components/changePassword';
import PrivateRoutes from './authroute';
import { MyContext } from './MyContext';
// import UserGreeting from './components/userGreetings';
import ProductsDashboard from './components/user-view/ProductDashboard';
import AddToCart from './components/user-view/AddtoCart';
import AddProducts from './components/porter-view/addproducts';
// import ProductEditDashboard from './components/porter-view/ProductEditDashboard';
import BillingShippingForm from './components/user-view/BillingShippingForm';
import PaymentPage from './components/user-view/PaymentPage';

const API = 'http://localhost:8080/users';

function Root() {
  const [user, setUser] = useState({ 'username': '', 'email': '', 'password': '' })

  const fetchTodos = async () => {
    const data = await fetch(`₹{API}/getAllTodos/₹{user.email}`);
    const todos = await data.json();

    setAllTodos(todos?.allTodos || []);
    setCompletedTodos(todos?.completedTodos || []);
  }

  useEffect(() => {
    if (user.email) {
      fetchTodos();
    }
  }, [user.email]);

  return (
    <MyContext.Provider value={{ user, setUser }}>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<LoginRegister />} />
          {/* <Route path="/user-greeting" element={<PrivateRoutes>
            <UserGreeting />
          </PrivateRoutes>} /> */}
          <Route path="/user-dashboard" element={<PrivateRoutes>
            <ProductsDashboard />
          </PrivateRoutes>} />
          <Route path="/cart" element={<AddToCart />} />
          <Route path="/payment-page" element={<PaymentPage />} />
          <Route path="/billing-shipping" element={<BillingShippingForm />} />
          <Route path="/edit-product/:id" element={<AddProducts />} />
          <Route path="/changepassword" element={<ChangePassowrd />} />
        </Routes>
      </div>
    </MyContext.Provider>
  )
}

export default Root
