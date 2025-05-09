import PropTypes from "prop-types";
import { useState } from "react";

const Button = ({ text, onClick, className, variant, icon: Icon }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    onClick();
  };

  const baseClasses = "text-black cursor-pointer font-mediu py-1.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2";

  const variants = {
    primary: `bg-[#F35E21] text-white hover:bg-[#c33909]`,
    secondary: `hover:bg-[#7782FF] hover:text-white ${isClicked ? "bg-[#7782FF] text-white" : "bg-white text-[#7782FF] border border-[#7782FF]"}`,
    outline: ` hover:bg-gray-100 border border-[#E5E7EB]  `,
    danger: `hover:bg-red-600 hover:text-white ${isClicked ? "bg-red-600 text-white" : "bg-white text-red-600 border border-red-600"}`,
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={handleClick}
    >
      {Icon && <Icon />} {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "secondary", "outline", "danger"]),
};

Button.defaultProps = {
  onClick: () => {},
  className: "",
  variant: "primary",
};

export default Button;