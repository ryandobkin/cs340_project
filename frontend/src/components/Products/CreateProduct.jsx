import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateProducts() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    productCost: "",
  });
  
  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // Create a new product object from the formData
    const newProduct = {
      productName: FormData.productName,
      productPrice: FormData.productPrice,
      productCost: FormData.productCost,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "products";
      const response = await axios.post(URL, newProduct);
      if (response.status === 201) {
        navigate("/products");
      } else {
        alert("Error creating product");
      }
    } catch (error) {
      alert("Error creating product");
      console.error("Error creating product:", error);
    }
    // Reset the form fields
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      productName: "",
      productPrice: "",
      productCost: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <h2>Create Products</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="productName">productName</label>
        <input
          type="text"
          name="productName"
          defaultValue={formData.productName}
          onChange={handleInputChange}
        />
        <label htmlFor="productPrice">productPrice</label>
        <input
          type="number"
          name="productPrice"
          defaultValue={formData.productPrice}
          onChange={handleInputChange}
        />
        <label htmlFor="productCost">productCost</label>
        <input
          type="text"
          name="productCost"
          value={formData.productCost}
          onChange={handleInputChange}
        />
        <button type="submit">Create Product</button>
      </form>
    </>
  );
}

export default CreateProducts;
