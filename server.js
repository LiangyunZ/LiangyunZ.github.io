// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const dbSettings = {
	filename: './tmp/database.db',
	driver: sqlite3.Database
  };

async function databaseInitialize(dbSettings) {
	try {
		const db = await open(dbSettings);
		await db.exec(`CREATE TABLE IF NOT EXISTS food (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT,
			category TEXT,
			inspection_date DATE,
			inspection_results TEXT,
			city TEXT,
			state TEXT,
			zip TEXT,
			owner TEXT,
			type TEXT)
			`)

		const data = await foodDataFetcher();

		const test = await db.get("SELECT * FROM restaurants")
		console.log(test);

	}
	catch(e) {
		console.log("Error loading Database");
		console.log(e);

	}
};


async function foodDataFetcher() {
	const url = "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json";
	const response = await fetch(url);

	return response.json()
	
};

async function dataInput(data) {
	try {
		const name = data.name;
		const category = data.category;
		const inspection_date = data.inspection_date;
		const inspection_results = data.inspection_results;
		const city = data.city;
		const state = data.state;
		const zip = data.zip;
		const owner = data.owner;
		const type = data.type;

		await db.exec(`INSERT INTO food (name, category, inspection_date, inspection_results, city, state, zip, owner, type) 
			VALUES ("${name}", "${category}", "${inspection_date}", "${inspection_results}", "${city}", "${state}", "${zip}", "${owner}", "${type}")`);
		console.log(`${name} and ${category} inserted`);
		}

	catch(e) {
		console.log('Error on insertion');
		console.log(e);
		}

};

async function databaseRetriever(db) {
	const result = await db.all(`SELECT category, COUNT(name) FROM food GROUP BY category`);
	return result;
  };


foodDataFetcher();
dataInput();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.route('/api')
  .get((req, res) => {
    console.log('GET request detected');
    res.send(`Lab 5 for ${process.env.NAME}`);
  })
  .post(async (req, res) => {
    console.log('POST request detected');
    console.log('Form data in res.body', req.body);

    const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
    const json = await data.json();
    console.log('data from fetch', json);
    res.json(json);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

app.route('/sql')
  .get((req, res) => {
    console.log('GET detected');
  })
  .post(async (req, res) => {
    console.log('POST request detected');
    console.log('Form data in res.body', req.body);
    // This is where the SQL retrieval function will be:
    // Please remove the below variable
	const db = await open(dbSettings);
    const output = await databaseRetriever(db);
    // This output must be converted to SQL
    res.json(output);
  });