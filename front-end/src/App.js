import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import IndexContainer from './layouts/Index';

// import Header from './components/Header'
import LoginScreen from './layouts/auth/Login'
import RegisterScreen from './layouts/auth/Register'
import MessageScreen from './layouts/main/MainContainer'
import ProtectedRoute from './routes/ProtectedRoute'

function App() {
  return (
    // <IndexContainer />

    <Router>
      {/* <Header /> */}
      {/* <IndexContainer> */}
        <Routes>
          <Route path='/' element={<LoginScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/message' element={<MessageScreen />} />
          </Route>
        </Routes>
      {/* </IndexContainer> */}
    </Router>
  );
}

export default App;
