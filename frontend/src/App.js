import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch sensor data on mount and every 30 seconds
  useEffect(() => {
    const fetchData = () => {
      fetch("/api/live")
        .then((res) => res.json())
        .then((json) => {
          setData(json);
          setLoading(false);
        })
        .catch((err) => console.error("API Error:", err));
    };

    fetchData();
    const id = setInterval(fetchData, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="App">
      <h1>ATMOS 41 Live Data</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card-container">
          {data.map((reading, idx) => (
            <div className="sensor-card" key={idx}>
              <h3>{reading.parameter}</h3>
              <p className="sensor-name">{reading.sensor}</p>
              <p className="sensor-value">
                {reading.value} {reading.units}
              </p>
              <p className="sensor-time">
                {new Date(reading.datetime).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
