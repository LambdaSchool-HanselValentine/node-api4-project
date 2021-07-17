/* eslint-disable no-unused-vars */
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const server = express();
const helmet = require("helmet");
const morgan = require("morgan");

const port = process.env.PORT || 9000;

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan("dev"));

server.get("/", (req, res) => {
	const messageOfTheDay = process.env.MOTD || "Welcome to my API server!";
	res.status(200).json({
		messageOfTheDay,
		api: "up",
		docs: "Endpoints: /api/games : list of some vidji games",
	});
});

server.get("/api/games", (req, res) => {
	res.status(200).send([
		{
			id: 91,
			title: "Eternal",
			thumbnail: "https://www.freetogame.com/g/91/thumbnail.jpg",
			short_description:
				"A strategy card game designed to take the best elements of Magic the Gathering, Hearthstone, and Hex and combine them all into one game.",
		},
		{
			id: 92,
			title: "One Tower",
			thumbnail: "https://www.freetogame.com/g/92/thumbnail.jpg",
			short_description:
				'A unique 1v1 MOBA known as a "micro-moba" developed and published by SkyReacher following a successful Kickstarter. ',
		},
		{
			id: 93,
			title: "Riding Club Championships",
			thumbnail: "https://www.freetogame.com/g/93/thumbnail.jpg",
			short_description:
				"An online competitive horse riding game inspired by traditional equestrian disciplines. ",
		},
		{
			id: 94,
			title: "Battlerite",
			thumbnail: "https://www.freetogame.com/g/94/thumbnail.jpg",
			short_description:
				"A free-to-play team arena brawler developed by Stunlock Studios. Players play as one of several available champions on teams in 2v2 or 3v3 matches. ",
		},
		{
			id: 95,
			title: "Paladins",
			thumbnail: "https://www.freetogame.com/g/95/thumbnail.jpg",
			short_description:
				"A free-to-play team-based shooter developed and published by Hi-Rez Games, the creators of SMITE. ",
		},
	]);
});

//catch all
server.use("*", (req, res) => {
	res.send(`<h1> Hello, World! </h1>`);
});

// error handler || catch all
server.use((err, req, res, next) => {
	const message = err?.message || "that place doesn't exist";
	const status = err?.status || 500;
	res.status(`${status}`).json({ message, stack: err.stack });
});

server.listen(port, () => {
	console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
