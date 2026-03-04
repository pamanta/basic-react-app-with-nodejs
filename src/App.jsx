import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/hello");
      const data = await res.json();
      setData(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Basic React App</h1>
      {data ? <p>{data.message}</p> : <p>Loading...</p>}
    </div>
  );
}

export default App;
