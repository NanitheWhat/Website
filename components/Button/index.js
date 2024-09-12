import React from "react";
import { useTheme } from "next-themes";
import data from "../../data/portfolio.json";

const Button = ({ children, type, onClick, classes }) => {
  const { theme } = useTheme(); // Get the current theme

  if (type === "primary") {
    return (
      <button
        onClick={onClick}
        type="button"
        className={`text-sm hover:scale-105 active:scale-100 tablet:first:ml-0 hover:bg-slate-300 dark:text-white tablet:text-base p-2 m-10 laptop:m-2 rounded-lg border-none duration-300 first:ml-0 hover:scale-105 active:scale-100 link ${
          theme === "dark"
          ? ""
          : ""
        } ${
          data.showCursor && "cursor-none"
        } ${
          theme === "light" ? "bg-white text-black" : "dark:bg-gray-800 dark:text-white"
        } ${classes}`}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={`text-sm tablet:text-base p-2 m-1 laptop:m-2 rounded-lg flex items-center transition-all ease-out duration-300 hover:scale-105 active:scale-100 tablet:first:ml-0 ${
        theme === "light" ? "bg-white text-black hover:bg-slate-100" : "dark:bg-gray-800 dark:text-white dark:hover:bg-slate-600"
      } ${
        data.showCursor && "cursor-none"
      } ${classes} link`}
    >
      {children}
    </button>
  );
};

export default Button;
