require('dotenv').config();
const cloudinaryConfig = require('./config/cloudinary');

const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = process.env.PORT;
require('./config/db');
app.use(bodyParser.json());
app.use(cors());

const userRoutes = require('./routes/usersRoute');
const eventRoutes = require('./routes/eventsRoute');
const reservationRoutes = require('./routes/reservationRoute');
const venueRoutes = require('./routes/venuesRoute');

app.use('/user', userRoutes);
app.use('/event', eventRoutes);
app.use('/reservation', reservationRoutes);
app.use('/venue', venueRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });