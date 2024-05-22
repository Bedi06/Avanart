import React from 'react';
import { useNavigate } from "react-router-dom";

type ArrowProps = {
  width?: number;
  height?: number;
  fillColor?: string;
  onCaptureAvatar: () => void; // Add a new prop for capturing avatar image
};

const Arrow = ({
  width = 100,
  height = 50,
  fillColor = "black",
  onCaptureAvatar,
}: ArrowProps) => {
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    onCaptureAvatar(); // Capture the avatar image
    navigate("/form");
  };

  return (
    <a href="/form" onClick={handleClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 25 25"
        width={width}
        height={height}
        fill={fillColor}
        className="animate-right"
      >
        <path
          style={{ fill: fillColor }}
          d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z"
          data-name="Right"
        />
      </svg>
    </a>
  );
};

export default Arrow;
