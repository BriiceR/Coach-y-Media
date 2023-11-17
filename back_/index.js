const express = require("express");

const cors = require("cors");

const router = require("./router");

const app = express();

const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(router);

app.listen(8000, () => {
    console.log("Serveur démarré sur le port 8000");
});

let db;

function connect() {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error('Erreur lors de la connexion à la base de données MongoDB:', err.message);
        setTimeout(connect, 5000); // Tentative de reconnexion après 5 secondes
    });

    mongoose.connection.on('error', (err) => {
        if (err.message === 'MongoNetworkError') {
            console.error('Connexion à la base de données MongoDB perdue. Tentative de reconnexion...');
            connect();
        }
    });

    db = mongoose.connection;
}

connect();

module.exports = db;
