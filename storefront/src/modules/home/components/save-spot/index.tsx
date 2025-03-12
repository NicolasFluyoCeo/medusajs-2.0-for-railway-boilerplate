"use client"

import React, { useState } from "react"
import { Input, Text } from "@medusajs/ui"

const SaveSpot = () => {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    
    try {
      const response = await fetch('/api/mails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to send email');
      }
      
      setIsSubmitted(true)
      
      setTimeout(() => {
        setEmail("")
        setIsSubmitted(false)
      }, 3000)
    } catch (err) {
      console.error('Error:', err);
      setError("Failed to send email. Please try again later.");
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div 
        className="relative rounded-xl overflow-hidden mx-auto bg-cover bg-center border border-gray-200 shadow-xl"
        style={{
          backgroundImage: "url('/spot.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          maxWidth: "1000px",
          height: "500px"
        }}
      >
        {/* Semi-transparent overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <div className="h-full w-full flex items-center justify-center">
          <div className="max-w-lg text-center text-white relative z-10 px-4">
            <div className="mb-4 text-sm uppercase tracking-wide font-semibold">NG SOCCER TRAINING</div>
            <h2 className="text-4xl font-bold mb-3">TRAIN LIKE PRO<br/>TRAIN WITH PROS</h2>
            <p className="text-2xl font-semibold mb-4">Save your spot</p>
            <p className="text-md mb-6">To reserve a spot for training</p>

            {isSubmitted ? (
              <div className="bg-black/70 border border-white/20 text-white p-4 rounded-md max-w-md mx-auto backdrop-blur-sm">
                <svg className="w-6 h-6 text-white mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p>Thank you! We'll keep you updated about training sessions.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full max-w-md mx-auto">
                <div className="flex-grow w-full sm:w-3/4">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full h-8 px-4 py-1 rounded-md border-white bg-white/90 text-black outline-none focus:outline-none text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="h-8 py-1 px-4 rounded-md bg-black text-white font-medium hover:bg-gray-800 inline-flex items-center whitespace-nowrap text-sm"
                >
                  Send email
                </button>
              </form>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default SaveSpot
