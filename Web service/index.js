/*
RESTFul Services by NodeJS
*/
 var express = require('express');
 var mysql = require ('mysql');
 var bodyParser = require('body-parser'); 
 var cors = require('cors');
 var dateFormat = require('dateformat');
 var now = new Date();
 

//Connect to mysQL 
var con = mysql.createConnection({
	host: 'localhost', // Replace your HOST IP 
	user: 'root', 
	password:'', 
	database: 'trackmedds_pim'
   }); 
   


var app= express();
 app.use(bodyParser.json()); // Accept JSON Params 
 app.use(bodyParser.urlencoded({extended: true})); // Accept URL Encoded params 
 app.use(cors())

 
   // Get all 
   app.get('/list', (req, res) => {
	var nbrlimit = parseInt(req.query.limit);
	if(req.query.name && req.query.region){
		var name = req.query.name;
		var region = req.query.region;
		con.query ('SELECT products.nproduct as name,products.price as price,pharmaciec.adress as host_name,pharmaciec.amplitude as latitude,pharmaciec.attitude as longitude,pharmaciec.nom as room_type,pharmaciec.ville as neighbourhood  FROM `commande_product` INNER JOIN products ON commande_product.product_id=products.id INNER JOIN commandes ON commande_product.commande_id=commandes.id INNER JOIN pharmaciec ON commandes.created_by=pharmaciec.id WHERE commandes.etat=1 AND products.nproduct LIKE CONCAT("%",'+"?"+',"%") AND pharmaciec.ville=?',[name,region],function (err,result,fields){
			
			con.on('error',function(err){
				console.log('[MySQL ERROR]',err);
			});
			res.json({"content":result});
	});
		
	 }
	 else if (req.query.name && !req.query.region){
		var name = req.query.name;
		con.query ('SELECT products.nproduct as name,products.price as price,pharmaciec.adress as host_name,pharmaciec.amplitude as latitude,pharmaciec.attitude as longitude,pharmaciec.nom as room_type,pharmaciec.ville as neighbourhood  FROM `commande_product` INNER JOIN products ON commande_product.product_id=products.id INNER JOIN commandes ON commande_product.commande_id=commandes.id INNER JOIN pharmaciec ON commandes.created_by=pharmaciec.id WHERE commandes.etat=1 AND products.nproduct LIKE CONCAT("%",'+"?"+',"%")',[name],function (err,result,fields){
			con.on('error',function(err){
				console.log('[MySQL ERROR]',err);
			});
			res.json({"content":result});
	});
	}
	else if(req.query.region && !req.query.name){
		var region = req.query.region;
		con.query ('SELECT products.nproduct as name,products.price as price,pharmaciec.adress as host_name,pharmaciec.amplitude as latitude,pharmaciec.attitude as longitude,pharmaciec.nom as room_type,pharmaciec.ville as neighbourhood  FROM `commande_product` INNER JOIN products ON commande_product.product_id=products.id INNER JOIN commandes ON commande_product.commande_id=commandes.id INNER JOIN pharmaciec ON commandes.created_by=pharmaciec.id WHERE commandes.etat=1 AND pharmaciec.ville=?',[region],function (err,result,fields){
			con.on('error',function(err){
				console.log('[MySQL ERROR]',err);
			});
			res.json({"content":result});
	});	
     }
	else{
	con.query ('SELECT products.nproduct as name,products.price as price,pharmaciec.adress as host_name,pharmaciec.amplitude as latitude,pharmaciec.attitude as longitude,pharmaciec.nom as room_type,pharmaciec.ville as neighbourhood  FROM `commande_product` INNER JOIN products ON commande_product.product_id=products.id INNER JOIN commandes ON commande_product.commande_id=commandes.id INNER JOIN pharmaciec ON commandes.created_by=pharmaciec.id WHERE commandes.etat=1 LIMIT ?',[nbrlimit],function (err,result,fields){
		con.on('error',function(err){
			console.log('[MySQL ERROR]',err);
		});
		res.json({"content":result});
});
}
});




// Set reclamation
app.post('/reclamation/add',(req,res)=>{
	var name = req.body.name;
	var email = req.body.email;
	var phone = req.body.phone;
	var subject = req.body.subject;
	var message = req.body.message;
	var pharmacie = req.body.pharmacie;
	var medicament = req.body.medicament;
	var datenaw = dateFormat(now, "isoDate");
	con.query('INSERT INTO `reclamations`(`name`,`status`, `email`, `phone`, `subject`, `message`, `pharmacie`, `medicament`, `created_at`) VALUES (?,0,?,?,?,?,?,?,?)',[name,email,phone,subject,message,pharmacie,medicament,datenaw], function(err,result,fields)
		{
			con.on('error',function(err){
				console.log('[MySQL ERROR]',err);
				res.json('error: ', err);
			});
			var jsonStr = [{STATE:"success"}];
			res.json(jsonStr);
		});
	});

// Search reclamation
	app.get('/reclamation/search', (req, res) => {
			con.query ('SELECT nproduct FROM products',function (err,result,fields){
				con.on('error',function(err){
					console.log('[MySQL ERROR]',err);
				});
				res.json(result);
		});
	});


	// Search reclamation
	app.get('/reclamation/searchbis', (req, res) => {
		con.query ('SELECT users.first_name,users.last_name FROM users INNER JOIN role_user ON users.id = role_user.user_id and role_user.role_id=3',function (err,result,fields){
			con.on('error',function(err){
				console.log('[MySQL ERROR]',err);
			});
			res.json(result);
	});
});





app.listen(4001, () => console.log('Express server is runnig at port no : 4001'));
