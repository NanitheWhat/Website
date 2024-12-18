import React from "react";
import { useTheme } from "next-themes";
import data from "../../data/portfolio.json";

const Button2 = ({ children, type, onClick, classes }) => {
  const { theme } = useTheme(); // Get the current theme

  const baseClasses = `
    text-base tablet:text-xl laptop:text-2xl  // Increased font sizes
    p-4 tablet:p-5 laptop:p-6  // Increased padding
    m-2 tablet:m-3 laptop:m-4  // Increased margins
    rounded-xl  // Increased border radius
    transition-all ease-out duration-300 
    hover:scale-105 active:scale-100 
    ${data.showCursor && "cursor-none"}
    ${classes}
  `;

  if (type === "primary") {
    return (
      <button
        onClick={onClick}
        type="button"
        className={`
          ${baseClasses}
          bg-gradient-orange  // Apply the custom gradient class
          hover:bg-slate-300 
          ${theme === "light" ? "text-black" : "dark:text-white"}
          link
        `}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={`
        ${baseClasses}
        flex items-center
        bg-gradient-orange  // Apply the custom gradient class
        hover:bg-slate-100 
        ${theme === "light" 
          ? "text-black" 
          : "dark:text-white dark:hover:bg-slate-600"
        }
        link
      `}
    >
      {children}
    </button>
  );
};

export default Button2;
