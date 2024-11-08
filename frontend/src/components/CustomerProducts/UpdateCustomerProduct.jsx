import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdateCustomerProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevCustomerProduct = location.state.customerProduct;

  const [formData, setFormData] = useState({
    customerID: prevCustomerProduct.customerID || '',
    productID: prevCustomerProduct.productID || '',
    membershipID: prevCustomerProduct.membershipID || '',
    quantity: prevCustomerProduct.quantity || '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function isUpdate(){
    // Check if formData is equal to prevCustomerProduct
    if (JSON.stringify(formData) === JSON.stringify({
      customerID: prevCustomerProduct.customerID || '',
      productID: prevCustomerProduct.productID || '',
      membershipID: prevCustomerProduct.membershipID || '',
      quantity: prevCustomerProduct.quantity || '',
    })) {
      alert("No changes made.");
      return false;
    }
    return true
  }

  const handleSubmit = async (event) => {
    // Stop default form behavior which is to reload the page
    event.preventDefault();
    // Check if formData is equal to prevCustomerProduct
    if (isUpdate()){
      try {
        const URL = import.meta.env.VITE_API_URL + "customerProducts/" + id;
        const response = await axios.put(URL, formData);
        if (response.status !== 200) {
          alert("Error updating customerProduct");
        } else {
          alert(response.data.message);
          // Redirect to customerProducts page
          navigate("/customerProducts");
        }
      } catch (err) {
        console.log("Error updating customerProduct:", err);
      }
    }
  };

  return (
    <div>
      <h2>Update CustomerProduct</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>customerID:</label>
          <input
            type="number"
            name="customerID"
            onChange={handleInputChange}
            required
            defaultValue={prevCustomerProduct.customerID}
          />
        </div>
        <div>
          <label>productID:</label>
          <input
            type="text"
            name="productID"
            onChange={handleInputChange}
            defaultValue={prevCustomerProduct.productID}
          />
        </div>
        <div>
          <label>membershipID:</label>
          <input
            type="text"
            name="membershipID"
            onChange={handleInputChange}
            required
            defaultValue={prevCustomerProduct.membershipID}
          />
        </div>
        <div>
          <label>quantity:</label>
          <input
            type="text"
            name="quantity"
            onChange={handleInputChange}
            required
            defaultValue={prevCustomerProduct.quantity}
          />
        </div>
        <button type="button" onClick={() => navigate("/customerProducts")}>
          Cancel
        </button>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateCustomerProduct;

