import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const TableRow = ({ product, fetchProducts }) => {
  // Hook that allows us to navigate programmatically
  const navigate = useNavigate();
  // Redirect to edit product page
  const handleEdit = () => {
    // We can access the id (and query the product) with useParams() in the UpdateProducts component
    navigate("/products/edit/" + product.id, { state: { product } });
  };

  const deleteRow = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "products/" + product.id;
      const response = await axios.delete(URL);
      // Ensure that the product was deleted successfully
      if (response.status === 204) {
        alert("Product deleted successfully");
      }
    } catch (err) {
      alert(err.response.data.error || "Error deleting product");
      console.log(err);
    }
    fetchProducts();
  };

  return (
    <tr key={product.id}>
      <td>{product.id}</td>
      <td>{product.productName}</td>
      <td>{product.productPrice}</td>
      <td>{product.productCost}</td>
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
