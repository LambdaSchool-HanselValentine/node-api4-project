/* eslint-disable no-unused-vars */
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const server = express();
const helmet = require("helmet");
const morgan = require("morgan");

const PORT = process.env.port || 9000;

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan("dev"));

server.get("/", (req, res) => {
	const messageOfTheDay = process.env.MOTD || "Welcome to my API server!";
	res.status(200).json({ messageOfTheDay, api: "up" });
});

//catch all
server.use("*", (req, res) => {
	res.send(`<h1> Hello, World! </h1>`);
});

// error handler || catch all
server.use((err, req, res, next) => {
	const message = err?.message || "Something went wrong in the server";
	const status = err?.status || 500;
	res.status(`${status}`).json({ message, stack: err.stack });
});

console.log(process.env.PORT);
