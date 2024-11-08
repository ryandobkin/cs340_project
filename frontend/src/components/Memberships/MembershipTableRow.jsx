import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const TableRow = ({ membership, fetchMemberships }) => {
  // Hook that allows us to navigate programmatically
  const navigate = useNavigate();
  // Redirect to edit membership page
  const handleEdit = () => {
    // We can access the id (and query the membership) with useParams() in the UpdateMemberships component
    navigate("/memberships/edit/" + membership.id, { state: { membership } });
  };

  const deleteRow = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "memberships/" + membership.id;
      const response = await axios.delete(URL);
      // Ensure that the membership was deleted successfully
      if (response.status === 204) {
        alert("Membership deleted successfully");
      }
    } catch (err) {
      alert(err.response.data.error || "Error deleting membership");
      console.log(err);
    }
    fetchMemberships();
  };

  return (
    <tr key={membership.id}>
      <td>{membership.id}</td>
      <td>{membership.membershipPrice}</td>
      <td>{membership.renewPeriod}</td>
      <td>{membership.gymAccess}</td>
      <td>
        <BiEditAlt onClick={handleEdit} size={25} style={{ cursor: "pointer" }} />
      </td>
      <td>
        <BsTrash onClick={deleteRow} size={25} style={{ cursor: "pointer" }} />
      </td>
    </tr>
  );
};

export default TableRow;
