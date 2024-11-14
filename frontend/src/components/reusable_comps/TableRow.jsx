import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import '../../App.css';

/* eslint-disable react/prop-types */
const TableRow = ({ data, columns, fetchEntities, entityName, entityId }) => {
  // Hook that allows us to navigate programmatically
  const navigate = useNavigate();
  // Redirect to edit transactionDetails page
  const handleEdit = () => {
    // We can access the id (and query the transactionDetails) with useParams() in the UpdateTransactionDetailss component
    console.log("STATE", data, data.state);
    navigate(`/${entityName}/edit/${data[entityId]}`, {state : {data}});
  };

  const deleteRow = async () => {
    try {
      console.log("DATA", data, "DATAID", data[entityId]);
      const URL = import.meta.env.VITE_API_URL + `${entityName}/${data[entityId]}`;
      const response = await axios.delete(URL);
      // Ensure that the transactionDetails was deleted successfully
      if (response.status === 204) {
        alert(`${entityName} deleted successfully`);
      }
    } catch (err) {
      alert(err.response?.data?.error || `Error deleting ${entityName}`);
      console.log(err);
    }
    fetchEntities();
  };

  return (
    <tr className="table-row">
      {columns.map((column) => (
        <td key={column} className="table-cell">
          {data[column]}
        </td>
      ))}
      <td>
        <BiEditAlt onClick={handleEdit} size={25} style={{ cursor: "pointer" }} 
        className="edit-btn"/>
      </td>
      <td>
        <BsTrash onClick={deleteRow} size={25} style={{ cursor: "pointer" }} 
        className="delete-btn"/>
      </td>
    </tr>
  );
};

export default TableRow;
