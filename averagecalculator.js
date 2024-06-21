import React, { useState } from 'react';
import axios from 'axios';

const numberTypes = ['p', 'f', 'e', 'r'];

const AverageCalculator = () => {
  const [numberType, setNumberType] = useState(numberTypes[0]);
  const [windowPrevState, setWindowPrevState] = useState([]);
  const [windowCurrState, setWindowCurrState] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [avg, setAvg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNumbers = async (type) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:9876/numbers/${type}`);
      const data = response.data;
      setWindowPrevState(data.windowPrevState);
      setWindowCurrState(data.windowCurrState);
      setNumbers(data.numbers);
      setAvg(data.avg);
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleFetch = () => {
    fetchNumbers(numberType);
  };

  return (
    <div>
      <h1>Average Calculator</h1>
      <div>
        <label htmlFor="numberType">Choose a number type: </label>
        <select id="numberType" value={numberType} onChange={(e) => setNumberType(e.target.value)}>
          {numberTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <button onClick={handleFetch} disabled={loading}>Fetch Numbers</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div>
        <h2>Window Previous State</h2>
        <p>{JSON.stringify(windowPrevState)}</p>
        <h2>Window Current State</h2>
        <p>{JSON.stringify(windowCurrState)}</p>
        <h2>Numbers</h2>
        <p>{JSON.stringify(numbers)}</p>
        <h2>Average</h2>
        <p>{avg !== null ? avg : 'N/A'}</p>
      </div>
    </div>
  );
};
export default AverageCalculator;
