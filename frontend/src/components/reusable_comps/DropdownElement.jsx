import { useEffect, useState } from "react";
import axios from "axios";
import '../../App.css';

const DropdownElement = ({ foreignKey, referencedTable, referencedColumn, formData, setFormData }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const URL = import.meta.env.VITE_API_URL + referencedTable;
        const response = await axios.get(URL);
        setOptions(response.data);
      } catch (error) {
        console.error(`Error fetching options for ${referencedTable}:`, error);
      }
    };

    fetchOptions();
  }, [referencedTable]);
  //console.log("options", options);

  const handleChange = (e) => {
    setFormData({ ...formData, [foreignKey]: e.target.value });
  };

  return (
    <div>
      <select value={formData[foreignKey] || ""} onChange={handleChange} className="dropdown-container">
        <option className="dropdown-option" value="">Select a foreign key</option>
        {options.map((option) => (
          <option className="dropdown-option" key={option[referencedColumn]} value={option[referencedColumn]}>
            {option[referencedColumn]} {}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownElement;
