import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const TableRow = ({ customerProduct, fetchCustomerProducts }) => {
  // Hook that allows us to navigate programmatically
  const navigate = useNavigate();
  // Redirect to edit customerProduct page
  const handleEdit = () => {
    // We can access the id (and query the customerProduct) with useParams() in the UpdateCustomerProducts component
    navigate("/customerProducts/edit/" + customerProduct.id, { state: { customerProduct } });
  };

  const deleteRow = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "customerProducts/" + customerProduct.id;
      const response = await axios.delete(URL);
      // Ensure that the customerProduct was deleted successfully
      if (response.status === 204) {
        alert("CustomerProduct deleted successfully");
      }
    } catch (err) {
      alert(err.response.data.error || "Error deleting customerProduct");
      console.log(err);
    }
    fetchCustomerProducts();
  };

  return (
    <tr key={customerProduct.id}>
      <td>{customerProduct.id}</td>
      <td>{customerProduct.customerID}</td>
      <td>{customerProduct.productID}</td>
      <td>{customerProduct.membershipID}</td>
      <td>{customerProduct.quantity}</td>
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
