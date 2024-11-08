import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateTransactions() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    transactID: "",
    customerID: "",
    transactDate: "",
    transactTotal: "",
  });
  
  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // Create a new transaction object from the formData
    const newTransaction = {
      customerID: formData.customerID,
      transactDate: formData.transactDate,
      transactTotal: formData.transactTotal,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "transactions";
      const response = await axios.post(URL, newTransaction);
      if (response.status === 201) {
        navigate("/transactions");
      } else {
        alert("Error creating transaction");
      }
    } catch (error) {
      alert("Error creating transaction");
      console.error("Error creating transaction:", error);
    }
    // Reset the form fields
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      customerID: "",
      transactDate: "",
      transactTotal: "",
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
      <h2>Create Transactions</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="customerID">customerID</label>
        <input
          type="number"
          name="customerID"
          defaultValue={formData.customerID}
          onChange={handleInputChange}
        />
        <label htmlFor="transactDate">transactDate</label>
        <input
          type="text"
          name="transactDate"
          value={formData.transactDate}
          onChange={handleInputChange}
        />
        <label htmlFor="transactTotal">transactTotal</label>
        <input 
          type="text" 
          name="transactTotal" 
          value={formData.transactTotal} 
          onChange={handleInputChange} />
        <button type="submit">Create Transaction</button>
      </form>
    </>
  );
}

export default CreateTransactions;
