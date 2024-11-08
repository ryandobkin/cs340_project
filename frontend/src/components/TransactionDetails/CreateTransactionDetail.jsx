import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateTransactionDetails() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    transactID: "",
    productID: "",
    membershipID: "",
    unitPrice: "",
    orderQty: "",
    orderTotal: "",
  });
  
  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // Create a new transactionDetails object from the formData
    const newTransactionDetails = {
      name: formData.name,
      population: formData.population,
      language: formData.language,
      capital: formData.capital,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "transactionDetails";
      const response = await axios.post(URL, newTransactionDetails);
      if (response.status === 201) {
        navigate("/transactionDetails");
      } else {
        alert("Error creating transactionDetails");
      }
    } catch (error) {
      alert("Error creating transactionDetails");
      console.error("Error creating transactionDetails:", error);
    }
    // Reset the form fields
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      transactID: "",
      productID: "",
      membershipID: "",
      unitPrice: "",
      orderQty: "",
      orderTotal: "",
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
      <h2>Create BSG TransactionDetails</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="transactID">transactID</label>
        <input
          type="text"
          name="transactID"
          defaultValue={formData.transactID}
          onChange={handleInputChange}
        />
        <label htmlFor="productID">productID</label>
        <input
          type="number"
          name="productID"
          defaultValue={formData.productID}
          onChange={handleInputChange}
        />
        <label htmlFor="membershipID">membershipID</label>
        <input
          type="text"
          name="membershipID"
          value={formData.membershipID}
          onChange={handleInputChange}
        />
        <label htmlFor="unitPrice">unitPrice</label>
        <input
          type="text"
          name="unitPrice"
          value={formData.unitPrice}
          onChange={handleInputChange}
        />
        <label htmlFor="orderQty">orderQty</label>
        <input
          type="text"
          name="orderQty"
          value={formData.orderQty}
          onChange={handleInputChange}
        />
        <label htmlFor="orderTotal">orderTotal</label>
        <input
          type="text"
          name="orderTotal"
          value={formData.orderTotal}
          onChange={handleInputChange}
        />
        <button type="submit">Create TransactionDetails</button>
      </form>
    </>
  );
}

export default CreateTransactionDetails;
