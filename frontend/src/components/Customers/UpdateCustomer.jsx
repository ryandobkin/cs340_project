import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdateCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevCustomer = location.state.customer;

  const [formData, setFormData] = useState({
    membershipID: prevCustomer.membershipID || '',
    name: prevCustomer.name || '',
    email: prevCustomer.email || '',
    gender: prevCustomer.gender || '',
    mailAddr: prevCustomer.mailAddr || '',
    billAddr: prevCustomer.billAddr || '',
    city: prevCustomer.city || '',
    state: prevCustomer.state || '',
    areaCode: prevCustomer.areaCode || '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function isUpdate(){
    // Check if formData is equal to prevCustomer
    if (JSON.stringify(formData) === JSON.stringify({
      membershipID: prevCustomer.membershipID || '',
      name: prevCustomer.name || '',
      email: prevCustomer.email || '',
      gender: prevCustomer.gender || '',
      mailAddr: prevCustomer.mailAddr || '',
      billAddr: prevCustomer.billAddr || '',
      city: prevCustomer.city || '',
      state: prevCustomer.state || '',
      areaCode: prevCustomer.areaCode || '',
    })) {
      alert("No changes made.");
      return false;
    }
    return true
  }

  const handleSubmit = async (event) => {
    // Stop default form behavior which is to reload the page
    event.preventDefault();
    // Check if formData is equal to prevCustomer
    if (isUpdate()){
      try {
        const URL = import.meta.env.VITE_API_URL + "customers/" + id;
        const response = await axios.put(URL, formData);
        if (response.status !== 200) {
          alert("Error updating customer");
        } else {
          alert(response.data.message);
          // Redirect to customers page
          navigate("/customers");
        }
      } catch (err) {
        console.log("Error updating customer:", err);
      }
    }
  };

  return (
    <div>
      <h2>Update Customer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>membershipID:</label>
          <input
            type="number"
            name="membershipID"
            onChange={handleInputChange}
            required
            defaultValue={prevCustomer.membershipID}
          />
        </div>
        <div>
          <label>name:</label>
          <input
            type="text"
            name="name"
            onChange={handleInputChange}
            required
            defaultValue={prevCustomer.name}
          />
        </div>
        <div>
          <label>email:</label>
          <input
            type="text"
            name="email"
            onChange={handleInputChange}
            defaultValue={prevCustomer.email}
          />
        </div>
        <div>
          <label>gender:</label>
          <input
            type="text"
            name="gender"
            onChange={handleInputChange}
            required
            defaultValue={prevCustomer.gender}
          />
        </div>
        <div>
          <label>mailAddr:</label>
          <input
            type="text"
            name="mailAddr"
            onChange={handleInputChange}
            required
            defaultValue={prevCustomer.mailAddr}
          />
        </div>
        <div>
          <label>billAddr:</label>
          <input
            type="text"
            name="billAddr"
            onChange={handleInputChange}
            required
            defaultValue={prevCustomer.billAddr}
          />
        </div>
        <div>
          <label>city:</label>
          <input
            type="text"
            name="city"
            onChange={handleInputChange}
            required
            defaultValue={prevCustomer.city}
          />
        </div>
        <div>
          <label>state:</label>
          <input
            type="text"
            name="state"
            onChange={handleInputChange}
            required
            defaultValue={prevCustomer.state}
          />
        </div>
        <div>
          <label>areaCode:</label>
          <input
            type="nmber"
            name="areaCode"
            onChange={handleInputChange}
            required
            defaultValue={prevCustomer.areaCode}
          />
        </div>
        <button type="button" onClick={() => navigate("/customers")}>
          Cancel
        </button>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateCustomer;

