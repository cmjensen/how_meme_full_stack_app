require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session")
const ctrl = require("./controller");
const favCtrl = require("./favController");
const massive = require('massive')

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const app = express();

app.use(express.json());
app.use(cors());

massive({
		connectionString: CONNECTION_STRING,
		ssl: { rejectUnauthorized: false }
	}).then(db => {
	app.set("db", db);
	console.log("db connected");
});

app.use(session({
	resave: false,
    saveUninitialized: true,
	secret: SESSION_SECRET,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 365
	}
}))


// ENDPOINTS
app.get("/api/memes/:id", ctrl.getMeme);
app.get("/api/memse", ctrl.getAllMemes);
app.post("/api/memes", ctrl.addMeme);
app.post("/api/favorites", favCtrl.addFav)
app.put("/api/memes/:id", ctrl.updateMeme);
app.delete("/api/favorites/:id", favCtrl.deleteFav);
app.delete("/api/memes", ctrl.deleteMeme);

app.listen( SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`));