import React from "react";
import ImageComparison from "./ImageComparison";
import { GalleryImage } from "./ImageGallery";

interface ComparisonGalleryProps {
  images: GalleryImage[];
}

const ComparisonGallery: React.FC<ComparisonGalleryProps> = ({ images }) => {
  if (!images || images.length === 0) {
    return null;
  }

  const firstImage = images[0];

  return (
    <div className="my-12 max-w-4xl mx-auto w-full">
      <h2 className="text-3xl font-bold text-center text-text-primary mb-8">
        Gallery
      </h2>
      <div className="relative">
        <div className="aspect-video">
          <ImageComparison
            itemOne={firstImage.src}
            itemTwo={firstImage.src2}
            altOne={firstImage.alt}
            altTwo={firstImage.alt}
          />
        </div>
      </div>
    </div>
  );
};

export default ComparisonGallery;
