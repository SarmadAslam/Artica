import { useState, CSSProperties } from "react";
import PacmanLoader from "react-spinners/PacmanLoader"; // Assuming you want to use PacmanLoader

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red", // Customizable loader styling
};

interface PageLoaderProps {
  size?: number; // Optional size prop for loader size
  color?: string; // Optional color for the loader
  loading?: boolean; // External control of the loading state
  className?: string; // Additional class for custom styling
  style?: CSSProperties; // Custom inline styles
}

function PageLoader({
  size = 25, // Default size
  color = "#FFD700", // Default loader color (Warm Gold)
  loading = true, // Default loading state
  className = "",
  style = {},
}: PageLoaderProps) {
  return (
    <div className={`sweet-loading ${className}`} style={style}>
      <PacmanLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default PageLoader;