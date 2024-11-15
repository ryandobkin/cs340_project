import { useState, useEffect } from 'react';  // import the hooks you are going to use
import axios from 'axios';

// Define the HomePage component
function HomePage() {
  // useState hook to initialize the diagnosticData state variable to store the fetched data
  const [diagnosticData, setDiagnosticData] = useState([]);

  // Define a function to fetch diagnostic data from the API
  const fetchDiagnosticData = async () => {
    try {
      // Construct the URL for the API call
      const URL = import.meta.env.VITE_API_URL + 'diagnostic';
      // Use Axios to make the GET request
      const response = await axios.get(URL);
      // Update state with the response data
      setDiagnosticData(response.data);
    } catch (error) {
      // Handle any errors that occur during the fetch operation
      console.error('Error fetching diagnostic data:', error);
      alert('Error fetching diagnostic data from the server.');
    }
  };

  // useEffect hook to trigger the fetchDiagnosticData function when the component mounts
  useEffect(() => {
    fetchDiagnosticData();
  }, []);

  // Determine content based on diagnosticData length from the fetch action
  let content;
  if (diagnosticData === null) {
    content = <p>Loading diagnostic data...</p>; // Show while data is null
  } else if (diagnosticData.length === 0) {
    content = <p>No diagnostic data found.</p>; // Show if data is an empty array
  } else {
    content = <pre>{JSON.stringify(diagnosticData, null, 2)}</pre>;
  }

  // display the content and anything else
  return (
    <div class="home-page">
     <h2>Diagnostic Data</h2>
      {content}
     <h2>Overview</h2>
     <p>At Rocket Fitness, we need a database to help us manage our members and their memberships. We have 10,000 members across our 15 locations, and each member pays roughly $45 per month for their membership.</p>
     <p> Members pay for their memberships either monthly, quarterly, or annually. We also sell food and drinks geared towards fitness, as well as retail items like water bottles and protein powder.</p>
     <p>We are looking to better use our member base to extrapolate useful information, such as what types of machines they want, what makes them sign up for our more expensive memberships, and how we can grow our member count.</p>
     <p>In addition, we also need a DB for the base functionality of storing our user information in an organized and efficient way.</p>
    </div>
  );
}
export default HomePage;