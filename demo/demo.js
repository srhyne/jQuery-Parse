(function(){
	var params, cb;
	
	$.parse.init({
		//Enter a base64 Basic Auth string here.. 
		// (Easiest way to get this is by running parse.sh and grabbing the auth output)
		auth : "Your basic Auth String"
	});
	
	params = {
		first_name : "Charlie", 
		last_name : "Brown"
	};
	
	cb = function(json){
		alert( JSON.stringify(json) );
	};
	
	$.parse.post("users", params, cb);
	
})();
