import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import '../../App.css';

const UpdateEntity = ({ entityName, fields, redirectPath, entityId }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevEntities = location.state.data;
  var strKey = '';

  const [formData, setFormData] = useState(() => {
    return fields.reduce((acc, field) => {
      //strKey = prevEntities[entityId];
      //console.log("prevEntities[entityId]", prevEntities[entityId], "field", field, "acc", acc);
      acc[field] = prevEntities ? prevEntities[field] || '' : '';
      return acc
    }, {})
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
    if (JSON.stringify(formData) === JSON.stringify(prevEntities)) {
      alert("No changes made.");
      return false;
    }
    return true
  };

  const handleSubmit = async (event) => {
    // Stop default form behavior which is to reload the page
    event.preventDefault();
    // Check if formData is equal to prevTransactionDetails
    if (isUpdate()){
      try {
        const URL = import.meta.env.VITE_API_URL + `${entityName}/${prevEntities[entityId]}`;
        const response = await axios.put(URL, formData);
        if (response.status !== 200) {
          alert(`Error updating ${entityName}`);
        } else {
          alert(response.data.message || `${entityName} updated successfully`);
          // Redirect to transactionDetails page
          navigate(redirectPath);
        }
      } catch (err) {
        console.log(`Error updating ${entityName}:`, err);
      }
    }
  };

  return (
    <div className="update-form-container">
      <h2 className="update-form-title">Update {entityName}</h2>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
            <div key={field} className="update-form-field">
                <label>{field}:</label>
                <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    required
                />
            </div>
        ))}
        <button type="button" onClick={() => navigate(redirectPath)} className="cancel-button">
          Cancel
        </button>
        <button type="submit" className="update-form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateEntity;

