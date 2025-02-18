import { Button } from "@medusajs/ui"

const Hero = () => {
  return (
    <div className="min-h-[75vh] w-full relative flex flex-col md:flex-row">
      {/* Background image */}
      <div className="absolute inset-0">
        <img 
          src="/home/bg.png"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* Left content section */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-36 gap-6 relative z-10 py-8 md:py-0">
        <div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
          Soccer Gloves<br />
          </h1>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button
            variant="secondary"
            className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg px-4 sm:px-8 py-3 text-sm sm:text-base font-medium w-full sm:w-auto"
          >
            Buy now $35
          </Button>
          <Button 
            variant="secondary" 
            className="bg-gray-800 hover:bg-gray-700 text-white rounded-lg px-4 sm:px-8 py-3 text-sm sm:text-base font-medium w-full sm:w-auto"
          >
            Explore
          </Button>
        </div>
      </div>

      {/* Right image section */}
      <div className="flex-1 relative z-10 min-h-[300px] md:min-h-0">
        <img 
          src="/home/hero-image.png" 
          alt="Model wearing blue sweatshirt" 
          className="absolute bottom-0 right-0 md:top-[80px] h-full w-full object-contain rounded-[20px]"
        />
      </div>
    </div>
  )
}

export default Hero
