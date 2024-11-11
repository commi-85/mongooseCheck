require('dotenv').config({path:'../env'});

const mongoose = require('mongoose'); 

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT||3000;

function connexion(){
    mongoose.connect(MONGO_URI, {
        /*useNewUrlParser: true,
        useUnifiedTopology: true,
       */
      })
      .then(() => {
        console.log('Connexion à MongoDB Atlas réussie !');
      })
      .catch((err) => {
        console.log( err);
      })
}
connexion();

module.exports = connexion;
