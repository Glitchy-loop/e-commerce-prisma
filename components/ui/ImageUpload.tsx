"use client"

import { useEffect, useState } from "react"
import { Button } from "./button"
import { ImagePlus, Trash } from "lucide-react"
import Image from "next/image"
import { CldUploadWidget } from "next-cloudinary"

interface ImageUploadProps {
  disabled: boolean
  onChange: (value: string[]) => void // Expecting an array of URLs
  onRemove: (value: string) => void
  value: string[] // Array of URLs
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<string[]>(value)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const onUpload = (result: any) => {
    if (result?.info?.secure_url) {
      const newImageUrl = result.info.secure_url
      setUploadedImages((prevImages) => {
        const updatedImageUrls = [...prevImages, newImageUrl]

        onChange(updatedImageUrls) // Pass the updated array of URLs

        return updatedImageUrls
      })
    }
  }

  if (!isMounted) {
    return null
  }

  return (
    <div>
      <div className="mt-4 flex items-center gap-4">
        {uploadedImages.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => {
                  setUploadedImages((prevImages) => {
                    const updatedImageUrls = prevImages.filter(
                      (imageUrl) => imageUrl !== url
                    )
                    onChange(updatedImageUrls) // Pass the updated array of URLs
                    return updatedImageUrls
                  })
                  onRemove(url)
                }}
                variant="destructive"
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget
        onSuccess={onUpload}
        uploadPreset="ecommerce"
        options={{
          multiple: true, // Enable multiple file uploads
        }}
      >
        {({ open }) => {
          const onClick = () => {
            open()
          }

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}

export default ImageUpload
