import { useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation

type ArrowProps = {
  width?: number;
  height?: number;
  fillColor?: string;
};

const Arrow = ({
  width = 100,
  height = 50,
  fillColor = "black",
}: ArrowProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    // Redirect to another page when arrow is clicked
    navigate("/form");
  };
  return (
    <a href="/another-page" onClick={handleClick}>
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
