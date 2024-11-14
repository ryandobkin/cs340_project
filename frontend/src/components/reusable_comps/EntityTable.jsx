import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./TableRow";
import axios from "axios";
import '../../App.css';

const EntityTable = ({ columns, labels, endpoint, entityName, entityId }) => {
  const [entities, setEntities] = useState([]);

  const fetchEntities = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + endpoint;
      const response = await axios.get(URL);
      setEntities(response.data);
    } catch (error) {
      alert(`Error fetching ${entityName} from the server.`);
      console.error(`Error fetching ${entityName}:`, error);
    }
  };

  useEffect(() => {
    fetchEntities();
  }, []);

  const getLabel = (column) => {
    const index = columns.indexOf(column);
    return labels[index] || column; // If no label is found, return the column name itself
  };

  return (
    <div className="table-container">
      <h2>{entityName} Table</h2>
      {entities.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No {entityName} found.</p>
        </div>
      ) : (
        <table className="table-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>
                  {getLabel(column)}
                  </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entities.map((entity) => (
                <TableRow
                    key={entity[entityId]}
                    data={entity}
                    columns={columns}
                    labels={labels}
                    entityName={entityName}
                    fetchEntities={fetchEntities}
                    entityId={entityId}
                />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EntityTable;
