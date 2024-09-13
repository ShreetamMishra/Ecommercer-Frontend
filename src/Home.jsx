import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TopProducts from './components/TopProducts'
import AOS from "aos"
import "aos/dist/aos.css"
import Categories from './components/Categories'
import Footer from './components/Footer'
const Home = ({ userEmail, isLoggedIn, setUserEmail, setIsLoggedIn }) => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  console.log("get",userEmail)
  return (
    <div>
      {/* Pass props to Navbar */}
      <Navbar 
        userEmail={userEmail} 
        isLoggedIn={isLoggedIn} 
        setUserEmail={setUserEmail} 
        setIsLoggedIn={setIsLoggedIn} 
      />
     <Hero/>
      <TopProducts/>
      <Categories/>
      <Footer/>
    </div>
  );
};

export default Home;
