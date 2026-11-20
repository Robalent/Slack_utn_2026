import React from "react";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import VerifyEmailScreen from "./screens/VerifyEmailScreen/VerifyEmailScreen";
import ResendEmailVerificationScreen from "./screens/ResendEmailVerificationScreen/ResendEmailVerificationScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen/ForgotPasswordScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen/ResetPasswordScreen";
import { Route, Routes } from "react-router";
import AuthMiddleware from "./Middlewares/AuthMiddleware";
import WorkspaceScreen from "./screens/WorkspaceScreen/WorkspaceScreen";
import NewWorkspaceScreen from "./screens/NewWorkspaceScreen/NewWorkspaceScreen";
import ChannelScreen from "./screens/ChannelScreen/ChannelScreen";
import NewChannelScreen from "./screens/NewChannelScreen/NewChannel";


const App = () => {
  return (
    <Routes>
      <Route element={<AuthMiddleware/>}>
        <Route path='/' element={<HomeScreen/>}/>

        <Route path='/home'element={<HomeScreen/>}/>

        <Route path="/workspace/:workspace_id" element={<WorkspaceScreen/>}>
          <Route path=":channel_id" element={<ChannelScreen/>}/>
          <Route path="newChannel" element={<NewChannelScreen/>}/>
        </Route>

        <Route path="/workspaces/new" element={<NewWorkspaceScreen/>}/>
      </Route>   
      
      <Route path='/login' element={<LoginScreen/>}/>
      <Route path='/register' element={<RegisterScreen/>}/>
      <Route path='/verify-email' element={<VerifyEmailScreen/>}/>
      <Route path='/resend-email-verification' element={<ResendEmailVerificationScreen/>}/>
      <Route path='/forgot-password' element={<ForgotPasswordScreen/>}/>
      <Route path='/reset-password' element={<ResetPasswordScreen/>}/>
      
    </Routes>
  )
}

export default App