require('dotenv').config()
const express = require('express');
const app = express();
const sslRedirect = require('heroku-ssl-redirect');
const bodyParser = require('body-parser')
const path = require('path')
const mysql = require('mysql');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.REACT_APP_CRYPTO);
const http = require("http").createServer(app);

const io = require("socket.io")(http, {
	cors: {
	  origin: process.env.REACT_APP_BASE_URL,
	  methods: ["GET", "POST"],
	  allowedHeaders: ["my-custom-header"],
	  credentials: true
	}
  });
  
app.use(sslRedirect());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}));

io.on("connection", socket => {
	socket.on("disconnect", () => {
	  console.log("user disconnected");
	});
  
	socket.on("message", message => {
	  io.emit("message", message);
	});
  });

const pool = mysql.createPool({
	host: process.env.REACT_APP_DATABASE_HOST,
	user: process.env.REACT_APP_DATABASE_USERNAME,
	password: process.env.REACT_APP_DATABASE_PASSWORD,
	database: process.env.REACT_APP_DATABASE
});




app.get('/api/reports', (req, res) => {
	pool.getConnection(function(err, connection) {
		if (err) throw err; 
		connection.query(
			"SELECT * FROM reports WHERE org_id = ?", [req.query.orgId],
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
		connection.query(
			"SELECT * FROM reports WHERE report_id= ?", [req.query.reportId], 
			function (error, results, fields) {
				const dateAdded = results[0].date_added;
				const decryptedReportDetails = cryptr.decrypt(results[0].report_details);
				const decryptedReport = cryptr.decrypt(results[0].report);
				const reportId = results[0].report_id;
				const occurTime = results[0].occur_time;
				const state = results[0].state;

				res.send({
					"dateAdded": dateAdded,
					"reportDetails": decryptedReportDetails,
					"report": decryptedReport,
					"reportId": reportId,
					"occurTime": occurTime,
					"state": state
					
				})
				console.log()
				connection.release();
				if (error) throw error;
			}
		);
	});
});

app.get('/api/organisation', (req, res) => {
	pool.getConnection(function(err, connection) {
		if (err) throw err; 
		
		connection.query
		("SELECT * FROM organisations WHERE org_id = ?", [req.query.orgId],
			function (error, results, fields) {
				res.send(results)
				connection.release();
				if (error) throw error;
			}
		);
	});
});









app.get('/api', (req, res) => {
	res.send("API working");
	
});
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
http.listen(process.env.PORT || 5000, 
	() => console.log("Server is running..."));

