"use client"

import { useState } from "react"
import Input from "@modules/common/components/input"
import { Button } from "@medusajs/ui"
import { Heading } from "@medusajs/ui"
import MapPin from "@modules/common/icons/map-pin"
import User from "@modules/common/icons/user"
import { Instagram as DeprecatedInstagram } from "lucide-react"
import { InstagramIcon } from "lucide-react"

type ContactsTemplateProps = {
  countryCode: string
}

const ContactsTemplate = ({ countryCode }: ContactsTemplateProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/mails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact',
          name: formData.name,
          email: formData.email,
          message: formData.message
        }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setSubmitSuccess(true)
        setFormData({ name: "", email: "", message: "" })
      } else {
        // Error handling
        console.error('Error sending message:', data.error)
        // You might want to add an error state here
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      // You might want to add an error state here
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="content-container py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Left Column - Contact Information */}
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold mb-8">Contact us</h1>
          
          {/* Email */}
          <div className="mb-12">
            <p className="text-gray-600 mb-1">Email</p>
            <p className="text-black">ngsoccergloves@gmail.com</p>
          </div>
          
          
          {/* Social Media Links */}
          <div>
            <div className="space-y-6">
              <div>
                <a 
                  href="https://www.instagram.com/ngsoccergloves" 
                  className="flex items-center gap-3 group"
                  aria-label="Instagram ngsoccergloves"
                >
                  <div className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 w-10 h-10 rounded-full flex items-center justify-center text-white group-hover:opacity-90">
                    <InstagramIcon className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-900 group-hover:underline">NG Soccer Gloves</span>
                </a>
                <p className="text-gray-600 text-sm ml-13">Professional goalkeeper gloves and equipment</p>
              </div>
              
              <div>
                <a 
                  href="https://www.instagram.com/ngsoccertraining" 
                  className="flex items-center gap-3 group"
                  aria-label="Instagram ngsoccertraining"
                >
                  <div className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 w-10 h-10 rounded-full flex items-center justify-center text-white group-hover:opacity-90">
                    <InstagramIcon className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-900 group-hover:underline">NG Soccer Training</span>
                </a>
                <p className="text-gray-600 text-sm ml-13">Training tips and goalkeeper techniques</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Contact Form */}
        <div className="w-full md:w-1/2">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Leave us a message</h2>
            
            {submitSuccess ? (
              <div className="bg-green-100 p-4 rounded-lg mb-4">
                <p className="text-green-700">Thank you for your message! We'll get back to you soon.</p>
              </div>
            ) : null}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Input
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label className="text-gray-700 mb-1 block">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full rounded-md border border-gray-200 bg-white p-3 text-gray-900 focus:border-gray-900 focus:outline-none"
                  required
                />
              </div>
              
              <Button 
                className="w-full" 
                disabled={isSubmitting} 
                variant="primary"
              >
                Send
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactsTemplate 