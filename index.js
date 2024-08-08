import express from 'express';
import cors from 'cors';
import { cars } from './data.js'; 

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Helper function to get the most popular make
const getMostPopularMake = () => {
  const makeCount = cars.reduce((acc, car) => {
    acc[car.make] = (acc[car.make] || 0) + 1;
    return acc;
  }, {});
  return Object.keys(makeCount).reduce((a, b) => makeCount[a] > makeCount[b] ? a : b);
};

// Routes

// GET http://localhost:3000/api/mostPopularMake
app.get('/api/mostPopularMake', (req, res) => {
  const mostPopularMake = getMostPopularMake();
  res.json({ mostPopularMake });
});

// GET http://localhost:3000/api/cars
app.get('/api/cars', (req, res) => {
  res.json(cars);
});

// POST http://localhost:3000/api/cars
app.post('/api/cars', (req, res) => {
  const { color, make, model, reg_number } = req.body;
  if (!color || !make || !model || !reg_number) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  cars.push({ color, make, model, reg_number });
  res.status(201).json({ message: 'Car added successfully' });
});

// DELETE http://localhost:3000/api/cars/:reg_number
app.delete('/api/cars/:reg_number', (req, res) => {
  const { reg_number } = req.params;
  const initialLength = cars.length;
  const updatedCars = cars.filter(car => car.reg_number !== reg_number);

  if (updatedCars.length === initialLength) {
    return res.status(404).json({ message: 'Car not found' });
  }

  cars.length = 0;
  cars.push(...updatedCars);
  res.json({ message: 'Car deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
