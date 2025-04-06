"use client"

import { useState, useEffect } from "react"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState<LOGIN_VIEW>(LOGIN_VIEW.SIGN_IN)

  useEffect(() => {
    // Check if we should show the register view
    const showRegister = sessionStorage.getItem('showRegisterView')
    if (showRegister === 'true') {
      setCurrentView(LOGIN_VIEW.REGISTER)
      // Remove the item after we've used it
      sessionStorage.removeItem('showRegisterView')
    }
  }, [])

  return (
    <div className="w-full flex justify-start px-8 py-8">
      {currentView === LOGIN_VIEW.SIGN_IN ? (
        <Login setCurrentView={setCurrentView} />
      ) : (
        <Register setCurrentView={setCurrentView} />
      )}
    </div>
  )
}

export default LoginTemplate
