import React from 'react';
import { useContext , lazy , Suspense } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
import AppShell from './AppShell';
import { AuthContext, AuthProvider } from './context/AuthContext';
import { FetchProvider } from './context/FetchContext';

import FourOFour from './pages/FourOFour';
import Home from './pages/Home';


import Login from './pages/Login';
import Payment from './pages/Payment';

import Signup from './pages/Signup';



const Dashboard = lazy(() => import('./pages/Dashboard'))
const Account = lazy(() => import('./pages/Account'))
const Inventory = lazy(() => import('./pages/Inventory'))
const Issue = lazy(() => import('./pages/Issue'))
const Users = lazy(() => import('./pages/Users'))



const AuthenticatedRoute = ({children, ...rest}) =>{
  const authContext = useContext(AuthContext)
    return (
      <Route {...rest}  render={ () => 
        authContext.isAuthenticated() ? (
         <AppShell>
           {children}
         </AppShell>
        ) : (
          <Redirect to="/" />
        )
       } />
    )
}

const AdminRoute = ({children, ...rest}) =>{
  const authContext = useContext(AuthContext)
    return (
      <Route {...rest}  render={ () => 
        authContext.isAuthenticated() ? (
          authContext.isAdmin() ? (
            <AppShell>
           {children}
         </AppShell>
          ):(
            <Redirect to="/dashboard" />
          )
         
        ) : (
          <Redirect to="/" />
        )
       } />
    )
}


const AppRoutes = () => {
  
  return (
    <Suspense fallback={<div>Loading</div>}>
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      <AuthenticatedRoute  path="/dashboard" >
       <Dashboard />
      </AuthenticatedRoute>
      <AdminRoute path="/inventory">
        
          <Inventory />
       
      </AdminRoute>
      <AuthenticatedRoute  path="/account">
        
          <Account />
        
      </AuthenticatedRoute>
      <AuthenticatedRoute  path="/issue">
        
          <Issue />
        
      </AuthenticatedRoute>
      <AdminRoute path="/users">
        
          <Users />
        
      </AdminRoute>
      <AuthenticatedRoute  path="/payment">
        
          <Payment />
        
      </AuthenticatedRoute>
      <Route path="*">
        <FourOFour />
      </Route>
    </Switch>
    </Suspense>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <FetchProvider>
          <div className="bg-gray-100">
            <AppRoutes />
          </div>
        </FetchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;