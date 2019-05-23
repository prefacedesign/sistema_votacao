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

	//request.object.set('authKey', crypto.createHash('md5').update( request.object.get('email') + 'kj9kazsf87').digest("hex"));

	var buff = new Buffer(request.object.get('email'),'utf8');
	request.object.set('authKey', encodeURIComponent(buff.toString('base64')));

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


Parse.Cloud.beforeSave("Votes", (request, response) => {
	// var query = new Parse.Query('Voters');
	//
	// query.notEqualTo('voted', true);
	// query.equalTo('email', request.object.get('voterEmail'));

	const voterQuery = new Parse.Query('Voters');
	voterQuery.equalTo('email', request.object.get('voterEmail'));
	voterQuery.notEqualTo('voted', true);

	voterQuery.find({useMasterKey:true}).then(function(results) {
		if (results.length == 0) {
			response.error("Usuário já votou, não pode votar duas vezes!");
			return;
		}

		response.success();
	});
});


Parse.Cloud.afterSave("Votes", (request, response) => {
	var query = new Parse.Query('Voters');

	query.equalTo('email', request.object.get('voterEmail'));

	query.first({useMasterKey:true}).then(function(result) {
		if (typeof result == "undefined") {
			response.error("Não conseguiu achar request.object.get('voterEmail'), para atualizar!");
			return;
		}

		result.set("voted", true);

		result.save(null, {useMasterKey: true}).then(function(saveResult) {
			//log.info('Custom log ' + JSON.stringify(saveResult.object))
			response.success();
		});
	});
	response.error("opa não conseguiu salvar o voto de " + request.object.get('voterEmail'));
});
