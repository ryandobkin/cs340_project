import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const TableRow = ({ transaction, fetchTransactions }) => {
  // Hook that allows us to navigate programmatically
  const navigate = useNavigate();
  // Redirect to edit transaction page
  const handleEdit = () => {
    // We can access the id (and query the transaction) with useParams() in the UpdateTransactions component
    navigate("/transactions/edit/" + transaction.id, { state: { transaction } });
  };

  const deleteRow = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "transactions/" + transaction.id;
      const response = await axios.delete(URL);
      // Ensure that the transaction was deleted successfully
      if (response.status === 204) {
        alert("Transaction deleted successfully");
      }
    } catch (err) {
      alert(err.response.data.error || "Error deleting transaction");
      console.log(err);
    }
    fetchTransactions();
  };

  return (
    <tr key={transaction.id}>
      <td>{transaction.id}</td>
      <td>{transaction.customerID}</td>
      <td>{transaction.transactDate}</td>
      <td>{transaction.transactTotal}</td>
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
