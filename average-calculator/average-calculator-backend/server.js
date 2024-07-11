const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
const SERVER_URL = 'http://20.244.56.144/test';

let numbersWindow = [];

const fetchNumbers = async (type) => {
  try {
    const response = await axios.get(`${SERVER_URL}/${type}`, { timeout: 500 });
    return response.data.numbers;
  } catch (error) {
    console.error(`Error fetching ${type} numbers:`, error.message);
    return [];
  }
};

const calculateAverage = (numbers) => {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
};

app.get('/numbers/:type', async (req, res) => {
  const { type } = req.params;
  const validTypes = ['primes', 'fibo', 'even', 'rand'];
  
  if (!validTypes.includes(type)) {
    return res.status(400).send({ error: 'Invalid number type' });
  }

  const prevState = [...numbersWindow];
  const newNumbers = await fetchNumbers(type);
  
  newNumbers.forEach(num => {
    if (!numbersWindow.includes(num)) {
      if (numbersWindow.length >= WINDOW_SIZE) {
        numbersWindow.shift();
      }
      numbersWindow.push(num);
    }
  });

  const avg = calculateAverage(numbersWindow);
  const response = {
    windowPrevState: prevState,
    windowCurrState: numbersWindow,
    numbers: newNumbers,
    avg: avg.toFixed(2)
  };

  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
