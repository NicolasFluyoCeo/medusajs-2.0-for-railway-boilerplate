import { Button } from "@medusajs/ui"

const Hero = () => {
  return (
    <div className="h-[75vh] w-full relative flex">
      {/* Background image */}
      <div className="absolute inset-0">
        <img 
          src="/home/bg.png"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* Left content section */}
      <div className="flex-1 flex flex-col justify-center px-12 gap-6 relative z-10">
        <div>
          <h1 className="text-5xl font-bold text-white leading-tight">
          Soccer Gloves<br />
          </h1>
        </div>
        
        <div className="flex gap-4 mt-4">
          <Button variant="primary" className="bg-blue-600 hover:bg-blue-700">
            Buy now $35
          </Button>
          <Button variant="secondary" className="bg-gray-700 hover:bg-gray-600 text-white">
            Explore
          </Button>
        </div>
      </div>

      {/* Right image section */}
      <div className="flex-1 relative z-10">
        <img 
          src="/home/hero-image.png" 
          alt="Model wearing blue sweatshirt" 
          className="absolute bottom-0 right-0 top-[80px] h-[100%] w-full object-contain rounded-[20px]"
        />
      </div>
    </div>
  )
}

export default Hero
