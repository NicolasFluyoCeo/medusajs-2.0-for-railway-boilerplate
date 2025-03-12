"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const SearchInput = () => {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="flex items-center h-8 bg-gray-900 border border-gray-700 rounded-md overflow-hidden">
        <input 
          type="text" 
          placeholder="Search products..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent text-white text-sm px-3 py-1 w-40 focus:outline-none focus:w-56 transition-all"
        />
        <button 
          type="submit"
          className="px-2 text-gray-400 hover:text-white"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>
    </div>
  )
}

export default SearchInput 