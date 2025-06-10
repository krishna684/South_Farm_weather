import React, { useEffect, useState } from "react";

function App() {
  const [sensorData, setSensorData] = useState(null);

  useEffect(() => {
    fetch("/api/live")
      .then(res => res.json())
      .then(data => setSensorData(data))
      .catch(err => console.error("API Error:", err));
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>ATMOS 41 Sensor Dashboard</h1>
      {sensorData ? (
        <pre>{JSON.stringify(sensorData, null, 2)}</pre>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default App;