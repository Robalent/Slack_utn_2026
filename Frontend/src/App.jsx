import React from "react";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import { Route, Routes } from "react-router";


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomeScreen/>}/>
      <Route path='/login' element={<LoginScreen/>}/>
      <Route path='/register' element={<RegisterScreen/>}/>
    </Routes>
  )
}

export default App