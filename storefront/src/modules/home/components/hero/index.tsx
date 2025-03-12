import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"

const Hero = () => {
  return (
    <div 
      className="w-full border-b border-ui-border-base relative bg-black text-white min-h-[600px]"
      style={{
        backgroundImage: "url('/hero-image.png')",
        backgroundSize: "auto 50%",
        backgroundPosition: "center left 20%",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="absolute inset-0 md:hidden bg-black opacity-80"></div>
      
      <div className="container mx-auto h-full relative flex flex-col md:flex-row items-center justify-between py-12">
        <div className="w-full md:w-1/2 mb-8 md:mb-0 z-10">
          {/* Espacio vacío en el lado izquierdo */}
        </div>
        
        <div className="w-full md:w-1/2 flex justify-center md:justify-end md:pr-8 z-10">
          <div 
            className="bg-gradient-to-b from-blue-900 to-purple-900 rounded-lg overflow-hidden shadow-lg" 
            style={{ 
              maxWidth: "100%", 
              width: "420px",
              height: "550px",
              maxHeight: "85vh"
            }}
          >
            <img 
              src="/person.png" 
              alt="Person" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
