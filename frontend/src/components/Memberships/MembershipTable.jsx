import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./MembershipTableRow";
import axios from "axios";

const MembershipsTable = () => {
  const [memberships, setMemberships] = useState([]);

  const fetchMemberships = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "memberships";
      const response = await axios.get(URL);
      setMemberships(response.data);
    } catch (error) {
      alert("Error fetching memberships from the server.");
      console.error("Error fetching memberships:", error);
    }
  };

  useEffect(() => {
    fetchMemberships();
  }, []);

  return (
    <div>
      <h2>Memberships Table</h2>
      {memberships.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No memberships found.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>membershipID</th>
              <th>membershipPrice</th>
              <th>renewPeriod</th>
              <th>gymAccess</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {memberships.map((membership) => (
              <TableRow key={membership.id} membership={membership} fetchMemberships={fetchMemberships} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MembershipsTable;
