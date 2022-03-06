const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');


const app = express();

mongoose.connect('mongodb+srv://Louis:Louis@cluster0.fb8t0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
// 
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Routes

app.use('/auth', userRoutes);
app.use('/chatapp', messageRoutes);

module.exports = app;