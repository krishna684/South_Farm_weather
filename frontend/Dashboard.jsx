import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/latest")
      .then(res => res.json())
      .then(json => setData(json.data));
  }, []);

  return (
    <div>
      <h1>Live Weather Data</h1>
      {data ? (
        <ul>
          {data.map((d, i) => (
            <li key={i}>
              {d.parameter}: {d.value} {d.unit}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading…</p>
      )}
    </div>
  );
}

export default Dashboard;