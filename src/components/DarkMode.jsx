import React from 'react'
import DarkModee from "../assets/Darkmode.png"
import LightMode from "../assets/Lightmode.png"

const DarkMode = () => {
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const element = document.documentElement
  React.useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);
  return (
    <div className='relative'>
      <img src={LightMode}
        alt=""
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className={`w-12 cursor-pointer drop-shadow-sm transition-all duration-300 absolute right-0 z-10 ${theme === "dark" ? "opacity-0" : "opacity-100"}`}
      />
      <img src={DarkModee}
        alt=""
        
        className='w-12 cursor-pointer drop-shadow-sm transition-all duration-300'
      />
    </div>
  )
}

export default DarkMode