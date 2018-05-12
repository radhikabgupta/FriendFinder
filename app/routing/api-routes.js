var friends = require("../data/friends.js");
var path = require("path");


var totalDifference = 0;

module.exports = function(app){

	app.get("/api/friends", function(req, res){
		res.json(friends);
	});

	app.post('/api/friends', function(req, res){

		var greatMatch = {
			name: "",
			image: "",
			matchDifference: 1000
		};

		var usrData 	= req.body;
		var usrName 	= usrData.name;
		var usrImage 	= usrData.image;
		var usrScores 	= usrData.scores;

		var totalDifference = 0;

		//loop through the friends data array of objects to get each friends scores
		for(var i = 0; i < friends.length; i++){

			totalDifference = 0;

			for(var j = 0; j < 10; j++){
			
				totalDifference += Math.abs(parseInt(usrScores[j]) - parseInt(friends[i].scores[j]));

				if (totalDifference <= greatMatch.matchDifference){

					greatMatch.name = friends[i].name;
					greatMatch.photo = friends[i].photo;
					greatMatch.matchDifference = totalDifference;

				}
			}
		}

		friends.push(usrData);
 
		res.json(greatMatch);
	});
};