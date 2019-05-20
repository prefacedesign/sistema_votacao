Parse.Cloud.beforeSave("Voters", (request, response) => {
	
	if (request.object.get("name") == "BANANA") {
		response.error("O nome não pode ser BANANA");
		return;
	}
	
	var query = new Parse.Query('Voters');
	query.equalTo('name', request.object.get('name'));
	query.find({useMasterKey:true}).then(function(results) {
		if (results.length > 0) {
			response.error("Não pode ter nome repetido");
			return;
		}
		response.success();
	});
	return;
});
