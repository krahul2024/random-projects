import React from 'react'
import { Routes , Route, BrowserRouter as Router} from 'react-router-dom'
// import indexPage from './components/indexPage.jsx'
import Login from './components/login.jsx'
import Layout from './components/layout.jsx'
import Register from './components/register.jsx'
import axios from 'axios'
import {UserContextProvider} from './userContext.jsx'

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.withCredentials= true;

const App=() =>{

    return (
      <>
      <UserContextProvider>
       <Router>

          <Routes>

            <Route path="/" element={<Layout/>}>

             <Route index element={<indexpage/>} />

             <Route path="/login" element={<Login/>} />

             <Route path="/register" element={<Register/>} />

            </Route>

          </Routes>

       </Router>

       </UserContextProvider>

      </>  )
}

export default App;
