import React from 'react'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import PrivateRoute from "./utils/PrivateRoute"
import { AuthProvider } from './context/AuthContext'
import Homepage from "./views/Homepage"
import Registerpage from "./views/Registerpage"
import Loginpage from "./views/Loginpage"
import Dashboard from "./views/Dashboard"
import Navbar from "./views/Navbar"
import './App.css'
<<<<<<< HEAD
=======
import { useSaveCSVMutation, useGetCSVQuery } from './services/csvFileApi';
>>>>>>> a4f19a133b5b2b2716cfe741f0b221f009483984

function App() {
  return (
    <Router>
      <AuthProvider>
        < Navbar />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<Dashboard/ >} exact path='/dashboard' />
          </Route>
          <Route exact path='/register' element={<Registerpage/>}/>
          <Route exact path='/login' element={<Loginpage/>}/>
          <Route exact path='/' element={<Homepage/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App;
