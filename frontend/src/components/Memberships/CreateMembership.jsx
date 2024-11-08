import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateMemberships() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    membershipPrice: "",
    renewPeriod: "",
    gymAccess: "",
  });
  
  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // Create a new membership object from the formData
    const newMembership = {
      membershipPrice: formData.membershipPrice,
      renewPeriod: formData.renewPeriod,
      gymAccess: formData.gymAccess,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "memberships";
      const response = await axios.post(URL, newMembership);
      if (response.status === 201) {
        navigate("/memberships");
      } else {
        alert("Error creating membership");
      }
    } catch (error) {
      alert("Error creating membership");
      console.error("Error creating membership:", error);
    }
    // Reset the form fields
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      membershipPrice: "",
      renewPeriod: "",
      gymAccess: "",
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
      <h2>Create Memberships</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="membershipPrice">membershipPrice</label>
        <input
          type="text"
          name="membershipPrice"
          defaultValue={formData.membershipPrice}
          onChange={handleInputChange}
        />
        <label htmlFor="renewPeriod">renewPeriod</label>
        <input
          type="number"
          name="renewPeriod"
          defaultValue={formData.renewPeriod}
          onChange={handleInputChange}
        />
        <label htmlFor="gymAccess">gymAccess</label>
        <input
          type="text"
          name="gymAccess"
          value={formData.gymAccess}
          onChange={handleInputChange}
        />
        <button type="submit">Create Membership</button>
      </form>
    </>
  );
}

export default CreateMemberships;
