import { CSSProperties, ReactNode } from "react";
import BeatLoader from "react-spinners/BeatLoader"; // Import BeatLoader

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

interface ButtonLoaderProps {
  size?: number;
  color?: string;
  loadingText?: string;
  loading?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

function ButtonLoader({
  size = 10,
  color = "#421983", // Default loader color (Warm Gold)
  loadingText = "Loading...",
  loading = false,
  children,
  className = "",
  style = {},
}: ButtonLoaderProps) {
  return (
    <button
      className={`relative ${className}`}
      style={{ position: "relative", ...style }}
      disabled={loading}
    >
      {loading && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 1 }}
        >
          <BeatLoader
            color={color}
            loading={loading}
            size={size}
            cssOverride={override}
          />
          <span style={{ marginLeft: "10px" }}>{loadingText}</span>
        </div>
      )}
      <div style={{ visibility: loading ? "hidden" : "visible" }}>
        {children}
      </div>
    </button>
  );
}

export default ButtonLoader;
