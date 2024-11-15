import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../../App.css';

function CreateEntity({ fields, labels, formTitle, endpoint }) {
  const navigate = useNavigate();
  const initialEntityData = fields.reduce((acc, field) => {
    acc[field] = "";
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialEntityData);
  
  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();

    try {
      const URL = import.meta.env.VITE_API_URL + endpoint;
      const response = await axios.post(URL, formData);
      if (response.status === 201) {
        navigate(`/${endpoint}`);
      } else {
        alert("Error creating entry: " + endpoint);
      }
    } catch (error) {
        alert("Error creating entry: " + endpoint);
      console.error("Error creating entry: ", error);
    }
    // Reset the form fields
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData(initialFormData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{formTitle}</h2>
      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
            <div key={field} className="form-field">
                <label htmlFor={field}>{labels[index]}</label>
                <input
                    type="text"
                    name={field}
                    defaultValue={formData[field]}
                    onChange={handleInputChange}
                />
            </div>
        ))}
        <button type="submit" className="form-button">Create Entry</button>
      </form>
    </div>
  );
}

export default CreateEntity;
