import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const lightColors = {
    primary: "#4caf50",
    background: "#f4f9fd",
    graphBackground: "#003e29",
    button: "#5cb25d",
    text: "black",
    card: "white",
    border: "gray",
  };

  const darkColors = {
    primary: "#4caf50",
    background: "#111111",
    graphBackground: "black",
    button: "black",
    text: "white",
    card: "black",
    border: "gray",
  };

  const colors = theme === "light" ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
