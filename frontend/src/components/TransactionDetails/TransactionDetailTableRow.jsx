import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const TableRow = ({ transactionDetails, fetchTransactionDetails }) => {
  // Hook that allows us to navigate programmatically
  const navigate = useNavigate();
  // Redirect to edit transactionDetails page
  const handleEdit = () => {
    // We can access the id (and query the transactionDetails) with useParams() in the UpdateTransactionDetailss component
    navigate("/transactionDetails/edit/" + transactionDetails.id, { state: { transactionDetails } });
  };

  const deleteRow = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "transactionDetails/" + transactionDetails.id;
      const response = await axios.delete(URL);
      // Ensure that the transactionDetails was deleted successfully
      if (response.status === 204) {
        alert("TransactionDetails deleted successfully");
      }
    } catch (err) {
      alert(err.response.data.error || "Error deleting transactionDetails");
      console.log(err);
    }
    fetchTransactionDetails();
  };

  return (
    <tr key={transactionDetails.id}>
      <td>{transactionDetails.id}</td>
      <td>{transactionDetails.transactID}</td>
      <td>{transactionDetails.productID}</td>
      <td>{transactionDetails.membershipID}</td>
      <td>{transactionDetails.unitPrice}</td>
      <td>{transactionDetails.orderQty}</td>
      <td>{transactionDetails.orderTotal}</td>
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
