require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const sslRedirect = require('heroku-ssl-redirect');
const bodyParser = require('body-parser')
const path = require('path')
const mysql = require('mysql');
const SQL = require('sql-template-strings')
const axios = require('axios').default;
app.use(sslRedirect());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

const pool = mysql.createPool({
	host: process.env.REACT_APP_DATABASE_HOST,
	user: process.env.REACT_APP_DATABASE_USERNAME,
	password: process.env.REACT_APP_DATABASE_PASSWORD,
	database: process.env.REACT_APP_DATABASE
});

app.get('/api/reports', (req, res) => {
	pool.getConnection(function(err, connection) {
		if (err) throw err; 
		query = SQL`SELECT * FROM reports WHERE org_id=${req.query.orgId}`
		connection.query(
			query,
			function (error, results, fields) {
				res.send(results)
				connection.release();
				if (error) throw error;
			}
		);
	});
});
app.get('/api/report', (req, res) => {
	pool.getConnection(function(err, connection) {
		if (err) throw err; 
		query = SQL`SELECT * FROM reports WHERE report_id=${req.query.id}`
		connection.query(
			query,
			function (error, results, fields) {
				res.send(results)
				connection.release();
				if (error) throw error;
			}
		);
	});
});
app.get('/api/organisation', (req, res) => {
	  axios.request({
		method: 'GET',
		url: `${process.env.REACT_APP_DOMAIN}/api/v2/organizations/${req.query.orgId}`,
		headers: {
			authorization: "Bearer" + " " + process.env.REACT_APP_TOKEN
		}
	  }).then(function (response) {
		res.send(response.data)
	  }).catch(function (error) {
		console.error(error);
	  });
});








  app.get('/api', (req, res) => {
	  res.send("API working");
	  
  });
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
app.listen(process.env.PORT || 5000, 
	() => console.log("Server is running..."));

