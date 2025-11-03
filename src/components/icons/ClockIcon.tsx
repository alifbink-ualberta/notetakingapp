import React from "react";

type ClockIconProps = {
  size?: number;       // Optional size (in pixels)
  color?: string;      // Optional stroke color
  className?: string;  // Optional CSS class
};

const ClockIcon: React.FC<ClockIconProps> = ({
  size = 24,
  color = "currentColor",
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 192 192"
    width={size}
    height={size}
    fill="none"
    className={className}
  >
    <g transform="translate(16 16)">
      <circle
        cx="80"
        cy="80"
        r="74"
        stroke={color}
        strokeWidth="12"
        strokeLinejoin="round"
      />
      <path
        d="M80 30v50l40 32"
        stroke={color}
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

export default ClockIcon;