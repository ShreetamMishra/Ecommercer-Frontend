import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams} from 'react-router-dom';
import Navbar from './Navbar';

const CategoryProducts = () => {
  const { categoryId } = useParams();
  console.log(categoryId);
  const navigate = useNavigate();
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
        const response = await axios.get('https://ecommerce-backend-7jr9.onrender.com/product/');
        const filteredProducts = response.data.filter(
          (product) => product.categoryId === parseInt(categoryId)
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://ecommerce-backend-7jr9.onrender.com/catgory/list');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const email = localStorage.getItem('userEmail');
    setUserEmail(email);

    fetchProducts();
    fetchCategories();
  }, [categoryId]);

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

  const handleEditProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setIsEditMode(true);
    setNewProduct({
      categoryId: product.categoryId,
      name: product.name,
      description: product.description,
      imageURL: product.imageURL,
      price: product.price,
    });
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
    const method = 'POST';

    try {
      await axios({
        method: method,
        url: apiUrl,
        headers: {
          'Content-Type': 'application/json',
        },
        data: newProduct,
      });

      setIsModalOpen(false);
      // Refresh the products list
      const response = await axios.get('https://ecommerce-backend-7jr9.onrender.com/product/');
      const filteredProducts = response.data.filter(
        (product) => product.categoryId === parseInt(categoryId)
      );
      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10">
        <div className="relative flex justify-center items-center mb-10">
         
          {userEmail === 'admin@example.com' && (
            <button
              onClick={handleAddProductClick}
              className="absolute right-0 bg-gradient-to-r from-primary to-secondary text-white py-2 px-4 rounded-full"
            >
              Add Product
            </button>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg p-4">
              <img
                src={product.imageURL}
                alt={product.name}
                className="h-48 w-full object-contain mb-4"
              />
               <div className='flex justify-center'>
              <h3 className="font-bold text-lg">{product.name}</h3></div>
              <div className='flex justify-center'>
              <p className="text-gray-600">{product.description}</p></div>
              <div className='flex justify-center'>
              <p className="text-lg font-semibold">₹{product.price}</p> </div>
              {userEmail === 'admin@example.com' && (
                <div className='flex justify-center'>
                <button
                  onClick={() => handleEditProductClick(product)}
                  className="bg-blue-500 text-white py-1 px-3 mt-3 rounded-full"
                >
                  Edit
                </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Adding/Editing Product */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] sm:w-[500px] shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {isEditMode ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-black">
                X
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                  className="w-full border border-gray-300 rounded-md p-2"
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
                <button type="submit" className="bg-gradient-to-r from-primary to-secondary text-white py-2 px-4 rounded-full">
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

export default CategoryProducts;
