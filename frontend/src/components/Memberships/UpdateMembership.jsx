import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdateMembership = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevMembership = location.state.membership;

  const [formData, setFormData] = useState({
    membershipID: prevMembership.membershipID || '',
    renewPeriod: prevMembership.renewPeriod || '',
    gymAccess: prevMembership.gymAccess || '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function isUpdate(){
    // Check if formData is equal to prevMembership
    if (JSON.stringify(formData) === JSON.stringify({
      membershipID: prevMembership.membershipID || '',
      renewPeriod: prevMembership.renewPeriod || '',
      gymAccess: prevMembership.gymAccess || '',
    })) {
      alert("No changes made.");
      return false;
    }
    return true
  }

  const handleSubmit = async (event) => {
    // Stop default form behavior which is to reload the page
    event.preventDefault();
    // Check if formData is equal to prevMembership
    if (isUpdate()){
      try {
        const URL = import.meta.env.VITE_API_URL + "memberships/" + id;
        const response = await axios.put(URL, formData);
        if (response.status !== 200) {
          alert("Error updating membership");
        } else {
          alert(response.data.message);
          // Redirect to memberships page
          navigate("/memberships");
        }
      } catch (err) {
        console.log("Error updating membership:", err);
      }
    }
  };

  return (
    <div>
      <h2>Update Membership</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>membershipPrice:</label>
          <input
            type="text"
            name="membershipPrice"
            onChange={handleInputChange}
            required
            defaultValue={prevMembership.membershipPrice}
          />
        </div>
        <div>
          <label>renewPeriod:</label>
          <input
            type="number"
            name="renewPeriod"
            onChange={handleInputChange}
            required
            defaultValue={prevMembership.renewPeriod}
          />
        </div>
        <div>
          <label>gymAccess:</label>
          <input
            type="text"
            name="gymAccess"
            onChange={handleInputChange}
            defaultValue={prevMembership.gymAccess}
          />
        </div>
        <button type="button" onClick={() => navigate("/memberships")}>
          Cancel
        </button>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateMembership;

