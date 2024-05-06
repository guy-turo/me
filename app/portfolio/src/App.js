import React,{useState,useEffect} from 'react';
import {Routes,Route}from "react-router-dom"
import PortfolioPage from "./pages/PortfolioPage";
import LoginPage from './pages/auth/LoginPage';
import RecoverPage from './pages/auth/RecoverPage';
import NoPage from "./pages/NoPage";
import AdminPage from "./pages/AdminPage";
import SignUpPage from './pages/auth/RegisterPage';
import axios from "axios"
import PrivateRoute from "./pages/auth/helper/PrivateRoute";

const App=()=> {
  const [isAuthenticated,setIsAuthenticated]=useState(false)
  const isAuthenticate= localStorage.getItem("accessToken")?true:false

  const login=(e, email, password,)=>{
    e.preventDefault()
    console.log(email, password)
    const URI="http://localhost:8000/api/v1/auth/login"
    axios.post(URI,
      {
      email:email,
      password:password,
    })
    .then((res)=>{
      if(res.data.accessToken && res.data.refreshToken){
        localStorage.setItem("accessToken", res.data.accessToken)
        localStorage.setItem("refreshToken", res.data.refreshToken)
        setIsAuthenticated(true)
      }
    }).catch(e=>{
      alert(e.message)
      setIsAuthenticated(false)
    }
    )
  }
  useEffect(()=>{
    const accessToken= localStorage.getItem("accessToken")
    const refreshToken= localStorage.getItem("refreshToken")

    if(!accessToken && !refreshToken){
      setIsAuthenticated(false)
    }else{
      setIsAuthenticated(true)
    }

  },[isAuthenticated])

  return (
  <main>
     <Routes>
      <Route path="/" element={<PortfolioPage/>}/>
        <Route path='/signIn' element={
            <LoginPage login={login}/>
        }/>
        <Route path='/admin' element={
          <PrivateRoute isAuthenticated={isAuthenticate} >
            <AdminPage/>
        </PrivateRoute>
        }/>
        <Route path='*' element={<NoPage/>}/>
        <Route path="/signUp" element={<SignUpPage/>}/>
        <Route path="/recover" element={<RecoverPage/>}/>
     
    </Routes>
  </main>
  );
}

export default App;