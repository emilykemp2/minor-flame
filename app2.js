// JavaScript Document
const util = require("util");
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
const MongoClient = require('mongodb').MongoClient;


app.use(bodyParser.urlencoded({ extended: true }));
app.post('/myaction', function(req, res) {
	
	if (req.body.search == 'stock') {
		theQuery={StockTicker: req.body.data};	
	}
	else {
		theQuery={Company: req.body.data};
	}
	
	const url = "mongodb+srv://ekemp:ekemp2@cluster0.cenrw.mongodb.net/stocks?retryWrites=true&w=majority";
		const client = new MongoClient(url, { useUnifiedTopology: true });
	mongocon();
	

	async function mongocon() {
		
		try {
			await client.connect();
			const dbo = client.db('stocks');
			var coll = dbo.collection('companies');
			console.log("connected");
			
		} catch (err) {
        	console.log(err);}
	
	
	coll.find(theQuery).toArray(function(err, result) {
            if (err) throw err;
			console.log("here");
            var query = result;
            client.close();
		
			for (i = 0; i<query.length; i++) {
				res.write(query[i].StockTicker);				
				res.write("  ");
				res.write(query[i].Company);
				res.write("\n");
			}
			console.log(query[0].Company);
            res.end();
     });
	
	}
	
})
app.listen(5050, function() {
});
