import React from 'react';
import Homepage from './components/Homepage';
import Products from './components/Products';
import Navbar from './components/Navbar';
import ShoppingCart from './components/ShoppingCart';
import UserUi from './components/UserUi';
import Login from './components/Login';
import Registration from './components/Registration';
import Footer from './components/Footer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CartProvider } from './context/CartContext'
import { ProductProvider } from './context/ProductContext';
import { TokensProvider } from './context/TokensContext';
import { UserProvider } from './context/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import { UsersProvider } from './context/UsersContext';

import './App.css';
function App() {
  return(
    <BrowserRouter>
      <TokensProvider>
        <ProductProvider>
          <CartProvider>
            <UsersProvider>
              <UserProvider>
                <div className="container">
                  <Navbar />
                    <Switch>
                      <Route path="/" exact component={Homepage} />
                      <Route path="/products" component={Products} />
                      <ProtectedRoute exact path="/shopping">
                        <ShoppingCart/>
                      </ProtectedRoute>
                      <PublicRoute exact path="/registration">
                        <Registration />
                      </PublicRoute>
                      <PublicRoute exact path="/login">
                        <Login />
                      </PublicRoute>
                      <ProtectedRoute exact path="/me">
                        <UserUi />
                      </ProtectedRoute>
                    </Switch>
                  </div>
                <Footer />
              </UserProvider>  
            </UsersProvider>
          </CartProvider>
        </ProductProvider>
      </TokensProvider>
    </BrowserRouter>
  );
}

export default App;
