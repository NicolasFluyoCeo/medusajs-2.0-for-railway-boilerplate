import { Text } from "@medusajs/ui"

const BestSellerSection = () => {
  return (
    <div className="content-container py-12 small:py-24 bg-green-500/20">
      <Text className="txt-xlarge mb-8">Quality and durability</Text>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Add your glove product cards here */}
        {Array.from(Array(5)).map((_, i) => (
          <div key={i} className="aspect-[1/1] relative">
            <img 
              src={`/glove-${i + 1}.jpg`}
              alt={`Goalkeeper glove ${i + 1}`}
              className="absolute inset-0 object-cover w-full h-full rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default BestSellerSection