'use client'
import { Button } from "@medusajs/ui"

const TrainingAd = () => {
  return (
    <div className="w-full max-w-[1280px] mx-auto my-16 px-4">
      <div className="relative rounded-lg overflow-hidden">
        {/* Imagen de fondo */}
        <img 
          src="/home/training-goalkeeper.png" 
          alt="NG Training Soccer" 
          className="w-full h-[500px] object-cover object-[center_35%]"
        />
        
        {/* Contenido superpuesto */}
        <div className="absolute inset-0 flex flex-col justify-start pt-32 p-8 bg-black/10">
          <div className="max-w-[600px]">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              NG Training Soccer
            </h2>
            <p className="text-xl md:text-2xl text-white mb-6">
              Save your place
            </p>
            
            {/* Formulario */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow px-4 py-2 rounded-md bg-white text-black"
              />
              <Button 
                className="bg-black text-white px-6 py-2 rounded-md hover:bg-black/80"
                onClick={() => {
                  // Aquí irá la lógica para enviar el email
                  console.log("Email sent")
                }}
              >
                Send email
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrainingAd
