import React from "react";

type TagIconProps = {
  size?: number;
  color?: string;
  className?: string;
};

const TagIcon: React.FC<TagIconProps> = ({ size = 24, color = "white", className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="800 740 70 70"
    fill={color}
    className={className}
  >
    <path d="M835.076,810.757a2.911,2.911,0,0,1-2.508-1.437l-23.995-41.245a2.857,2.857,0,0,1-.37-1.173,2.735,2.735,0,0,1,.07-1.088l6.548-24.7a2.9,2.9,0,0,1,3.533-2.053l24.722,6.536a3.126,3.126,0,0,1,1.787,1.366l24,41.246a2.9,2.9,0,0,1-1.045,3.953l-31.293,18.205A2.865,2.865,0,0,1,835.076,810.757Zm-17.383-68.771-6.518,24.595,23.932,41.136,31.1-18.1-23.964-41.169.005.024-.011-.009Zm9.233,22.56a6.686,6.686,0,1,1,3.354-.906h0A6.659,6.659,0,0,1,826.926,764.546Zm-.018-10.381a3.691,3.691,0,1,0,1.862,6.881h0a3.691,3.691,0,0,0-1.863-6.881Z" />
  </svg>
);

export default TagIcon;
