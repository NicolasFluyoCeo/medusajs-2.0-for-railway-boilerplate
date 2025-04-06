"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { getAuthHeaders } from "@lib/data/cookies"

type SignupPopupProps = {
  countryCode: string
  isLoggedIn: boolean
}

const SignupPopup: React.FC<SignupPopupProps> = ({ countryCode, isLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Only show popup if user is not logged in
    if (!isLoggedIn) {
      // Show popup after 5 seconds of landing on the page
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [isLoggedIn])

  const closeModal = () => {
    setIsOpen(false)
  }

  const goToRegister = () => {
    // Set a session storage item to indicate we want to show the register view
    sessionStorage.setItem('showRegisterView', 'true')
    router.push(`/${countryCode}/account`)
    closeModal()
  }

  // Don't render anything if user is logged in
  if (isLoggedIn) {
    return null
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? 'visible' : 'invisible'}`}>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-70 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
        onClick={closeModal}
      />
      
      {/* Modal content */}
      <div className={`relative z-10 max-w-4xl w-full transform transition-all ${isOpen ? 'scale-100' : 'scale-95'}`}>
        {/* Close button in top-right corner */}
        <button 
          onClick={closeModal}
          className="absolute top-3 right-3 z-10 p-1 bg-black bg-opacity-40 hover:bg-opacity-60 text-white rounded-full transition-all"
          aria-label="Close"
        >
          <span className="block p-1">×</span>
        </button>

        {/* Clickable image that leads to registration */}
        <div className="cursor-pointer" onClick={goToRegister}>
          <Image 
            src="/banner.png" 
            alt="Welcome to NG Soccer Gloves" 
            width={1000} 
            height={1000} 
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </div>
  )
}

export default SignupPopup 