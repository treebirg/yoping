#!/usr/bin/env node
var args = process.argv.slice(2);
var Yo = require('yo-api');
var fs = require('fs');

var KEY_SIZE = 36;


if(args[0]=="apikey"){
	fs.writeFile("./apikey.yo",args[1],function(err){
		if(err) throw err;
		console.log("Update api key!");
	});
}else if(args[0]=="ping"){
	ping(args[1]);	
}else if(args[0]=="help" || args.length==0){
	
	console.log("\nYoping - HELP \n");
	console.log("******\nUSAGE:");
	console.log("Get your API key from dev.justyo.co");
	console.log("Use yoping apikey <YOUR_API_KEY> to update the apikey used by yoping");
	console.log("Use yoping <username> or yoping ping <username> "
			+"to send a yo to the specified username");
}else{
	ping(args[0]);
}


function ping(username){
	fs.readFile('./apikey.yo', function (err, data) {
		if (err) throw err;
		data = data.toString().trim();
		console.log(data);
		if(data.length!=KEY_SIZE) throw "Invalid API key size";
	  
		var yo = new Yo(data)
	  
		yo.yo(username,function(){
			console.log("Sent yo to " + username);
		});

	});
}



