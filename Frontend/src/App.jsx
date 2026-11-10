import React from "react";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import { Route, Routes } from "react-router";
import AuthMiddleware from "./Middlewares/AuthMiddleware";
import WorkspaceScreen from "./screens/WorkspaceScreen/WorkspaceScreen";


const App = () => {
  return (
    <Routes>
      <Route element={<AuthMiddleware/>}>
        <Route path='/' element={<HomeScreen/>}/>

        <Route path='/home'element={<HomeScreen/>}/>

        <Route path="/workspace/:workspace_id" element={<WorkspaceScreen/>}/>
      </Route>   
      
      <Route path='/login' element={<LoginScreen/>}/>
      <Route path='/register' element={<RegisterScreen/>}/>
      
    </Routes>
  )
}

export default App