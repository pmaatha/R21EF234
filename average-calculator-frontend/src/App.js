import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [type, setType] = useState('even');
  const [data, setData] = useState(null);

  const fetchNumbers = async () => {
    try {
      const response = await axios.get(`http://localhost:9876/numbers/${type}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching numbers:', error.message);
    }
  };

  return (
    <div className="container">
      <h1>Average Calculator</h1>
      <div className="form-group">
        <label>
          Choose number type:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="primes">Prime</option>
            <option value="fibo">Fibonacci</option>
            <option value="even">Even</option>
            <option value="rand">Random</option>
          </select>
        </label>
        <button onClick={fetchNumbers}>Fetch Numbers</button>
      </div>
      {data && (
        <div className="result">
          <h2>Previous State:</h2>
          <pre>{JSON.stringify(data.windowPrevState, null, 2)}</pre>
          <h2>Current State:</h2>
          <pre>{JSON.stringify(data.windowCurrState, null, 2)}</pre>
          <h2>Fetched Numbers:</h2>
          <pre>{JSON.stringify(data.numbers, null, 2)}</pre>
          <h2>Average: {data.avg}</h2>
        </div>
      )}
    </div>
  );
};

export default App;
