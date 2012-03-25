(function($){
     
    var ns, _opts, methods;
     
    //Plugin namespace you can change this if you want.. 
    //i.e, ns = "db" = $.db.get/post/put/delete
    ns = "parse";
     
    //default opts
    _opts = {
        base : "https://api.parse.com/1/", 
        auth : false
    };
     
    //public methods
    methods = {};
     
    function _creds(){
        var error;
         
        if(_opts.app_id && _opts.rest_key){
            return true;
        }
         
        error = "Missing app_id, or rest_key authentication parameters.\n"+
                "Pass these credentials to $."+ns+".init\n"+
                "app_id = Application Id\n"+
                "rest_key = REST API Key";
        alert(error);
        $.error(error);
         
        return false;
    }
     
    function _error(jqXHR, textStatus, errorThrown){
        $.error("$." + ns +" :" + textStatus +" "+errorThrown);
    }
     
    //TODO JSON.stringify dependency?
    function _http(method, uri, data){
        var req, _data, pd;
         
        if(!_creds()){
            return false;
        }
        
		if(uri == 'login') {
			pd = true;
 	 	} else {
			pd = false;
		}
		console.log(pd);
        req = {
            //data
            contentType : 'application/json', 
            processData : pd, 
            dataType : 'json', 
             
            //action
            url : _opts.base + uri,
            type : method,  
             
            //Credentials 
            //NEW! Parse.com now supports CORS...https://parse.com/docs/rest
            headers : {
                "X-Parse-Application-Id" : _opts.app_id, 
                "X-Parse-REST-API-Key" : _opts.rest_key
            }, 
            error : _error  
        };
         
        //handle data.
		if (uri != 'login') {
        	data = typeof data === 'object' ? JSON.stringify(data) : false;
        	data = method === 'GET' && data ? "where=" + encodeURIComponent(data) : data;
		}
        req.data = data;
        return $.ajax(req);
    }
     
 
    function _done(req, cb){
        typeof cb === "function" && req.done(cb);
        return $[ns];
    }
    //exports
         
    methods.init = function(customOpts){
        $.extend(_opts, typeof customOpts === 'object' ? customOpts : {}, true);
        return $[ns];
    }
     
 
    $.each(['GET', 'POST', 'PUT', 'DELETE'],function(i, action){
        var m = action.toLowerCase();
         
        methods[m] = function(){
            var args, uri, data, cb, req;
             
            args = arguments;
            uri = args[0];
			switch (uri) {
				case 'users': break;
				case 'login': break;
				default: uri = 'classes' + uri
			}
            data = args[1];
            cb = args[2];
             
            if(typeof args[1] === 'function'){
                data = false;
                cb = args[1];
            }
                         
            req = _http(action, uri, data);
            return _done(req, cb);
        };
         
    });
     
     
    $[ns] = methods;
     
})(jQuery);