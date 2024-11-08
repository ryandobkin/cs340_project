import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdateTransactionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevTransactionDetails = location.state.transactionDetails;

  const [formData, setFormData] = useState({
    transactID: prevTransactionDetails.transactID || '',
    productID: prevTransactionDetails.productID || '',
    membershipID: prevTransactionDetails.membershipID || '',
    unitPrice: prevTransactionDetails.unitPrice || '',
    orderQty: prevTransactionDetails.orderQty || '',
    orderTotal: prevTransactionDetails.orderTotal || '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function isUpdate(){
    // Check if formData is equal to prevTransactionDetails
    if (JSON.stringify(formData) === JSON.stringify({
      transactID: prevTransactionDetails.transactID || '',
      productID: prevTransactionDetails.productID || '',
      membershipID: prevTransactionDetails.membershipID || '',
      unitPrice: prevTransactionDetails.unitPrice || '',
      orderQty: prevTransactionDetails.orderQty || '',
      orderTotal: prevTransactionDetails.orderTotal || '',
    })) {
      alert("No changes made.");
      return false;
    }
    return true
  }

  const handleSubmit = async (event) => {
    // Stop default form behavior which is to reload the page
    event.preventDefault();
    // Check if formData is equal to prevTransactionDetails
    if (isUpdate()){
      try {
        const URL = import.meta.env.VITE_API_URL + "transactionDetails/" + id;
        const response = await axios.put(URL, formData);
        if (response.status !== 200) {
          alert("Error updating transactionDetails");
        } else {
          alert(response.data.message);
          // Redirect to transactionDetails page
          navigate("/transactionDetails");
        }
      } catch (err) {
        console.log("Error updating transactionDetails:", err);
      }
    }
  };

  return (
    <div>
      <h2>Update TransactionDetails</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>transactID:</label>
          <input
            type="text"
            name="transactID"
            onChange={handleInputChange}
            required
            defaultValue={prevTransactionDetails.transactID}
          />
        </div>
        <div>
          <label>productID:</label>
          <input
            type="number"
            name="productID"
            onChange={handleInputChange}
            required
            defaultValue={prevTransactionDetails.productID}
          />
        </div>
        <div>
          <label>membershipID:</label>
          <input
            type="text"
            name="membershipID"
            onChange={handleInputChange}
            defaultValue={prevTransactionDetails.membershipID}
          />
        </div>
        <div>
          <label>unitPrice:</label>
          <input
            type="text"
            name="unitPrice"
            onChange={handleInputChange}
            required
            defaultValue={prevTransactionDetails.unitPrice}
          />
        </div>
        <div>
          <label>orderQty:</label>
          <input
            type="text"
            name="orderQty"
            onChange={handleInputChange}
            required
            defaultValue={prevTransactionDetails.orderQty}
          />
        </div>
        <div>
          <label>orderTotal:</label>
          <input
            type="text"
            name="orderTotal"
            onChange={handleInputChange}
            required
            defaultValue={prevTransactionDetails.orderTotal}
          />
        </div>
        <button type="button" onClick={() => navigate("/transactionDetails")}>
          Cancel
        </button>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateTransactionDetails;

