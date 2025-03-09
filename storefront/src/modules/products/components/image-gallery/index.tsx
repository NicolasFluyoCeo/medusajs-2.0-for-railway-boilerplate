"use client"

import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"
import { useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  if (!images.length) {
    return null
  }

  return (
    <div className="flex flex-col items-start relative gap-y-4">
      {/* Imagen principal */}
      <Container
        className="relative aspect-[29/34] w-full overflow-hidden bg-ui-bg-subtle"
        id={images[selectedImageIndex]?.id}
      >
        {!!images[selectedImageIndex]?.url && (
          <Image
            src={images[selectedImageIndex].url}
            priority={true}
            className="absolute inset-0 rounded-rounded"
            alt={`Product image ${selectedImageIndex + 1}`}
            fill
            sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
            style={{
              objectFit: "cover",
            }}
          />
        )}
      </Container>

      {/* Cuadrícula de miniaturas */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 w-full">
          {images.map((image, index) => {
            return (
              <div
                key={image.id}
                className={`relative aspect-square cursor-pointer overflow-hidden rounded-md ${
                  selectedImageIndex === index
                    ? "ring-2 ring-ui-border-interactive"
                    : "hover:opacity-75"
                }`}
                onClick={() => setSelectedImageIndex(index)}
              >
                {!!image.url && (
                  <Image
                    src={image.url}
                    className="absolute inset-0"
                    alt={`Product thumbnail ${index + 1}`}
                    fill
                    sizes="100px"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ImageGallery
