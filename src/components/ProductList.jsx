import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    categoryId: '',
    name: '',
    description: '',
    imageURL: '',
    price: '',
  });


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://ecommerce-backend-7jr9.onrender.com/product/');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const transformedData = data.map(product => ({
          id: product.id,
          img: product.imageURL,
          title: product.name,
          rating: 0,
          price: product.price,
          categoryId: product.categoryId,
          description: product.description,
        }));
        setProducts(transformedData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('https://ecommerce-backend-7jr9.onrender.com/catgory/list');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const email = localStorage.getItem('userEmail');
    setUserEmail(email);

    fetchProducts();
    fetchCategories();
  }, []);

  const handleAddProductClick = () => {
    setIsModalOpen(true);
    setIsEditMode(false);
    setNewProduct({
      categoryId: '',
      name: '',
      description: '',
      imageURL: '',
      price: '',
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = isEditMode
      ? `https://ecommerce-backend-7jr9.onrender.com/product/update/${selectedProduct.id}`
      : 'https://ecommerce-backend-7jr9.onrender.com/product/add';
    const method ='POST';

    try {
      const response = await fetch(apiUrl, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        console.log('Product successfully added/edited');
        setIsModalOpen(false);
        const response = await fetch('https://ecommerce-backend-7jr9.onrender.com/product/');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const transformedData = data.map(product => ({
          id: product.id,
          img: product.imageURL,
          title: product.name,
          rating: 0,
          price: product.price,
          categoryId: product.categoryId,
          description: product.description,
        }));
        setProducts(transformedData);
        // Optionally, refetch products or update state
      } else {
        throw new Error('Failed to add/edit product');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setIsEditMode(true);
    setNewProduct({
      categoryId: product.categoryId,
      name: product.title,
      description: product.description,
      imageURL: product.img,
      price: product.price,
    });
  };

  return (
    <>
      <Navbar products={products}/>
      <div className="mt-14 mb-12">
        <div className="container mx-auto">
          {/* Header */}
          <div className="relative flex justify-center items-center mb-10">
            <div className="text-center">
              <h1 className="text-3xl font-bold">All Products</h1>
              <p className="text-xs text-gray-400">
                Browse all available products.
              </p>
            </div>
            {userEmail === 'admin@example.com' && (
              <button
                onClick={handleAddProductClick}
                className="absolute right-0 bg-gradient-to-r from-primary to-secondary text-white py-2 px-4 rounded-full"
              >
                Add Products
              </button>
            )}
          </div>
          {/* Product Grid */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
              {products.map(product => (
                <div key={product.id} className="space-y-3 text-center">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.img}
                      alt={product.title}
                      className="h-[220px] w-[150px] object-cover rounded-md"
                    />
                    <div>
                      <h3 className="font-semibold">{product.title}</h3>
                      <h3 className="font-semibold">₹{product.price}</h3>
                      <div className="flex justify-center items-center gap-1">
                        <FaStar className="text-yellow-400" />
                        <FaStar className="text-yellow-400" />
                        <FaStar className="text-yellow-400" />
                        <FaStar className="text-yellow-400" />
                      </div>
                    </div>
                  </Link>
                  {userEmail === 'admin@example.com' && (
                    <button
                      onClick={() => handleEditProductClick(product)}
                      className="bg-blue-500 text-white py-1 px-3 rounded-full"
                    >
                      Edit
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Modal for Adding/Editing Product */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] sm:w-[500px] shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-center w-full">
                {isEditMode ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-black "
              >
                X
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 px-4">
              <div>
                <label className="block font-semibold">Category</label>
                <select
                  name="categoryId"
                  value={newProduct.categoryId}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                >
                  <option value="">Select a Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold">Description</label>
                <input
                  type="text"
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold">Image URL</label>
                <input
                  type="text"
                  name="imageURL"
                  value={newProduct.imageURL}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 object-contain"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold">Price</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-primary to-secondary text-white py-2 px-4 rounded-full"
                >
                  {isEditMode ? 'Update' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
