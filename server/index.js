const express = require('express');
const app = express();
app.use(express.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGODB;
mongoose
  .set('strictQuery', false)
  .connect(MONGO_URI)
  .then((x) => {
    const dbName = x.connections[0].name;
    console.log(`Connected to MongoDB! Database name: "${dbName}"`);
  })
  .catch((err) => {
    console.error('Error connecting to mongo: ', err);
  });

const cors = require('cors');
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);

const path = require('path');
app.use(express.static(path.join(__dirname, '')));

const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server listening on the port http://localhost:${PORT}`);
});

const usersRoutes = require('./routes/users.routes');
app.use('/users', usersRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

const experiencesRoutes = require('./routes/experiences.routes');
app.use('/experiences', experiencesRoutes);

// app.use((err, req, res, next) => {
//   const errorStatus = err.status || 500;
//   const errorMessge = err.message || 'Something went wrong';
//   return res
//     .status(errorStatus)
//     .json({
//       success: false,
//       status: errorStatus,
//       message: errorMessge,
//       stack: err.stack,
//     });
// });

app.get('/getNewProductList', (req, res, next) => {
  let data = [
    {
      id: uuidv4(),
      title: 'Vegan breakfast on a boat',
      country: 'Australia',
      city: 'Sydney',
      price: 200,
      currency: '$',
      image_url:
        'https://townsquare.media/site/959/files/2021/09/attachment-GettyImages-1224773422.jpg?w=980&q=75',
      people: 2,
    },
    {
      id: uuidv4(),
      title: 'Exploring Korean foods with me',
      country: 'South Korea',
      city: 'Seoul',
      price: 100,
      currency: '$',
      image_url:
        'https://davidsbeenhere.com/wp-content/uploads/2019/10/25_Korean_Dishes_You_Must_Eat_in_South_Korea3.jpg',
      people: 5,
    },
  ];
  res.json(data);
});
