import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateCustomerProducts() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerID: "",
    productID: "",
    membershipID: "",
    quantity: "",
  });
  
  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // Create a new customerProduct object from the formData
    const newCustomerProduct = {
      customerID: formData.customerID,
      productID: formData.productID,
      membershipID: FormDataEvent.productID,
      quantity: formData.quantity,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "customerProducts";
      const response = await axios.post(URL, newCustomerProduct);
      if (response.status === 201) {
        navigate("/customerProducts");
      } else {
        alert("Error creating customerProduct");
      }
    } catch (error) {
      alert("Error creating customerProduct");
      console.error("Error creating customerProduct:", error);
    }
    // Reset the form fields
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      customerID: "",
      productID: "",
      membershipID: "",
      quantity: "",
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
      <h2>Create CustomerProducts</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="customerID">customerID</label>
        <input
          type="number"
          name="customerID"
          defaultValue={formData.customerID}
          onChange={handleInputChange}
        />
        <label htmlFor="productID">productID</label>
        <input
          type="text"
          name="productID"
          value={formData.productID}
          onChange={handleInputChange}
        />
        <label htmlFor="membershipID">membershipID</label>
        <input
          type="text"
          name="membershipID"
          value={formData.membershipID}
          onChange={handleInputChange}
        />
        <label htmlFor="quantity">quantity</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
        />
        <button type="submit">Create CustomerProduct</button>
      </form>
    </>
  );
}

export default CreateCustomerProducts;
