"use client"

import { useRouter } from "next/navigation"

const SearchBar = () => {
  const router = useRouter()

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const searchQuery = e.currentTarget.value
      if (searchQuery.length > 0) {
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      }
    }
  }

  return (
    <div className="relative flex items-center bg-gray-800/50 rounded-full px-3">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-300">
        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <input 
        type="search"
        placeholder="Search" 
        className="bg-transparent border-none outline-none text-white placeholder-gray-300 px-2 py-1 w-[120px]"
        onKeyDown={handleSearch}
      />
    </div>
  )
}

export default SearchBar 