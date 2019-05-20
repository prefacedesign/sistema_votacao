var crypto = require('crypto');
var saltyString = 'kj9kazsf87';

Parse.Cloud.define("hello", function(request, response){
 	response.success("Hello world!");
});


Parse.Cloud.define("getBallotBox", function (request, response) {
	
	response.success({
		"verdura": "alface"
	});
});

Parse.Cloud.beforeSave("Voters", (request, response) => {
	
	// if (request.object.get("name") == "BANANA") {
	// 	response.error("O nome não pode ser BANANA");
	// 	return;
	// }

	request.object.set('authKey', crypto.createHash('md5').update( request.object.get('email') + 'kj9kazsf87').digest("hex"));
	
	var query = new Parse.Query('Voters');

	if (typeof request.object.id == "string" && request.object.id.length > 0) {
		query.notEqualTo('objectId', request.object.id);
	}

	query.equalTo('email', request.object.get('email'));
	query.find({useMasterKey:true}).then(function(results) {
		if (results.length > 0) {
			response.error("Não pode ter email repetido");
			return;
		}
		response.success();
	});


	return;
});

