import { HttpTypes } from "@medusajs/types"
import { Heading, Badge } from "@medusajs/ui"
import Link from "next/link"

import ProductPreview from "@modules/products/components/product-preview"
import { getProductsListWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"

// El número de productos a mostrar por página en el carrusel
const PRODUCTS_PER_SLIDE = 5

export default async function QualityDurability({
  countryCode,
}: {
  countryCode: string
}) {
  console.log('Rendering QualityDurability component with countryCode:', countryCode);
  
  // En un caso real, probablemente querrías obtener productos por una categoría específica
  const region = await getRegion(countryCode)
  
  if (!region) {
    console.error('QualityDurability: Region not found');
    return null
  }
  
  console.log('QualityDurability: Region found:', region.id);

  // Intenta obtener todos los productos sin filtrar por categoría
  const queryParams = {
    limit: 10,
    // No filtramos por categoría por ahora para ver si hay productos disponibles
  }
  
  try {
    console.log('QualityDurability: Fetching products...');
    const { response } = await getProductsListWithSort({
      page: 1,
      queryParams,
      sortBy: "created_at",
      countryCode,
    })
    
    const products = response.products
    console.log(`QualityDurability: Found ${products?.length || 0} products`);
    
    if (!products || products.length === 0) {
      console.error('QualityDurability: No products found');
      return null
    }

    return (
      <div className="bg-white py-16 border-t border-gray-200">
        <div className="content-container">
          <div className="flex justify-between items-center mb-10">
            <Heading className="text-3xl font-bold" level="h2">Quality and durability</Heading>
            <div className="flex space-x-2">
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Carrusel de productos */}
          <div className="overflow-hidden">
            <ul className="grid grid-cols-1 small:grid-cols-3 medium:grid-cols-5 gap-6">
              {products.slice(0, PRODUCTS_PER_SLIDE).map((product, index) => (
                <li key={product.id} className="group relative">
                  {index === 1 || index === 3 ? (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-red-500 text-white">-15%</Badge>
                    </div>
                  ) : null}
                  <div className="aspect-square">
                    <ProductPreview product={product} region={region} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('QualityDurability: Error fetching products:', error);
    return null;
  }
} 