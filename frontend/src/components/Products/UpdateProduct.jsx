import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevProduct = location.state.product;

  const [formData, setFormData] = useState({
    productName: prevProduct.productName || '',
    productPrice: prevProduct.productPrice || '',
    productCost: prevProduct.productCost || '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function isUpdate(){
    // Check if formData is equal to prevProduct
    if (JSON.stringify(formData) === JSON.stringify({
      productName: prevProduct.productName || '',
      productPrice: prevProduct.productPrice || '',
      productCost: prevProduct.productCost || '',
    })) {
      alert("No changes made.");
      return false;
    }
    return true
  }

  const handleSubmit = async (event) => {
    // Stop default form behavior which is to reload the page
    event.preventDefault();
    // Check if formData is equal to prevProduct
    if (isUpdate()){
      try {
        const URL = import.meta.env.VITE_API_URL + "products/" + id;
        const response = await axios.put(URL, formData);
        if (response.status !== 200) {
          alert("Error updating product");
        } else {
          alert(response.data.message);
          // Redirect to products page
          navigate("/products");
        }
      } catch (err) {
        console.log("Error updating product:", err);
      }
    }
  };

  return (
    <div>
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>productName:</label>
          <input
            type="text"
            name="productName"
            onChange={handleInputChange}
            required
            defaultValue={prevProduct.productName}
          />
        </div>
        <div>
          <label>productPrice:</label>
          <input
            type="number"
            name="productPrice"
            onChange={handleInputChange}
            required
            defaultValue={prevProduct.productPrice}
          />
        </div>
        <div>
          <label>productCost:</label>
          <input
            type="text"
            name="productCost"
            onChange={handleInputChange}
            defaultValue={prevProduct.productCost}
          />
        </div>
        <button type="button" onClick={() => navigate("/products")}>
          Cancel
        </button>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateProduct;

