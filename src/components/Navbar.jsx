import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logooo from "../assets/logooo.png";
import { IoMdSearch } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import axios from 'axios';
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
const Menu = [
  { id: 1, name: "Home", link: "/" }
];

const Navbar = () => {
  const navigate = useNavigate();
 
  const [userEmail, setUserEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [token] = useState(localStorage.getItem('token'));
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]); // To store all products
  const [filteredProducts, setFilteredProducts] = useState([]); // To store filtered products
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (token && email) {
      setUserEmail(email);
      setIsLoggedIn(true);
    }

    // Fetch all products and cart items count
    const fetchData = async () => {
      if (token) {
        try {
          const [productsResponse, cartResponse] = await Promise.all([
            axios.get('https://ecommerce-backend-7jr9.onrender.com/product/'), // Fetch all products
            axios.get(`https://ecommerce-backend-7jr9.onrender.com/cart/?token=${token}`) // Fetch cart items
          ]);

          setProducts(productsResponse.data); // Store all products
          setCartItems(cartResponse.data.cartItems); // Store cart items
        } catch (err) {
          console.error('Error fetching data:', err);
        }
      }
    };

    fetchData();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserEmail('');
    navigate('/'); // Redirect to home after logout
  };

  const handleSignin = () => {
    navigate("/signin");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const goToDashboard = () => {
    navigate("/product-list");
  };

  const goToCategory = () => {
    navigate("/category-list");
  };

  const goToCart = () => {
    navigate("/cart");
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.length > 1) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]); // Clear results if query is too short
    }
  };

  const handleProductClick = (productId) => {
    setSearchQuery('');
    setFilteredProducts([]);
    navigate(`/product/${productId}`);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      {/* Upper Navbar */}
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          <div>
            <a onClick={() => navigate("/")} className="font-bold text-2xl sm:text-3xl flex gap-2 cursor-pointer">
              <img src={logooo} alt="Logo" className="w-10" />
             
            </a>
          </div>

          {/* Search bar and other elements */}
          <div className='flex justify-between items-center gap-4 relative'>
            <div className='relative group hidden sm:block'>
              <input
                type="text"
                placeholder='Search...'
                value={searchQuery}
                onChange={handleSearchChange}
                className='w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-10 py-1 focus:outline-none focus:border-primary dark:border-gray-500 dark:bg-gray-800'
              />
              <IoMdSearch className='text-gray-500 group-hover:text-primary absolute top-1/2 transform -translate-y-1/2 right-3' />

              {/* Search Results Dropdown */}
              {filteredProducts.length > 0 && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg w-[300px] max-h-[300px] overflow-y-auto z-50 dark:bg-gray-800 dark:text-white">
                  {filteredProducts.map(product => (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-xs text-gray-400 dark:text-gray-300">{product.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={goToCart}
              className='bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 relative'
            >
              <FaShoppingCart className='text-xl text-white drop-shadow-sm cursor-pointer' />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-gray-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Hamburger Icon for mobile screens */}
            <button onClick={toggleMobileMenu} className="sm:hidden block">
              {mobileMenuOpen ? (
                <HiX className="text-2xl text-white" /> // Close icon
              ) : (
                <HiOutlineMenuAlt3 className="text-2xl text-white" /> // Hamburger icon
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Lower Navbar */}
      <div className="hidden sm:flex justify-center">
        <ul className="sm:flex hidden items-center gap-4">
          {isLoggedIn && userEmail === "admin@example.com" ? (
            <>
              <li>
                <a href="/#" className="inline-block px-4 hover:text-primary duration-200">Home</a>
              </li>
              <li>
                <button onClick={goToDashboard} className="inline-block px-4 hover:text-primary duration-200">Products</button>
              </li>
              <li>
                <button onClick={goToCategory} className="inline-block px-4 hover:text-primary duration-200">Categories</button>
              </li>
              <li>
                <button onClick={handleLogout} className="px-4 py-2 hover:text-primary duration-200">Signout</button>
              </li>
            </>
          ) : (
            <>
              {Menu.map((data) => (
                <li key={data.id}>
                  <a href={data.link} className="inline-block px-4 hover:text-primary duration-200">
                    {data.name}
                  </a>
                </li>
              ))}
              {!isLoggedIn ? (
                <>
                  <li>
                    <button onClick={handleSignin} className="px-4 py-2 hover:text-primary duration-200">Signin</button>
                  </li>
                  <li>
                    <button onClick={handleSignup} className="inline-block px-4 hover:text-primary duration-200">Signup</button>
                  </li>
                </>
              ) : (
                <li>
                  <button onClick={handleLogout} className="px-4 py-2 hover:text-primary duration-200">Signout</button>
                </li>
              )}
            </>
          )}
        </ul>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full right-0 bg-white dark:bg-gray-800 shadow-lg z-50 rounded-lg w-[200px] transition-transform transform origin-top duration-300">
          <div className="flex flex-col items-center py-4">
            {isLoggedIn && userEmail === "admin@example.com" ? (
              <>
                <a href="/#" className="block px-4 py-2 hover:text-primary duration-200 border-b border-gray-300">Home</a>
                <button onClick={goToDashboard} className="block px-4 py-2 hover:text-primary duration-200 border-b border-gray-300">Products</button>
                <button onClick={goToCategory} className="block px-4 py-2 hover:text-primary duration-200 border-b border-gray-300">Categories</button>
                <button onClick={handleLogout} className="block px-4 py-2 hover:text-primary duration-200 border-b border-gray-300">Signout</button>
              </>
            ) : (
              <>
                {Menu.map((data) => (
                  <a key={data.id} href={data.link} className="block px-4 py-2 hover:text-primary duration-200 border-b border-gray-300">
                    {data.name}
                  </a>
                ))}
                {!isLoggedIn ? (
                  <>
                    <button onClick={handleSignin} className="block px-4 py-2 hover:text-primary duration-200 border-b border-gray-300">Signin</button>
                    <button onClick={handleSignup} className="block px-4 py-2 hover:text-primary duration-200 border-b border-gray-300">Signup</button>
                  </>
                ) : (
                  <button onClick={handleLogout} className="block px-4 py-2 hover:text-primary duration-200 border-b border-gray-300">Signout</button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;