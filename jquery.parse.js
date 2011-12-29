(function($){
	
	var ns, _opts, methods;
	
	ns = "parse";
	
	_opts = {
		base : "https://api.parse.com/1/classes/", 
		auth : false
	};
	
	function _creds(){
		if(_opts.auth){
			return true;
		}
		$.error("Missing basic auth for $."+ns);
		return false;
	}
	
	function _error(jqXHR, textStatus, errorThrown){
		$.error("$." + ns +" : " + textStatus +" "+errorThrown);
	}
	
	//TODO JSON.stringify dependency?
	function _http(method, uri, data){
		var req, _data;
		
		req = {
			//data
			contentType : "application/json", 
			processData : false, 
			dataType : 'json', 
			
			//action
			url : _opts.base + uri,
			type : method,  
			
			//credentials
			username : _opts.app_id, 
			password : _opts.master_key, 
			headers : {
				Authorization: "Basic " + _opts.auth
			}, 
			error : _error	
		};
		
		//handle data.
		data = typeof data === 'object' ? JSON.stringify(data) : false;
		data = method === 'GET' && data ? "where=" + encodeURIComponent(data) : data;
		req.data = data;
		return $.ajax(req);
	}
	

	function _done(req, cb){
		typeof cb === "function" && req.done(cb);
	}
	//exports
	
	function init(customOpts){
		$.extend(_opts, typeof customOpts === 'object' ? customOpts : {}, true);
		return $[ns];	
	}
	
	function get(uri, data, cb){
		var req = _http('GET', uri, data);
		_done(req, cb);
		return $[ns];
	}
	
	function post(uri, data, cb){
		var req = _http('POST', uri, data);
		_done(req, cb);
		return $[ns];
	}
	
	function put(uri, data, cb){
		var req = _http('PUT', uri, data);
		_done(req, cb);
		return $[ns];
	}

	function del(uri, cb){
		var req = _http('DELETE', uri , false);
		_done(req, cb);
		return $[ns];
	}
	
	methods = {
		init : init, 
		get : get, 
		post : post, 
		put : put,
		"delete" : del
	};
	
	$[ns] = methods;
	
})(jQuery);