import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdateTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevTransaction = location.state.transaction;

  const [formData, setFormData] = useState({
    customerID: prevTransaction.customerID || '',
    transactDate: prevTransaction.transactDate || '',
    transactTotal: prevTransaction.transactTotal || '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function isUpdate(){
    // Check if formData is equal to prevTransaction
    if (JSON.stringify(formData) === JSON.stringify({
      customerID: prevTransaction.customerID || '',
      transactDate: prevTransaction.transactDate || '',
      transactTotal: prevTransaction.transactTotal || '',
    })) {
      alert("No changes made.");
      return false;
    }
    return true
  }

  const handleSubmit = async (event) => {
    // Stop default form behavior which is to reload the page
    event.preventDefault();
    // Check if formData is equal to prevTransaction
    if (isUpdate()){
      try {
        const URL = import.meta.env.VITE_API_URL + "transactions/" + id;
        const response = await axios.put(URL, formData);
        if (response.status !== 200) {
          alert("Error updating transaction");
        } else {
          alert(response.data.message);
          // Redirect to transactions page
          navigate("/transactions");
        }
      } catch (err) {
        console.log("Error updating transaction:", err);
      }
    }
  };

  return (
    <div>
      <h2>Update Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>customerID:</label>
          <input
            type="text"
            name="customerID"
            onChange={handleInputChange}
            required
            defaultValue={prevTransaction.customerID}
          />
        </div>
        <div>
          <label>transactDate:</label>
          <input
            type="number"
            name="transactDate"
            onChange={handleInputChange}
            required
            defaultValue={prevTransaction.transactDate}
          />
        </div>
        <div>
          <label>transactTotal:</label>
          <input
            type="decimal"
            name="transactTotal"
            onChange={handleInputChange}
            defaultValue={prevTransaction.transactTotal}
          />
        </div>
        <button type="button" onClick={() => navigate("/transactions")}>
          Cancel
        </button>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateTransaction;

