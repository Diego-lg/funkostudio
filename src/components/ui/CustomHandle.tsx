import { ReactCompareSliderHandleProps } from "react-compare-slider";

export const CustomHandle = ({
  style,
  ...props
}: ReactCompareSliderHandleProps) => {
  return (
    <div
      {...props}
      className="w-12 h-12 rounded-full bg-secondary/80 backdrop-blur-sm border-2 border-accent/50 text-white flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent"
      style={style}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
        />
      </svg>
    </div>
  );
};
