import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateCustomers() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    membershipID: "",
    name: "",
    email: "",
    gender: "",
    mailAddr: "",
    billAddr: "",
    city: "",
    state: "",
    areaCode: "",
  });
  
  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // Create a new customer object from the formData
    const newCustomer = {
      membershipID: formData.nmembershipIDame,
      name: formData.name,
      email: formData.email,
      gender: formData.gender,
      mailAddr: formData.mailAddr,
      billAddr: formData.billAddr,
      city: formData.city,
      state: formData.state,
      areaCode: formData.areaCode,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "customers";
      const response = await axios.post(URL, newCustomer);
      if (response.status === 201) {
        navigate("/customers");
      } else {
        alert("Error creating customer");
      }
    } catch (error) {
      alert("Error creating customer");
      console.error("Error creating customer:", error);
    }
    // Reset the form fields
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      membershipID: "",
      name: "",
      email: "",
      gender: "",
      mailAddr: "",
      billAddr: "",
      city: "",
      state: "",
      areaCode: "",
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
      <h2>Create Customers</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="membershipID">membershipID</label>
        <input
          type="number"
          name="membershipID"
          defaultValue={formData.membershipID}
          onChange={handleInputChange}
        />
        <label htmlFor="name">name</label>
        <input
          type="text"
          name="name"
          defaultValue={formData.name}
          onChange={handleInputChange}
        />
        <label htmlFor="email">email</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <label htmlFor="gender">gender</label>
        <input
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
        />
        <label htmlFor="mailAddr">mailAddr</label>
        <input
          type="text"
          name="mailAddr"
          value={formData.mailAddr}
          onChange={handleInputChange}
        />
        <label htmlFor="city">city</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
        />
        <label htmlFor="state">state</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleInputChange}
        />
        <label htmlFor="areaCode">areaCode</label>
        <input
          type="number"
          name="areaCode"
          value={formData.areaCode}
          onChange={handleInputChange}
        />
        <button type="submit">Create Customer</button>
      </form>
    </>
  );
}

export default CreateCustomers;
