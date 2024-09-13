import React from "react";
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
import Logo from "../assets/logooo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-16 ">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-4 gap-8">
        {/* Left section: Logo and Company Details */}
        <div className="space-y-3 sm:space-y-3 sm:items-start sm:text-left text-center flex flex-col items-center">
          <img src={Logo} alt="Company Logo" className="h-12 w-auto" />
          <p className="text-sm text-gray-400 max-w-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Middle section: Useful Links */}
        <div className="space-y-3 text-center ">
          <h2 className="text-lg font-bold">Useful Links</h2>
          <ul className="space-y-2">
            <li><a href="/#" className="text-gray-400 hover:text-white">About Us</a></li>
            <li><a href="/#" className="text-gray-400 hover:text-white">Services</a></li>
            <li><a href="/#" className="text-gray-400 hover:text-white">Contact Us</a></li>
            <li><a href="/#" className="text-gray-400 hover:text-white">Careers</a></li>
          </ul>
        </div>

        {/* Middle section: Categories */}
        <div className="space-y-3 text-center ">
          <h2 className="text-lg font-bold">Categories</h2>
          <ul className="space-y-2">
            <li><a href="/#" className="text-gray-400 hover:text-white">Top Rated</a></li>
            <li><a href="/#" className="text-gray-400 hover:text-white">Kids Wear</a></li>
            <li><a href="/#" className="text-gray-400 hover:text-white">Mens Wear</a></li>
            <li><a href="/#" className="text-gray-400 hover:text-white">Women Wear</a></li>
          </ul>
        </div>

        {/* Right section: Social Media Links */}
        <div className="space-y-3 text-center ">
          <h2 className="text-lg font-bold">Follow Us</h2>
          <div className="flex justify-center space-x-4">
            <a href="https://www.instagram.com/___pradhanji___/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-2xl hover:text-primary" />
            </a>
            <a href="https://x.com/Bhabesh57492327" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-2xl hover:text-primary" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100093999346351" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="text-2xl hover:text-primary" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;