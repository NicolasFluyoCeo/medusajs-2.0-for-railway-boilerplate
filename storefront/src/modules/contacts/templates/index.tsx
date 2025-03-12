"use client"

import { useState } from "react"
import Input from "@modules/common/components/input"
import { Button } from "@medusajs/ui"
import { Heading } from "@medusajs/ui"
import MapPin from "@modules/common/icons/map-pin"
import User from "@modules/common/icons/user"

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
                  <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center text-gray-700 group-hover:bg-gray-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
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
                  <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center text-gray-700 group-hover:bg-gray-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
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