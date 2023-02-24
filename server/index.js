const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Server listening on the port http://localhost:${PORT}`);
});

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
