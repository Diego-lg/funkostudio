import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { CustomHandle } from "./CustomHandle";

interface ImageComparisonProps {
  itemOne: string;
  itemTwo: string;
  altOne?: string;
  altTwo?: string;
}

const ImageComparison = ({
  itemOne,
  itemTwo,
  altOne = "Image one",
  altTwo = "Image two",
}: ImageComparisonProps) => {
  return (
    <ReactCompareSlider
      handle={<CustomHandle />}
      itemOne={
        <ReactCompareSliderImage
          src={itemOne}
          alt={altOne}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      }
      itemTwo={
        <ReactCompareSliderImage
          src={itemTwo}
          alt={altTwo}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      }
      className="rounded-lg overflow-hidden w-full h-full"
    />
  );
};

export default ImageComparison;
